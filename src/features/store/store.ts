import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../user/redux/userSlice";
export const store = configureStore({
  reducer: {
    user: userReducer,
  },
});

export type AppStore = typeof store;
export type AppDispatch = AppStore["dispatch"];
export type RootState = ReturnType<AppStore["getState"]>;
