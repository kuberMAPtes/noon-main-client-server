import React, { useEffect } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../../redux/slices/authSlice';
import { useNavigate } from 'react-router-dom';


const LogoutForm = () => {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      dispatch(logout());
    } catch (error) {
      console.error('Logout failed', error);
    }
  };

  useEffect(() => {
    console.log('LogoutForm useEffect 수행');
    console.log('auth:', auth);
    
    if(!auth.authorization) navigate('/member/getAuthMain');
  },[auth,navigate]);

  return <button onClick={handleLogout}>Logout</button>;
};

export default LogoutForm;
