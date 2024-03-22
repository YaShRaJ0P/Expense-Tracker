import { createSlice, nanoid } from "@reduxjs/toolkit";
const category = createSlice({
  name: "category",
  initialState: [],
  reducers: {
    addCategory: (state, action) => {
      const newArray = {
        id: nanoid(),
        ...action.payload,
      };
      state.push(newArray);
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
              expenditure: action.payload.expenditure
            }
          : item
      );
    },
  },
});

export const { addCategory, removeCategory, editCategory } = category.actions;
export const categoryReducer = category.reducer;
