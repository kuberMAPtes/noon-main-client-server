import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Cookies from "js-cookie";
import axiosInstance from "../../lib/axiosInstance";
import { clearAllCookies } from "../../pages/member/function/memberFunc";
import { navigateMainPage } from "../../util/mainPageUri";
import {
  getMember,
  googleLogin,
  Login,
} from "../../pages/member/function/memberAxios";

// 비동기 로그인 액션 정의
export const login = createAsyncThunk(
  "auth/login",
  //일반로그인시 loginData :: {member : {memberId :  fullForm.memberId, pwd: fullForm.pwd}}
  //구글로그인시 loginData :: {loginWay:"google", member : {memberId :  fullForm.memberId} , nickname: "test" 등등..}
  //카카오로그인시 loginData :: {loginWay:"kakao", member : {memberId :  fullForm.memberId} }
  async ({ loginData, navigate }, thunkAPI) => {
    try {
      console.log("$$$login 함수 실행");
      const { dispatch } = thunkAPI;
      let returnMember;

      if (loginData?.loginWay === "kakao") {

        // 카카오 로그인 처리
        //카카오 로그인 로직 시 아이디가 없다면 서버에서 회원가입을 해놓았음.
        console.log("카카오 로그인 처리중 :: loginData:", loginData);
        //alert("카카오 로그인 처리중 :: loginData:" + JSON.stringify(loginData?.member));
        // const response = await axiosInstance.post(`/member/getMember`, loginData?.member);
        const info = await getMember(loginData?.member);
        console.log("카카오 로그인 처리중 response:", info);
        returnMember = info;

      } else if (loginData?.loginWay === "google") {

        // 구글 로그인 처리
        // 여기서 회원가입도 같이 함.
        console.log("구글 로그인 처리중 :: loginData:", loginData);
        // alert("구글 로그인 처리중 :: loginData:" + JSON.stringify(loginData?.member));
        alert("로그인 되었습니다.");
        const info = await googleLogin(loginData?.member); //여기 member에는 authorizeCode도 있음

        console.log("구글 로그인 처리중 response:", info);
        returnMember = info;

      } else {

        // 일반 로그인 처리
        // 일반 로그인은 회원가입은 같이 하지 않는다.
        const info = await Login(loginData?.member);
        console.log("로그인처리중 response:", info);
        returnMember = info;
        //alert("returnMember 로그인합니다" + returnMember);
        
      }
      //returnMember의 memberId가 있으면 로그인 성공임.
      //authorization은 true, false,null 값을 가짐
      if (returnMember?.memberId) {
        loginData.member = returnMember;
        dispatch(setAuthorization(true));
        dispatch(setMember(returnMember));

        Cookies.remove("Member-ID"); //로그인 성공했으면 쿠키 삭제 카카오로그인시 사용
        Cookies.remove("IV"); //로그인 성공했으면 쿠키 삭제 카카오로그인시 사용

        const result = { member: returnMember, authorization: true };

        // setTokenCookie(returnMember);

        if (!(loginData?.loginWay === "signUp")) {
          //alert("네비게이트메인페이지");
          navigateMainPage(returnMember?.memberId, navigate);
        }
        return result;
      }
      //잘못된경우
      console.log("56번째줄authSlice member" + returnMember);
      // console.log(getCookie("AuthToken"));
      return { member: null, authorization: false };
      //   dispatch(setAuthorizationAndMember(authorization));
      //   return { member, authorization };
    } catch (error) {
      console.log(error);
      console.log(error.response);
      console.log(error.message);
      if (error.message == "Network Error") {
        error.message =
          "서버와의 통신이 원활하지 않습니다. 네트워크 에러입니다.";
      }
      return thunkAPI.rejectWithValue(
        error.response ? error.response.data : error.message
      );
    }
  }
);

export const logout = createAsyncThunk("auth/logout", async (navigate) => {
  try {
    clearAllCookies();
    await axiosInstance.post('/member/logout');
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
  authorization: undefined, // true or false
  isRedirect: true, // 리다이렉트 한번 하면 > false
  loginStatus: "idle",
  loginError: null,
  loading: true, //이건 AuthLoader가 비동기요청을 처리한 후 > false
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
    restoreAuthState: (state, action) => {
      state.authorization = action.payload.authorization;
      state.member = action.payload.member;
      state.loading = false;
    },
    setIsRedirect: (state, action) => {
      state.isRedirect = action.payload;
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
        state.loginError = action.payload; //에러메세지 저장
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
  restoreAuthState,
  setAuthorization,
  setMember,
  setIsRedirect,
  setLoading,
  setLoginStatus,
} = authSlice.actions;
export default authSlice.reducer;
