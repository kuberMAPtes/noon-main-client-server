import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import Cookies from 'js-cookie';
const api = axios.create({
    baseURL: process.env.REACT_APP_MEMBER_API_BASE_URL,
  });
  

// 비동기 로그인 액션 정의
export const login = createAsyncThunk(
    'auth/login',
    async (loginData, thunkAPI) => {
      try {
        const response = await api.post(`/login`, loginData);
        console.log("response.data :: ", response.data); // 에러가 안나면 성공임.
        const { info : member, message, requestId } = response.data;
        console.log("member :: ", member, "\nmessage :: ", message, "\nrequestId :: ", requestId);
        const authHeader = response.headers.get('Authorization');//토큰이 있음
        console.log("authHeader :: ", authHeader); // Authorization 헤더를 로그에 출력
  
        if (authHeader && authHeader.startsWith('Bearer ')) {
            const token = authHeader.split(' ')[1];
            console.log("token :: ", token); // 토큰을 로그에 출력
            Cookies.set('token', token, { expires: 1 }); // 쿠키에 토큰 저장
            return { token, member }; // JWT 토큰과 사용자 정보를 반환
          } else {
            console.error('Authorization header is missing or not in the correct format.');
            throw new Error('Authorization header is missing or not in the correct format.');
          }
        } catch (error) {
          console.error('Login Error :: ', error); // 에러 로그 출력
          return thunkAPI.rejectWithValue(error.response.data);
        }
    }
  );

export const logout = createAsyncThunk(
    'auth/logout',
    async () => {
        try {
        await api.post('/logout');
        Cookies.remove('token');
        } catch (error) {
        console.error('Logout failed', error);
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
  token: null,
  loginStatus: 'idle',
  loginError: null
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder
    //addCase(액션타입,그 때 실행할 리듀서임 ) 리듀서는 상태와 액션을 받아서 새로운 상태를 반환
      .addCase(login.pending, (state) => {
        // login.pending은 "member/login/pending"과 같은 문자열 값이다.
        state.loginStatus = 'loading';
      })
      .addCase(login.fulfilled, (state, action) => {
        state.member = action.payload.member;
        state.token = action.payload.token;
        state.loginStatus = 'succeeded';
      })
      .addCase(login.rejected, (state, action) => {
        state.loginStatus = 'failed';
        state.loginError = action.payload;
      })
      .addCase(logout.pending, (state) => {
        state.loginStatus = 'loading';
      })
      .addCase(logout.fulfilled, (state) => {
        state.member = initialState.member;
        state.token = initialState.token;
      })
      .addCase(logout.rejected, (state, action) => {
        console.error('Logout failed', action.error);
      });
  }
});

export const { } = authSlice.actions;
export default authSlice.reducer;
