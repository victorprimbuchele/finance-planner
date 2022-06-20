import { Action, configureStore, ThunkAction } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import userReducer from "./slices/user/users.slice";
import categoryReducer from "./slices/category/category.slice";
import paymentMethodReducer from "./slices/payment-method/payment-method.slice";
import subCategoryReducer from "./slices/subcategory/subcategory.slice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    category: categoryReducer,
    paymentMethod: paymentMethodReducer,
    subcategory: subCategoryReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk = ThunkAction<void, RootState, null, Action<string>>;
export const useAppDispatch = () => useDispatch<AppDispatch>();
