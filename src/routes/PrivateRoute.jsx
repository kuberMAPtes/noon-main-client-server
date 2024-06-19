import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import Footer from "../components/common/Footer";
import { setIsRedirect } from "../redux/slices/authSlice";

const PrivateRoute = ({ children }) => {
  const authorization = useSelector((state) => state.auth.authorization);
  const isRedirect = useSelector((state) => state.auth.isRedirect);
  const loading = useSelector((state) => state.auth.loading); //AuthLoader가 비동기요청을 처리한 후 > false
  const [IsFirst, setIsFirst] = useState(true);
  const dispatch = useDispatch();
  console.log(
    "#### PrivateRoute 렌더링 authorization,IsFirst구독",
    authorization
  );

  useEffect(() => {
    console.log("@@@@PrivateRoute useEffect 시작 [auth]");
    console.log(authorization);
    console.log("authorization 상태 변경:", authorization);
    if (authorization && isRedirect) {
      //alert("리다이렉트했습니다. Redirect false로 변경");
      dispatch(setIsRedirect(false));
    }
    setIsFirst(false);
  }, [authorization]);

  if (loading === true) {
    return null;
  }

  if (authorization && isRedirect) {
    return <Navigate to="/member/getAuthMain" />;
  }

  return (
    <>
      {children}
      <Footer />
    </>
  );
};

export default PrivateRoute;
