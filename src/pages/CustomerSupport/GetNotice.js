import React from 'react';
import PropTypes from 'prop-types';
import CustomerSupportHeader from './components/CustomerSupportHeader';
import Footer from '../../components/common/Footer';

const GetNotice = ({ isAdmin }) => {
  return (
    <div>

      <CustomerSupportHeader title="공지 상세보기" />

      <div>
        <div>
          <span>공지사항 제목</span>
          <span>등록 일자</span>
        </div>
        <div>
          공지 글(텍스트, 사진, 동영상)
        </div>
        <div>
          {isAdmin && <button>삭제</button>}
          <button>확인</button>
        </div>
      </div>

      <Footer />

    </div>
  );
};


export default GetNotice;
