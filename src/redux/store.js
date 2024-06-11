import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import chatroomReducer from './slices/chatRoomSlice';
const store = configureStore({
  reducer: {
    auth: authReducer,
    chatroom: chatroomReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
});

export default store;