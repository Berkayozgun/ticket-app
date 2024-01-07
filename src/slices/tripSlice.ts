import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import TripService from "../services/trip.service";

// Async Thunk for fetching trips
export const fetchTrips = createAsyncThunk("trip/fetchTrips", async () => {
  try {
    const response = await TripService.getTrips();
    console.log("Fetch Trips Response:", response);
    return response;
  } catch (error) {
    console.error("Fetch Trips Error:", error.response?.data || error.message);
    throw error.response?.data || error.message;
  }
});

// Async Thunk for adding a new trip
export const addTrip = createAsyncThunk("trip/addTrip", async (newTrip) => {
  try {
    const response = await TripService.addTrip(newTrip);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
});

// Async Thunk for updating seat status
export const updateSeatStatus = createAsyncThunk(
  "trip/updateSeatStatus",
  async (updateData) => {
    try {
      const response = await TripService.updateSeatStatus(updateData);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  }
);

// Async Thunk for fetching a single trip by ID
export const fetchTripById = createAsyncThunk(
  "trip/fetchTripById",
  async (tripId) => {
    try {
      const response = await TripService.getTripById(tripId);

      if (response && response.data) {
        return response.data;
      } else {
        console.error("Response or response data is undefined");
        throw new Error("Response or response data is undefined");
      }
    } catch (error) {
      throw error.response?.data || error.message;
    }
  }
);

// Async Thunk for filtering trips by departure and destination locations
export const filterTrips = createAsyncThunk(
  "trip/filterTrips",
  async ({ departure, destination }) => {
    try {
      const response = await TripService.filterTrips(departure, destination);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  }
);

// Initial state
const initialState = {
  trips: [],
  loading: false,
  error: null,
  currentTrip: null,
};

// trip slice for storing trips and trip related data
const tripSlice = createSlice({
  name: "trip",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch Trips
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
        state.error = action.error.message;
      })

      // Add Trip
      .addCase(addTrip.fulfilled, (state, action) => {
        state.trips.push(action.payload);
      })

      // Update Seat Status
      .addCase(updateSeatStatus.fulfilled, (state, action) => {
        const updatedTrip = action.payload;
        const index = state.trips.findIndex(
          (trip) => trip._id === updatedTrip._id
        );

        if (index !== -1) {
          state.trips[index] = updatedTrip;
        }
      })

      // Fetch Trip By Id
      .addCase(fetchTripById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTripById.fulfilled, (state, action) => {
        console.log("Fetch Trip By Id Fulfilled1:", action.payload);
        state.loading = false;
        state.currentTrip = action.payload;
      })

      .addCase(fetchTripById.rejected, (state, action) => {
        state.loading = false;
        console.error("Fetch Trip By Id Error:", action.error);
        state.error = action.error.message;
      })

      // Filter Trips
      .addCase(filterTrips.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(filterTrips.fulfilled, (state, action) => {
        state.loading = false;
        state.trips = action.payload;
      })
      .addCase(filterTrips.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default tripSlice.reducer;
