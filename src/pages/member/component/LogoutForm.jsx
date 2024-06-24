import React, { useEffect } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useDispatch, useSelector } from 'react-redux';
import { logout, setLoginStatus } from '../../../redux/slices/authSlice';
import { useNavigate } from 'react-router-dom';
import { clearAllCookies } from '../function/memberFunc';
import { signOut } from 'firebase/auth';
import { auth } from '../../../firebase';
import NormalButton from './NormalButton';


const LogoutForm = () => {
  const dispatch = useDispatch();
//   const authorization = useSelector((state) => state.auth.authorization);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await dispatch(logout(navigate));
      try {
        await signOut(auth);
        console.log("Firebase auth 로그아웃 완료");
      } catch (error) {
        console.error("로그아웃 중 오류 발생:", error);
      }

    } catch (error) {
      console.error('Logout failed', error);
    } finally {
      navigate("/member/getAuthMain");
    }
  };

//   useEffect(() => {
//     console.log('LogoutForm useEffect 수행');
//     console.log('auth:', authorization);
    
//     if(!authorization) navigate('/member/getAuthMain');
//   },[authorization,navigate]);

  return <NormalButton onClick={handleLogout} style={{height:"20%", width:"100%",padding:"0px"}}>Logout</NormalButton>;
};

export default LogoutForm;
