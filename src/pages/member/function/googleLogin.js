import { GoogleAuthProvider, signInWithRedirect, getRedirectResult, signInWithPopup,getAuth } from 'firebase/auth';
import { login, setLoginStatus, setMember } from '../../../redux/slices/authSlice';

export const handleGoogleLogin = async (dispatch,navigate) => {
  console.log("handleGoogleLogin 함수 시작");
  const provider = new GoogleAuthProvider();

  console.log("GoogleAuthProvider 생성 완료");

  try {
    dispatch(setLoginStatus('loading'));
    const auth = getAuth();
    const response = await signInWithPopup(auth, provider);
    console.log("signInWithPopup 호출 완료:", response);
    // alert("response : "+response);
    const info = response?.user;
    const token = response?._tokenResponse;
    if (info?.email && info?.email !== "") {
      const loginData = {
        memberData: {
          idToken: token?.idToken,
          oauthIdToken: token?.oauthIdToken,
          refreshToken: token?.refreshToken,
          memberId: info?.email,
          nickname: info?.displayName,
          profilePhotoUrl: info?.photoURL,
          phoneNumber: info?.phoneNumber
        },
        loginWay: "google"
      };
      console.log("$$$$ 구글 로그인 시도");
      dispatch(login({ loginData, navigate }));
    }
    // const credential = GoogleAuthProvider.credentialFromResult(response);
    // console.log("credential 생성 완료:", credential);
    // alert("credential : "+credential);
  } catch (error) {
    dispatch(setLoginStatus('failed'));
  }

  console.log("signInWithRedirect 호출 완료");
};

// export const checkRedirectResult = async (dispatch) => {
//   console.log("checkRedirectResult 함수 시작");
//   const auth = getAuth();

//   if (!auth) {
//     console.error("Firebase auth 객체가 초기화되지 않았습니다.");
//     dispatch(setLoginStatus('failed'));
//     return null;
//   }

//   const result = await getRedirectResult(auth);
//   console.log("getRedirectResult 호출 완료:", result);
//   // alert( "getRedirectResult 호출 완료:"+ result);


//   if (result) {
//     const credential = GoogleAuthProvider.credentialFromResult(result);
//     console.log("credential 생성 완료:", credential);
//     const token = credential.accessToken;
//     console.log("accessToken:", token);
//     const user = result.user;
//     console.log("user 정보:", user);
//     //여기서 바인딩 엄청나게 해야함 member에는. 그리고 스토어에 저장 거기에다가 axios googleLogin요청도 보냄.
//     console.log('------------------------------------');

//     console.log('------------------------------------');
//     // dispatch(setMember({ token, user }));
//     dispatch(setLoginStatus('succeeded'));
//     return { token, user };
//   }
  
//   console.log("result가 null입니다.");
//   return null;
// };
