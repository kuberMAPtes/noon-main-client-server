import React from 'react';
import LogoutForm from './component/LogoutForm';
import { FaFacebook, FaInstagram, FaTwitter } from 'react-icons/fa';


const GetMemberProfile = () => {
  // GetMemberProfile 컴포넌트의 다른 내용들...

  return (
    <div>
      <h1>Member Profile</h1>
      <div>
        <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
          <FaFacebook size={30} />
        </a>
        <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer">
          <FaTwitter size={30} />
        </a>
        <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
          <FaInstagram size={30} />
        </a>
      </div>
      {/* 다른 프로필 내용들... */}
      
      <LogoutForm />
    </div>
  );
};

export default GetMemberProfile;
