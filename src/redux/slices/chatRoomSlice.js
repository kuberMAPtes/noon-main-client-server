import { createSlice } from '@reduxjs/toolkit';

// 초기 상태 정의
const initialState = {
  chatroomData: null,
};

// createSlice를 사용하여 slice 생성
const chatRoomSlice = createSlice({
  name: 'chatroom',
  initialState,
  reducers: {
    setChatroomData(state, action) {
      state.chatroomData = action.payload;
    },
    addChatroomData(state, action) {
      state.chatroomData = action.payload;
    },
  },
});

// 액션 생성자와 리듀서를 export
export const { setChatroomData, addChatroomData } = chatRoomSlice.actions;
export default chatRoomSlice.reducer;
