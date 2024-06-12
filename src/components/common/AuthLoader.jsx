import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import Cookies from 'js-cookie';
import { restoreAuthState,setLoading } from '../../redux/slices/authSlice';

const AuthLoader = ({ children }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    const storedMember = Cookies.get('token');
    if (storedMember) {
        console.log('다시 로그인 합니다 :: storedMember:', storedMember);
      const member = JSON.parse(storedMember);
      dispatch(restoreAuthState({ authorization: true, member }));
    }
    dispatch(setLoading(false))
  }, [dispatch]);

  return <>{children}</>;
};

export default AuthLoader;
