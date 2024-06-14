import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import Footer from "../components/common/Footer";

const PrivateRoute = ({ children }) => {
    console.log("#### PrivateRoute 렌더링");
  const auth = useSelector((state) => state.auth);

  useEffect(() => {
    console.log("@@@@PrivateRoute useEffect 시작 [auth]");
    console.log(auth);
    console.log("authorization 상태 변경:", auth.authorization);
  }, [auth]);
 
  if (auth.loading) {// 쿠키로부터 authorization을 가져오는 중이면 Loading...을 출력
    return <div>Loading...</div>;
  } else {
    return auth.authorization ? (
      <>
        {children}
        <Footer /> {/* Footer 컴포넌트 추가 */}
      </>
    ) : (
      <Navigate to="/member/getAuthMain" />
    );
  }
};

export default PrivateRoute;
