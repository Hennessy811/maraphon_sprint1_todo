import { createSlice } from '@reduxjs/toolkit';
import { request } from '../../shared/utils/request';

const initialState = {
  isLoading: false,
  error: '',
  data: null,
  loggedIn: !!localStorage.getItem('auth_token'),
  user: null,
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
    setLoggedIn: (state, action) => {
      state.loggedIn = action.payload;
    },
    setUser: (state, action) => {
      state.user = action.payload;
    },
  },
});

export const { setError, setData, setLoading, setLoggedIn, setUser } = counterSlice.actions;

// export const login = data => dispatch => {
//   dispatch(setLoading(true));

//   request(`/auth/local/`)
// }

export const signUp = data => dispatch => {
  dispatch(setLoading(true));

  request(`/auth/local/register`, 'POST', data)
    .then(r => {
      dispatch(setLoggedIn(true));
      localStorage.setItem('auth_token', r.jwt);
      dispatch(setUser(r.user));
    })
    .catch(e => {
      dispatch(setError(e));
    })
    .finally(() => {
      dispatch(setLoading(false));
    });
};

export const logout = data => dispatch => {};

// export const sendingData = data => dispatch => {
//   dispatch(setLoading(true));

//     request(`/auth/local/register`, 'POST', data)
//       .then(() => dispatch(setSending(true)))
//       .catch(err => {
//       dispatch(setError(err.message));
//       });
// };

export default counterSlice.reducer;
