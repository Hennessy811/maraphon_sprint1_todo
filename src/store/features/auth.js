import { createSlice } from '@reduxjs/toolkit';
import { request } from '../../shared/utils/request';

const initialState = {
  isLoading: false,
  error: '',
  data: null,
  loggedIn: false
};

export const counterSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    setData: (state, action) => {
      state.data = action.payload;
    },
    setSending: (state, action) => {
      state.loggedIn = action.payload
    }
  },
});

export const { setError, setData, setLoading, setSending } = counterSlice.actions;

export const sendingData = data => dispatch => {
  dispatch(setLoading(true));
  
    request(`/auth/local/register`, 'POST', data)
      .then(() => dispatch(setSending(true)))
      .catch(err => {
      dispatch(setError(err.message));
      });
};

export default counterSlice.reducer;