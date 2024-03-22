import { configureStore } from "@reduxjs/toolkit";
import { categoryReducer } from "./category";
import { transactionReducer } from "./transaction";
export const appStore = configureStore({
  reducer: {
    category: categoryReducer,
    transaction: transactionReducer,
  },
});
