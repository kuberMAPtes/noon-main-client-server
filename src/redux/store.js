import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import chatroomReducer from "./slices/chatRoomSlice";
import currentMapStateSlice from "./slices/currentMapStateSlice";
import footerEnabledSlice from "./slices/footerEnabledSlice";
import backButtonEnabledSlice from "./slices/backbuttonEnabledSlice";
const store = configureStore({
  reducer: {
    auth: authReducer,
    chatroom: chatroomReducer,
    currentMapState: currentMapStateSlice,
    footerEnabled: footerEnabledSlice,
    backButtonEnabled: backButtonEnabledSlice,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
});

export default store;
