import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { getChatApply, chatAccept } from '../../lib/axios_api';
import styles from './ChatApply.module.css';

const ChatAcceptRejectDecide = () => {
    const [chatApply, setChatApply] = useState([]);
    const navigate = useNavigate();
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const chatApplyId = queryParams.get('chatApplyId');

    useEffect(() => {
      getChatApply(chatApplyId).then((data) => {
        setChatApply(data);
      });
    }, [chatApplyId]);

    const handleSubmit = (decision) => {
      if (decision) {
        chatAccept(chatApply).then((data) => {
          navigate(`/chat/chatisAccepted?chatroomID=${data.chatroomID}&fromID=${chatApply.fromId}`);
        });
      } else {
        navigate(`/chat/chatReject?fromID=${chatApply.fromId}&chatApplyID=${chatApply.chatApplyId}`);
      }
    };

    return (
      <div className={styles.chatRequest}>
        <div className={styles.chatHeader}>
          <h1>채팅 신청자 : {chatApply.fromId}</h1>
          <div className={styles.chatVersion}>v1.0</div>
        </div>
        <div className={styles.chatBody}>
          <div className={styles.chatRobot}>
            <img src='../../image/09e904cb8f26f.png' alt="Robot" className={styles.robotImage} />
          </div>
          <p>채팅 신청이 도착했습니다!</p>
          <div className={styles.buttons}>
            <button className={styles.acceptButton} onClick={() => handleSubmit(1)}>채팅 수락하기</button>
            <button className={styles.rejectButton} onClick={() => handleSubmit(0)}>채팅 거절하기</button>
          </div>
        </div>
      </div>
    );
};

export default ChatAcceptRejectDecide;
