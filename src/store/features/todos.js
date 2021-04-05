import { createSlice } from '@reduxjs/toolkit';
import { request } from '../../shared/utils/request';

// store - где лежат данные
// actions - события
// reducers - обработчик
// selector - вытащить кусок данных из стора

// effects/side-effects - эффекты

// const BASE_URL = 'http://strapi.cskeleto.xyz';

const initialState = {
  isLoading: false,
  error: '',
  data: null,
};

export const counterSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    // когда первый раз получаем данные
    setData: (state, action) => {
      state.data = action.payload;
    },
  },
});

export const { setError, setData, setLoading } = counterSlice.actions;

export const fetchTodos = (skipLoader = false) => dispatch => {
  if (!skipLoader) {
    dispatch(setLoading(true));
  }

  request('/todos')
    .then(r => {
      dispatch(setData(r));
      if (!skipLoader) {
        dispatch(setLoading(false));
      }
    })
    .catch(err => {
      dispatch(setError(err.message));
    });
};

export const toggleDone = (id, done) => dispatch => {
  dispatch(setLoading(true));

  request(`/todos/${id}`, 'PUT', { done })
    .then(() => dispatch(fetchTodos()))
    .catch(err => {
      dispatch(setError(err.message));
    });
};

export const createItem = data => dispatch => {
  dispatch(setLoading(true));

  request(`/todos`, 'POST', data)
    .then(() => dispatch(fetchTodos()))
    .catch(err => {
      dispatch(setError(err.message));
    });
};

export const deleteItem = id => dispatch => {
  dispatch(setLoading(true));

  request(`/todos/${id}`, 'DELETE')
    .then(() => dispatch(fetchTodos()))
    .catch(err => {
      dispatch(setError(err.message));
    });
};

export default counterSlice.reducer;
