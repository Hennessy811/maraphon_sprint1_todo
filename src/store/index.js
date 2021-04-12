import { configureStore } from '@reduxjs/toolkit';
import todosReducer from './features/todos'
import authReducer from './features/auth'

export default configureStore({
  reducer: {
    todos: todosReducer,
    auth: authReducer
  },
});
