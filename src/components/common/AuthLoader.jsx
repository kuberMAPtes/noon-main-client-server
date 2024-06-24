import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Cookies from "js-cookie";
import {
  restoreAuthState,
  setAuthorization,
  setLoading,
} from "../../redux/slices/authSlice";
import { getLoginMember, getMember } from "../../pages/member/function/memberAxios";
import axiosInstance from "../../lib/axiosInstance";

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
        const member = await getLoginMember();
        console.log("서버로 부터 받은 member", member);
        // alert("서버로 부터 받은 member" + JSON.stringify(member));
        if( member ) {
        console.log(member);
        
          try{
            dispatch(restoreAuthState({authorization: true, member : member}));
          } catch(e) {
            console.log(e);
            // alert("로그인 정보가 없습니다.");
          }

        } else {
        console.log("로그인 정보가 없습니다.");
        // alert("로그인 정보가 없습니다.");
        }
        dispatch(setLoading(false));
      };

      fetchMemberData();
    }
  }, [dispatch, authorization, member]);

  return <>{children}</>;
};

export default AuthLoader;
