import React from 'react';
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
      console.log(auth);
      dispatch(logout());
      console.log(auth);
      navigate('/member/getAuthMain');
    } catch (error) {
      console.error('Logout failed', error);
    }
  };

  return <button onClick={handleLogout}>Logout</button>;
};

export default LogoutForm;
