import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import Cookies from 'js-cookie';
import { restoreAuthState,setLoading } from '../../redux/slices/authSlice';
import axiosInstance from '../../lib/axiosInstance';
import { getMember } from '../../pages/member/function/memberAxios';

const AuthLoader = ({ children }) => {
  const dispatch = useDispatch();
  console.log("#### AuthLoader 렌더링");

  useEffect(() => {
    console.log("@@@@ AuthLoader useEffect 시작");
    const loginData = Cookies.get('AuthToken');
    console.log('storedMember:', loginData);
    // dispatch(login(loginData));
    if (loginData) {
      console.log('1차 관문 로그인 합니다 :: storedMember:', loginData);
      const member = JSON.parse(loginData);


      let realMember;
      getMember(member).then(data => {
        console.log("getMember :: " + data);
        realMember = data;
      })
      console.log("realMember 확인 :: " + realMember);
      if(realMember){
        console.log("2차 관문 ㄱㄱ :: " + realMember);
        dispatch(restoreAuthState({ authorization: true, member }))
    }else{
        console.log("로그인정보가 없습니다2");
        Cookies.remove('AuthToken');
    }


    } else {
        console.log('로그인 정보가 없습니다.');
        Cookies.remove('AuthToken');
    }
    dispatch(setLoading(false))
  }, [dispatch]);

  return <>{children}</>;
};

export default AuthLoader;
