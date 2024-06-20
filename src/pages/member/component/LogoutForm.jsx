import React, { useEffect } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../../redux/slices/authSlice';
import { useNavigate } from 'react-router-dom';


const LogoutForm = () => {
  const dispatch = useDispatch();
//   const authorization = useSelector((state) => state.auth.authorization);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      dispatch(logout(navigate));
    } catch (error) {
      console.error('Logout failed', error);
    }
  };

//   useEffect(() => {
//     console.log('LogoutForm useEffect 수행');
//     console.log('auth:', authorization);
    
//     if(!authorization) navigate('/member/getAuthMain');
//   },[authorization,navigate]);

  return <button onClick={handleLogout}>Logout</button>;
};

export default LogoutForm;
