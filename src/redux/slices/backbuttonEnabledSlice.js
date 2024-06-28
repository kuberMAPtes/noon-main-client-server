import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: false
};

const backButtonEnabledSlice = createSlice({
  name: "backButtonEnabled",
  initialState,
  reducers: {
    setBackButtonEnabled(state, action) {
      state.value = action.payload;
    }
  }
});

export const { setBackButtonEnabled } = backButtonEnabledSlice.actions;
export default backButtonEnabledSlice.reducer;
