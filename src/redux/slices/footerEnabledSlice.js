import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: true
};

const footerEnabledSlice = createSlice({
  name: "footerEnabled",
  initialState,
  reducers: {
    setFooterEnbaled(state, action) {
      state.value = action.payload;
    }
  }
});

export const {setFooterEnbaled} = footerEnabledSlice.actions;
export default footerEnabledSlice.reducer;
