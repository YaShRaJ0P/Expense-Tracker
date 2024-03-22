import { createSlice, nanoid } from "@reduxjs/toolkit";
const transaction = createSlice({
  name: "Transaction",
  initialState: [],
  reducers: {
    addTransaction: (state, action) => {
      const newArray = {
        id: nanoid(),
        ...action.payload,
      };
      state.push(newArray);
    },
    removeTransaction: (state, action) => {
      state.map((item) => console.log(item.id !== action.payload));
      return state.filter((item) => item.id !== action.payload);
    },
    editTransaction: (state, action) => {
      return state.map((item) =>
        item.id === action.payload.id
          ? {
              ...item,
              title: action.payload.title,
              date: action.payload.date,
              amount: action.payload.amount,
              description: action.payload.description,
            }
          : item
      );
    },
  },
});

export const { addTransaction, removeTransaction, editTransaction } =
  transaction.actions;
export const transactionReducer = transaction.reducer;
