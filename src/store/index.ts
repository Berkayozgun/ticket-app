import { configureStore } from "@reduxjs/toolkit";
import tripReducer from "../slices/tripSlice";
import userReducer from "../slices/userSlice";
import paymentReducer from "../slices/paymentSlice";

const store = configureStore({
  // redux store for storing the state of the application
  reducer: {
    trip: tripReducer,
    user: userReducer,
    payment: paymentReducer,
  },
});

export default store;
