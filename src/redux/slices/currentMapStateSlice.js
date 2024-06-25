import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: {
    latitude: 37.566278,
    longitude: 126.977800,
    zoomLevel: 15,
    initialized: false
  }
};

const currentMapStateSlice = createSlice({
  name: "currentMapState",
  initialState,
  reducers: {
    setCurrentMapState(state, action) {
      state.value = {
        ...state.value,
        ...action.payload
      }
    }
  }
});

export const {setCurrentMapState} = currentMapStateSlice.actions;
export default currentMapStateSlice.reducer;
