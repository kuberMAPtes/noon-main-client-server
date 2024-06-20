import React from 'react';
import PropTypes from 'prop-types';
import CustomerSupportHeader from './components/CustomerSupportHeader';
import Footer from '../../components/common/Footer';

const ListNotice = ({ isAdmin }) => {
  const notices = [
    '공지1 제목', '공지2 제목', '공지3 제목', '공지 제목',
    '공지 제목', '공지 제목', '공지 제목', '공지 제목',
  ];

  return (
    <div>
      <CustomerSupportHeader title="공지사항 목록" />
      <div>
        <ul>
          {notices.map((notice, index) => (
            <li key={index}>
              {notice}
              <span>10:16 PM</span>
            </li>
          ))}
        </ul>
        {isAdmin && (
          <button>공지사항 작성</button>
        )}
      </div>
      <Footer />
    </div>
  );
};


export default ListNotice;
