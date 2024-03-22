import { createSlice, nanoid } from "@reduxjs/toolkit";
const transaction = createSlice({
  name: "Transaction",
  initialState: {
    transactions: [],
  },
  reducers: {
    addTransaction: (state, action) => {
      const newArray = {
        id: nanoid(),
        ...action.payload,
      };
      state.transactions.push(newArray);
    },
    removeTransaction: (state, action) => {
      state.transactions = state.transactions.filter(
        (item) => item.id !== action.payload
      );
    },
    editTransaction: (state, action) => {
      state.transactions = state.transactions.map((item) =>
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
