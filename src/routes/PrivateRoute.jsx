import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import Footer from "../components/common/Footer";
import { setIsRedirect } from "../redux/slices/authSlice";
import { useNavigate } from "react-router-dom";
import { navigateMainPage } from "../util/mainPageUri";
import useEncryptId from "../pages/member/component/common/useEncryptId";

const PrivateRoute = ({ children }) => {
  const authorization = useSelector((state) => state.auth.authorization);
  const memberId = useSelector((state) => state.auth.member.memberId);
  const isRedirect = useSelector((state) => state.auth.isRedirect);
  const loading = useSelector((state) => state.auth.loading); //AuthLoader가 비동기요청을 처리한 후 > false
  
  // useEffect(()=>{
  //   alert("PrivateRoute에서 가져온 memberId: "+memberId);
  // },[memberId]);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  console.log(
    "#### PrivateRoute 렌더링 authorization,IsFirst구독",
    authorization
  );

  useEffect(() => {
    console.log("@@@@PrivateRoute useEffect 시작 [auth]");
    console.log(authorization);
    console.log("authorization 상태 변경:", authorization);
    //authorization이 undefined >> 아직 authLoader가 처리하기 전
    //authorization이 false >> authLoader가 로그인 안한 유저로 판단
    if (authorization===false && isRedirect) {
      // alert("리다이렉트했습니다. Redirect false로 변경"+ authorization + isRedirect);
      dispatch(setIsRedirect(false));
      navigate("/member/getAuthMain");
    }
  }, [authorization,isRedirect,navigate,dispatch]);

  if (loading === true) {
    return null;
  }
  return (
    <>
      {children}
      <Footer
      />
    </>
  );
};

export default PrivateRoute;
