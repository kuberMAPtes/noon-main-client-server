import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import chatroomReducer from './slices/chatRoomSlice';
import currentMapStateSlice from "./slices/currentMapStateSlice";
const store = configureStore({
  reducer: {
    auth: authReducer,
    chatroom: chatroomReducer,
    currentMapState: currentMapStateSlice
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
});

export default store;