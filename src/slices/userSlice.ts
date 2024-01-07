import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserState {
  // Define a type for the slice state
  user: { id: string; gender: string } | null;
}

const initialState: UserState = {
  // Define the initial state using that type
  user: null,
};

// userSlice for storing user information
export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<{ id: string; gender: string }>) => {
      state.user = action.payload;
    },
  },
});

export const { setUser } = userSlice.actions;

export default userSlice.reducer;
