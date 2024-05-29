import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  transactions: [],
  income: 0,
  expense: 0,
  balance: 0,
};

const transaction = createSlice({
  name: "Transaction",
  initialState,
  reducers: {
    addTransaction: (state, action) => {
      state.transactions.unshift(action.payload);
      action.payload.expenditure
        ? (state.expense += parseFloat(action.payload.amount))
        : (state.income += parseFloat(action.payload.amount));

      state.balance = state.income - state.expense;
    },
    removeTransaction: (state, action) => {
      state.transactions = state.transactions.filter(
        (item) => item.id !== action.payload.id
      );
      action.payload.expenditure
        ? (state.expense -= parseFloat(action.payload.amount))
        : (state.income -= parseFloat(action.payload.amount));

      state.balance = state.income - state.expense;
    },
    editTransaction: (state, action) => {
      let oldExpense = 0;
      let oldExpenditure = null;
      const item = state.transactions.find(
        (transaction) => transaction.id === action.payload.id
      );
      if (item) {
        oldExpenditure = item.expenditure ? true : false;
        oldExpense = parseFloat(item.amount);
      }
      const newArr = state.transactions.map((item) =>
        item.id === action.payload.id
          ? {
              ...item,
              category: action.payload.category,
              date: action.payload.date,
              amount: action.payload.amount,
              description: action.payload.description,
              expenditure: action.payload.expenditure,
            }
          : item
      );
      let newExpenditure = null;
      let newExpense = 0;
      const newitem = newArr.find((transaction) =>
        transaction.id === action.payload.id
          ? (newExpense = parseFloat(item.amount))
          : null
      );

      if (newitem) {
        newExpenditure = newitem.expenditure ? true : false;
        newExpense = parseFloat(newitem.amount);
      }

      if (oldExpenditure && newExpenditure) {
        state.expense = state.expense - oldExpense + newExpense;
      } else if (!oldExpenditure && newExpenditure) {
        state.expense += newExpense;
        state.income -= oldExpense;
      } else if (oldExpenditure && !newExpenditure) {
        state.expense -= newExpense;
        state.income += oldExpense;
      } else {
        state.income = state.income - oldExpense + newExpense;
      }
      state.balance = state.income - state.expense;
      state.transactions = newArr;
    },
    emptyTransaction: (state, action) => {
      state.transactions = [];
      state.income = 0;
      state.expense = 0;
      state.balance = 0;
    },
  },
});

export const {
  addTransaction,
  removeTransaction,
  editTransaction,
  emptyTransaction,
} = transaction.actions;
export const transactionReducer = transaction.reducer;
