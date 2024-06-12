// authHelpers.js
import axios from "axios";
import {
    GoogleAuthProvider,
    getRedirectResult,
    onAuthStateChanged,
    signInWithRedirect,
  } from "firebase/auth";
import Cookies from "js-cookie";
import axiosInstance from "./axiosInstance";
  //사용자상태유지리스너
  export const setupAuthStateListener = (auth, login, logout) => {
    return onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log("User is signed in with Google:", user);
        login({ loginWay: 'google', user });
      } else {
        console.log("User is signed out.");
        logout();
      }
    });
  };
  //결과가져오기메서드
  export const handleRedirectResult = async (auth, dispatch) => {
    try {
        //리디렉션 결과 가져오기 메서드 이거로 사용자 정보와 토큰을 가져올 수 있다.
      const result = await getRedirectResult(auth);
      if (result) {
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        console.log("Google Access Token:", token);
  
        const member = result.member;
        console.log("User Info:", member);

        //서버에 사용자 정보랑 토큰을 보낸다
        const response = await axiosInstance.post(`/member/googleLogin`,
            {
                authorizeCode: token,
                memberId:  member.memberId
            });
        member = response.data.member;
        console.log("Google Login Success:", member);
        Cookies.set('token', token);
        // dispatch(loginSuccess({token, member}))


      }
    } catch (error) {
      console.error("Error during Google Sign-In Redirect:", error);
      const errorCode = error.code;
      const errorMessage = error.message;
      const credential = GoogleAuthProvider.credentialFromError(error);
      console.error("Error Code:", errorCode);
      console.error("Error Message:", errorMessage);
      console.error("Error Credential:", credential);
    }
  };
  //구글로그인메서드
  export const handleRedirectGoogleLogin = (auth) => {
    const provider = new GoogleAuthProvider();
    provider.addScope("https://www.googleapis.com/auth/contacts.readonly");
    provider.setCustomParameters({
      login_hint: "user@example.com",
    });
  
    signInWithRedirect(auth, provider);
  };
  