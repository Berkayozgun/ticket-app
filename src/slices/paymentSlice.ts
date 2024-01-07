import { createSlice } from "@reduxjs/toolkit";

// Slice for payment information and selected seats
const paymentSlice = createSlice({
  name: "payment",
  initialState: {
    paymentInfo: null,
    isLoading: false,
    error: null,
    selectedSeats: [],
  },
  reducers: {
    setPaymentInfo: (state, action) => {
      // Reducer for setting payment information
      state.paymentInfo = action.payload;
    },
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    setSelectedSeats: (state, action) => {
      // Reducer for setting selected seats
      state.selectedSeats = action.payload;
    },
  },
});

export const { setPaymentInfo, setLoading, setError, setSelectedSeats } =
  paymentSlice.actions;
export default paymentSlice.reducer;
