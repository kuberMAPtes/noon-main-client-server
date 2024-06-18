import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import Footer from "../components/common/Footer";

const PrivateRoute = ({ children }) => {
    const authorization = useSelector((state) => state.auth.authorization);
    
    const loading = useSelector((state) => state.auth.loading);//AuthLoader가 비동기요청을 처리한 후 > false
    console.log("#### PrivateRoute 렌더링 authorization,IsFirst구독", authorization);

    
  useEffect(() => {
    console.log("@@@@PrivateRoute useEffect 시작 [auth]");
    console.log(authorization);
    console.log("authorization 상태 변경:", authorization);
  }, [authorization]);
 
    if (loading === true) {
      return null;
    }

    return authorization ? (
      <>
        {children}
        <Footer /> {/* Footer 컴포넌트 추가 */}
      </>
    ) : (
      <Navigate to="/member/getAuthMain" />
    );
  }


export default PrivateRoute;
