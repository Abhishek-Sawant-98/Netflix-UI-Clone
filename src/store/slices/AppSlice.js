import { createSlice } from "@reduxjs/toolkit";

// App State
const AppSlice = createSlice({
  name: "AppState",
  initialState: {
    movieName: "",
    trailerId: "",
  },
  reducers: {
    setMovieName: (state, action) => {
      state.movieName = action.payload;
    },
    setTrailerId: (state, action) => {
      state.trailerId = action.payload;
    },
  },
});

export const { setMovieName, setTrailerId } = AppSlice.actions;

export const selectAppState = (state) => state.AppData;

export default AppSlice.reducer;
