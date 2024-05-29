import { configureStore } from "@reduxjs/toolkit";
import { categoryReducer } from "./category";
import { transactionReducer } from "./transaction";
import { userReducer } from "./userSlice";
export const appStore = configureStore({
  reducer: {
    category: categoryReducer,
    transaction: transactionReducer,
    user: userReducer,
  },
});
