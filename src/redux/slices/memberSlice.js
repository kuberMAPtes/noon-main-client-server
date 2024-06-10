import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const api = axios.create({
    baseURL: process.env.REACT_APP_MEMBER_API_BASE_URL,
  });
  

// 비동기 로그인 액션 정의
export const login = createAsyncThunk(
  'member/login',
  async (loginData, thunkAPI) => {
    try {
      const response = await api.post(`/login`, loginData);
      return response.data;  // 예: { user: { ...userData }, token: '...' }
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

const initialState = {
  member: {
    memberId: "",
    memberRole: "MEMBER",
    nickname: "",
    pwd: "",
    phoneNumber: "",
    unlockTime: "0001-01-01T01:01:01",
    profilePhotoUrl: "",
    profileIntro: "",
    dajungScore: 0,
    signedOff: false,
    buildingSubscriptionPublicRange: "PUBLIC",
    allFeedPublicRange: "PUBLIC",
    memberProfilePublicRange: "PUBLIC",
    receivingAllNotificationAllowed: false,
  },
  isAuthenticated: false,
  loginStatus: 'idle',
  loginError: null
};

const memberSlice = createSlice({
  name: 'member',
  initialState,
  reducers: {
    logout: (state) => {
      state.member = initialState.member;
      state.isAuthenticated = false;
      state.loginStatus = 'idle';
      state.loginError = null;
    }
  },
  extraReducers: (builder) => {
    builder
    //addCase(액션타입,그 때 실행할 리듀서임 ) 리듀서는 상태와 액션을 받아서 새로운 상태를 반환
      .addCase(login.pending, (state) => {
        // login.pending은 "member/login/pending"과 같은 문자열 값이다.
        state.loginStatus = 'loading';
      })
      .addCase(login.fulfilled, (state, action) => {
        state.member = action.payload.user;
        state.isAuthenticated = true;
        state.loginStatus = 'succeeded';
        state.loginError = null;
      })
      .addCase(login.rejected, (state, action) => {
        state.loginStatus = 'failed';
        state.loginError = action.payload;
      });
  }
});

export const { logout } = memberSlice.actions;
export default memberSlice.reducer;
