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
import { showToast } from '../function/ToastNotification';


const LogoutForm = () => {
  const dispatch = useDispatch();
//   const authorization = useSelector((state) => state.auth.authorization);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      try {
        await signOut(auth);
        console.log("Firebase auth 로그아웃 완료");
      } catch (error) {
        console.error("로그아웃 중 오류 발생:", error);
      }

      await dispatch(logout(navigate));
      showToast("success", "로그아웃 성공!");
      
    } catch (error) {
      console.error('Logout failed', error);
      showToast("error", "로그아웃 실패!");
    } finally {
      navigate("/member/getAuthMain");
    }
  };

//   useEffect(() => {
//     console.log('LogoutForm useEffect 수행');
//     console.log('auth:', authorization);
    
//     if(!authorization) navigate('/member/getAuthMain');
//   },[authorization,navigate]);

  return <NormalButton onClick={handleLogout} style={{height:"16%", width:"60px",margin:"0px",padding:"0px",fontSize:"13px"}}>Logout</NormalButton>;
};

export default LogoutForm;
