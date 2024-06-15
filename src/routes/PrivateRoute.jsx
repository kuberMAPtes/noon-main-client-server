import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import Footer from "../components/common/Footer";

const PrivateRoute = ({ children }) => {
    console.log("#### PrivateRoute 렌더링");
  const authorization = useSelector((state) => state.auth.authorization);

  useEffect(() => {
    console.log("@@@@PrivateRoute useEffect 시작 [auth]");
    console.log(authorization);
    console.log("authorization 상태 변경:", authorization);
  }, [authorization]);
 

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
