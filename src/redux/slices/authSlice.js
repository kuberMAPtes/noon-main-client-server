import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Cookies from "js-cookie";
import axiosInstance from "../../lib/axiosInstance";
import {setTokenCookie} from "../../pages/member/function/memberFunc";
import { getCookie } from "../../util/cookies";

// 비동기 로그인 액션 정의
export const login = createAsyncThunk(
  "auth/login",
  //일반로그인시 loginData :: {memberId: "test", pwd: "test"}
  //구글로그인시 loginData :: {loginWay:"google", memberId: "test", nickname: "test" 등등..}
  //카카오로그인시 loginData :: {loginWay:"kakao", memberId: "test"}
  async (loginData, thunkAPI) => {
    try {
      console.log("$$$login 함수 실행");
      const { dispatch } = thunkAPI;
      let authorization, returnMember;
      
      if (loginData?.loginWay === "kakao") {
        // 카카오 로그인 처리
        console.log("카카오 로그인 처리중 :: loginData:", loginData);
        const response = await axiosInstance.post(`/member/getMember`, loginData?.member);
        returnMember = response?.data?.info;
        console.log("로그인처리중 response.data:", response?.data);
        console.log("로그인처리중 response.data.info:", response?.data?.info);
        console.log("member :: ", returnMember);
        authorization = true;

      } else if (loginData?.loginWay === "google") {
        // 구글 로그인 처리
        const response = await axiosInstance.post(
          `/member/googleLogin`,
          loginData
        );
        console.log("login response:", response?.data);
        dispatch(setAuthorization(true));
        dispatch(setMember(response?.data?.member));
        // setTokenCookie(response.data.member);
        returnMember = response?.data?.info;
        console.log("login response:", response?.data);
        authorization = true;
      } else {
        // 일반 로그인 처리
        loginData.loginWay = "normal";
        const response = await axiosInstance.post(`/member/login`, loginData);
        returnMember = response?.data?.info;
        console.log("로그인처리중 response.data:", response?.data);
        console.log("로그인처리중 response.data.info:", response?.data?.info);
        console.log("member :: ", returnMember);
        authorization = true;
      }
      //authorization은 true, false,null 값을 가짐
      Cookies.remove("Member-ID");//로그인 성공했으면 쿠키 삭제 카카오로그인시 사용
      Cookies.remove("IV");//로그인 성공했으면 쿠키 삭제 카카오로그인시 사용
      console.log("56번째줄authSlice member"+returnMember);
      setTokenCookie(returnMember);
      console.log(getCookie("AuthToken"));
      dispatch(setAuthorization(authorization));
      dispatch(setMember(returnMember));
    //   dispatch(setAuthorizationAndMember(authorization));
      const member = returnMember;
      return { member, authorization };
    } catch (error) {
        console.log(error);
        console.log(error.response)
        console.log(error.message)
        if(error.message=="Network Error"){
            error.message="서버와의 통신이 원활하지 않습니다. 네트워크 에러입니다.";
        }
      return thunkAPI.rejectWithValue(
        error.response ? error.response.data : error.message
      );
    }
  }
);

export const logout = createAsyncThunk("auth/logout", async (dispatch) => {
  try {
      Cookies.remove("AuthToken");
      //   await axiosInstance.post('/member/logout');
  } catch (error) {
    console.error("Logout failed", error);
  }
});

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
  authorization: null, // true or false
  loginStatus: "idle",
  loginError: null,
  loading: true,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuthorization: (state, action) => {
      state.authorization = action.payload;
    },
    setMember: (state, action) => {
      state.member = action.payload;
    },
    setAuthorizationAndMember : (state,action) => {
        state.authorization = action.payload.authorization;
        state.member = action.payload.member;
    }
    ,restoreAuthState: (state, action) => {
      state.authorization = action.payload.authorization;
      state.member = action.payload.member;
      state.loading = false;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setLoginStatus: (state, action) => {
      state.loginStatus = action.payload;
    },
    setLoginError: (state, action) => {
      state.loginError = action.payload;
    },

  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.loginStatus = "loading";
      })
      .addCase(login.fulfilled, (state, action) => {
          console.log("State.member", action.payload.member);
          state.authorization = true;
          console.log("State.authorization", action.payload.authorization);
          state.loginStatus = "succeeded";
          state.member = action.payload.member;
      })
      .addCase(login.rejected, (state, action) => {
        state.loginStatus = "failed";
        state.loginError = action.payload;//에러메세지 저장
      })
      .addCase(logout.pending, (state) => {
        state.loginStatus = "loading";
      })
      .addCase(logout.fulfilled, (state) => {
        state.member = initialState.member;
        state.authorization = initialState.authorization;
        state.loginStatus = "idle";
      })
      .addCase(logout.rejected, (state, action) => {
        console.error("Logout failed", action.error);
      });
  },
});

export const { 
    restoreAuthState
    , setAuthorization
    , setMember
    , setLoading
    , setLoginStatus } =
  authSlice.actions;
export default authSlice.reducer;
