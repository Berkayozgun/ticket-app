import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getTrips, Trip } from "../services/trip.service";

export const fetchTrips = createAsyncThunk("trips/fetchTrips", async () => {
  const response = await getTrips();
  return response as Trip[];
});

interface TripState {
  trips: Trip[];
  loading: boolean;
  error: string | null;
}

const initialState: TripState = {
  trips: [],
  loading: false,
  error: null,
};

const tripSlice = createSlice({
  name: "trip",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTrips.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTrips.fulfilled, (state, action) => {
        state.loading = false;
        state.trips = action.payload;
      })
      .addCase(fetchTrips.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch trips";
      });
  },
});

export default tripSlice.reducer;
