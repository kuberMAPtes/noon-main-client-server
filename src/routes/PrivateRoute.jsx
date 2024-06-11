import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import Footer from '../components/common/Footer';

const PrivateRoute = ({ children }) => {
    const token = useSelector((state) => state.auth.token);
  
    return token ? (
      <>
        {children}
        <Footer /> {/* Footer 컴포넌트 추가 */}
      </>
    ) : (
      <Navigate to="/member/getAuthMain" />
    );
  };

export default PrivateRoute;