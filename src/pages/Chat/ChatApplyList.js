import React, { useState, useEffect } from 'react';
import { newChatApplyList } from '../Chat/function/axios_api';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import styles from './ChatApplyList.module.css';

const ChatApplyList = () => {
  const member = useSelector((state) => state.auth.member);
  const memberID = member.memberId;

  const [requests, setRequests] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    newChatApplyList(memberID).then((dataList) => {
      console.log("dataList", dataList);
      setRequests(dataList);
    });
  }, [memberID]);

  const handleSubmit = async (chatApplyId) => {
    navigate(`/chat/chatAcceptRejectDecide?chatApplyId=${chatApplyId}`);
  };

  const handleMyChatrooms = () => {
    navigate('/chat/myChatroomList');
  };

  return (
    <div className={styles.chatRequestList}>
      <div className={styles.chatHeader}>
        <h1>새 대화신청 알림 ({memberID}) </h1>
        <button className={styles.myChatroomsButton} onClick={handleMyChatrooms}>
          내 채팅방 목록
        </button>
      </div>
      <div className={styles.chatBody}>
        {requests.map((request) => (
          <div key={request.chatApplyId} className={styles.chatRequest}>
            <div>
              <h3>신청자: {request.fromId}</h3>
            </div>
            <div className={styles.details}>
              <p>신청 메세지: {request.applyMessage}</p>
              <div className={styles.actions}>
                <button onClick={() => handleSubmit(request.chatApplyId)}>확인하기</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ChatApplyList;
