import { createSlice } from '@reduxjs/toolkit';
import { request } from '../../shared/utils/request';

const initialState = {
	isLoading: false,
	error: '',
	data: null,
	user: null,
	loggedIn: !!localStorage.getItem('auth_token')
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
		}
	}
});

export const { setError, setData, setLoading, setLoggedIn, setUser } = counterSlice.actions;

export const signUp = (data) => (dispatch) => {
	dispatch(setLoading(true));

	request(`/auth/local/register`, 'POST', data)
		.then((r) => {
			dispatch(setLoggedIn(true));
			localStorage.setItem('auth_token', r.jwt);
			dispatch(setUser(r.user));
		})
		.catch((err) => {
			dispatch(setError(err.message));
		})
		.finally(() => {
			dispatch(setLoading(false));
		});
};

export const login = (data) => (dispatch) => {
	dispatch(setLoading(true));

	request(`/auth/local`, 'POST', {
    identifier: data.email,
    password: data.password,
  })
		.then((r) => {
      dispatch(setLoggedIn(true));
			localStorage.setItem('auth_token', r.jwt);
			dispatch(setUser(r.user));
		})
		.catch((err) => {
			dispatch(setError(err.message));
		})
		.finally(() => {
			dispatch(setLoading(false));
		});
};

export const logout = () => (dispatch) => {
	localStorage.removeItem('auth_token');
	dispatch(setLoggedIn(false));
	dispatch(setUser(null));
};

export default counterSlice.reducer;
