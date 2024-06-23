import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: null
};

const currentMapCenterSlice = createSlice({
  name: "currentMapCenter",
  initialState,
  reducers: {
    setCurrentMapCenter(state, action) {
      state.value = action.payload;
    }
  }
});

export const {setCurrentMapCenter} = currentMapCenterSlice.actions;
export default currentMapCenterSlice.reducer;
