import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import chatroomReducer from './slices/chatRoomSlice';
import currentMapCenterSlice from "./slices/currentMapCenterSlice";
const store = configureStore({
  reducer: {
    auth: authReducer,
    chatroom: chatroomReducer,
    currentMapCenter: currentMapCenterSlice
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
});

export default store;