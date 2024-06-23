import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: null
};

const currentMapStateSlice = createSlice({
  name: "currentMapState",
  initialState,
  reducers: {
    setCurrentMapState(state, action) {
      state.value = action.payload;
    }
  }
});

export const {setCurrentMapState} = currentMapStateSlice.actions;
export default currentMapStateSlice.reducer;
