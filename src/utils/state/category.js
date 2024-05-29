import { createSlice } from "@reduxjs/toolkit";
const category = createSlice({
  name: "category",
  initialState: [],
  reducers: {
    addCategory: (state, action) => {
      const newArray = action.payload;
      state.unshift(newArray);
    },
    removeCategory: (state, action) => {
      return state.filter((item) => item.id !== action.payload);
    },
    editCategory: (state, action) => {
      return state.map((item) =>
        item.id === action.payload.id
          ? {
              ...item,
              title: action.payload.title,
              icon: action.payload.icon,
              expenditure: action.payload.expenditure,
            }
          : item
      );
    },
    emptyCategory: (state, action) => {
      return [];
    },
  },
});

export const { addCategory, removeCategory, editCategory, emptyCategory } =
  category.actions;
export const categoryReducer = category.reducer;
