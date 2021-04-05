import { configureStore } from '@reduxjs/toolkit';
import counterReducer from './features/counter';
import todosReducer from './features/todos'

export default configureStore({
  reducer: {
    counter: counterReducer,
    todos: todosReducer
  },
});
