import { configureStore } from '@reduxjs/toolkit';
import userReducer from './slices/userSlice';
import productReducer from './slices/productSlice';
import memberReducer from './slices/memberSlice';
import chatroomReducer from './slices/chatRoomSlice';
const store = configureStore({
  reducer: {
    member: memberReducer,
    user: userReducer,
    product: productReducer,
    chatroom: chatroomReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
});

export default store;