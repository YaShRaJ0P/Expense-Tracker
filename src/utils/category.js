import { createSlice, nanoid } from "@reduxjs/toolkit";
const category = createSlice({
  name: "category",
  initialState: [
    {
      id: nanoid(),
      title: "Food",
      icon: "🍚",
      expenditure: true,
    },
    {
      id: nanoid(),
      title: "Job",
      icon: "🏢",
      expenditure: false,
    },
  ],
  reducers: {
    addCategory: (state, action) => {
      const newArray = {
        id: nanoid(),
        ...action.payload,
      };
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
  },
});

export const { addCategory, removeCategory, editCategory } = category.actions;
export const categoryReducer = category.reducer;
