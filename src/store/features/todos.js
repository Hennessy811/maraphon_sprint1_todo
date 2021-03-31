import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const counterSlice = createSlice({
  name: 'todos',
  initialState: {
    value: []
  },
  reducers: {

    //Get api
    store: (state, items) => {
      const data = items.payload
      data.map(item => state.value.push(item.title))
    },

    //Add
    add: (state, items) => {
        const data = items.payload.items
        state.value.push(data)
        axios
          .post('http://167.172.176.146/todos', {
            title: data,
            done: 'false'
          })
    },

    //Remove
    remove:  (state, todo) => {
        const data = state.value
        console.log(data)
        const deleteItem = todo.payload.todo

        for (let i = 0; i < data.length; i++) {
            if (data[i] === deleteItem) {
                data.splice(i, 1)
            }
        }
    }
  },
});

export const { add, remove, store } = counterSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state) => state.counter.value)`
// export const selectCount = state => state.counter.value;

export default counterSlice.reducer;