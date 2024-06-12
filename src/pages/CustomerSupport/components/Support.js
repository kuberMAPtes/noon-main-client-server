import React from 'react';

const Support = ({ isAdmin }) => {
  return (
    <div className="support">
       
       

      {isAdmin ? (
        <>
          <button className="support-button">공지사항 관리</button>
          <button className="support-button">신고 관리</button>
          <button className="support-button">유해 피드 필터링</button>
        </>
      ) : (
        <>
          <button className="support-button">공지사항 목록</button>
          <button className="support-button">챗봇 문의</button>
          
        </>
      )}

    </div>
  );
};

export default Support;
