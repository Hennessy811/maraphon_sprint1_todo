import { createSlice } from '@reduxjs/toolkit';

export const counterSlice = createSlice({
  name: 'todos',
  initialState: {
    value: [ 'Item1', 'Item2', 'Item3' ]
  },
  reducers: {

    //Add
    add: (state, items) => {
        const data = items.payload.items

        state.value.push(data)
    },

    //Remove
    remove:  (state, todo) => {

        const data = state.value
        const deleteItem = todo.payload.todo

        for (let i = 0; i < data.length; i++) {
            if (data[i] === deleteItem) {
                data.splice(i, 1)
            }
        }
        console.log(data.forEach(item => console.log(item)))
    }
  },
});

export const { add, remove } = counterSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state) => state.counter.value)`
// export const selectCount = state => state.counter.value;

export default counterSlice.reducer;