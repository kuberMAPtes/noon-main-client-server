import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import Cookies from 'js-cookie';
import axiosInstance from '../../pages/member/function/axiosInstance';

// 비동기 로그인 액션 정의
export const login = createAsyncThunk(
    'auth/login',
    async (loginData, thunkAPI) => {
      try {
        const { dispatch } = thunkAPI;
        let authorization, member;
  
        if (loginData.loginWay === 'kakao') {
          // 카카오 로그인 처리
          const { memberId } = loginData;
          authorization = true;
          member = { memberId };
        } else if (loginData.loginWay === 'google') {
          // 구글 로그인 처리
          const response = await axiosInstance.post(`/member/googleLogin`, loginData);
          if (!response || !response.data) throw new Error('Invalid response from server');
          member = response.data.info;
          console.log('login response:', response.data);
          authorization = true;
        } else {
          // 일반 로그인 처리
          const response = await axiosInstance.post(`/member/login`, loginData);
          if (!response || !response.data) throw new Error('Invalid response from server');
          member = response.data.info;
          console.log('login response.data:', response.data);
          console.log('login response.data.info:', response.data.info);
          console.log("member :: ", member);
          authorization = true;
        }


        //authorization은 true, false,null 값을 가짐
        dispatch(setAuthorization(authorization));
        dispatch(setMember(member));
        Cookies.set('token', JSON.stringify(member), { expires: 1 })
        return { member, authorization };
      } catch (error) {
        return thunkAPI.rejectWithValue(error.response ? error.response.data : error.message);
      }
    }
  );

export const logout = createAsyncThunk(
  'auth/logout',
  async () => {
    try {
    //   await axiosInstance.post('/member/logout');
      Cookies.remove('token');
    } catch (error) {
      console.error('Logout failed', error);
    }
  }
);

const initialState = {
  member: {
    memberId: '',
    memberRole: 'MEMBER',
    nickname: '',
    pwd: '',
    phoneNumber: '',
    unlockTime: '0001-01-01T01:01:01',
    profilePhotoUrl: '',
    profileIntro: '',
    dajungScore: 0,
    signedOff: false,
    buildingSubscriptionPublicRange: 'PUBLIC',
    allFeedPublicRange: 'PUBLIC',
    memberProfilePublicRange: 'PUBLIC',
    receivingAllNotificationAllowed: false,
  },
  authorization: null,// true or false
  loginStatus: 'idle',
  loginError: null,
  loading: true,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuthorization: (state, action) => {
      state.authorization = action.payload;
    }
    ,setMember: (state, action) => {
      state.member = action.payload;
    }
    ,restoreAuthState: (state,action) => {
        state.authorization = action.payload.authorization;
        state.member = action.payload.member;
        state.loading = false;
    }
    ,setLoading: (state, action) => {
        state.loading = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.loginStatus = 'loading';
      })
      .addCase(login.fulfilled, (state, action) => {
        state.member = action.payload.member;
        console.log("State.member", action.payload.member);
        state.authorization = action.payload.authorization;
        console.log("State.authorization", action.payload.authorization);
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
        state.authorization = initialState.authorization;
      })
      .addCase(logout.rejected, (state, action) => {
        console.error('Logout failed', action.error);
      });
  }
});

export const { restoreAuthState ,setAuthorization, setMember,setLoading } = authSlice.actions;
export default authSlice.reducer;