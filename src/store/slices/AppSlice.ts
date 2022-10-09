import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppState } from "../../utils/AppTypes";
import type { RootState } from "../store";

// App State
const AppSlice = createSlice({
  name: "AppState",
  initialState: {
    movieName: "",
    trailerId: "",
  } as AppState,
  reducers: {
    setMovieName: (state, action: PayloadAction<string>) => {
      state.movieName = action.payload;
    },
    setTrailerId: (state, action: PayloadAction<string>) => {
      state.trailerId = action.payload;
    },
  },
});

export const { setMovieName, setTrailerId } = AppSlice.actions;

export const selectAppState = (state: RootState) => state.AppData;

export default AppSlice.reducer;
