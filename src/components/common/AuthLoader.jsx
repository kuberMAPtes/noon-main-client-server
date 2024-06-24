import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Cookies from "js-cookie";
import {
  restoreAuthState,
  setAuthorization,
  setLoading,
} from "../../redux/slices/authSlice";
import { getMember } from "../../pages/member/function/memberAxios";

const AuthLoader = ({ children }) => {
  const dispatch = useDispatch();
  const authorization = useSelector((state) => state.auth.authorization);
  const member = useSelector((state) => state.auth.member);
  console.log("#### AuthLoader 렌더링(authorization)구독", authorization);

  useEffect(() => {
    console.log("@@@@ AuthLoader useEffect 시작");
    // React.Children.map(children, child => {
    //   console.log("Child:", child);
    // });
    //인증이 안되어 있으면...
    if (authorization === undefined && member.memberId === "") {
      // alert("authorization이 undefined입니다." + "member는" + JSON.stringify(member));
      const fetchMemberData = async () => {
        //쿠키에 인증이 남아있는지 확인한다.
        const loginData = Cookies.get("AuthToken");
        console.log("storedMember:", loginData);
        if (loginData) {
          console.log("1차 관문 로그인 합니다 :: storedMember:", loginData);
          const member = JSON.parse(loginData);

          try {
            const apiMember = await getMember(member);
            console.log("getMember :: " + apiMember);

            if (apiMember) {
              console.log("2차 관문 통과 :: " + apiMember);
              dispatch(
                restoreAuthState({ authorization: true, member: apiMember })
              );
            } else {
              console.log("로그인정보가 없습니다2");
              Cookies.remove("AuthToken");
              dispatch(setAuthorization(false));
            }
          } catch (error) {
            console.error("Error fetching member data:", error);
            Cookies.remove("AuthToken");
            dispatch(setLoading(false));
          }
        } else {
          console.log("로그인 정보가 없습니다.");
          Cookies.remove("AuthToken");
          dispatch(setAuthorization(false));
        }

        dispatch(setLoading(false));
      };

      fetchMemberData();
    }
  }, [dispatch, authorization, member]);

  return <>{children}</>;
};

export default AuthLoader;
