import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { chatReject } from '../../lib/axios_api';
import styles from './ChatApply.module.css';

const ChatReject = () => {
    const [message, setMessage] = useState('');
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);

    const fromID = queryParams.get('fromID'); // 화면 디스플레이용
    const chatApplyID = queryParams.get('chatApplyID'); // DB 업데이트용

    const handleInputChange = (event) => {
      setMessage(event.target.value);
    };

    const navigate = useNavigate();

    const handleSubmit = () => {
      const chatRejectData = {
        chatApplyId: chatApplyID,
        rejectMessage: message
      };

      chatReject(chatRejectData).then(() => {
        navigate('/chat/chatRejected');
      });
    };

    return (
      <div className={styles.chatRequest}>
        <div className={styles.chatHeader}>
          <h1>{fromID}님이 대화를 애원하고 있습니다</h1>
          <div className={styles.chatVersion}>v1.0</div>
        </div>
        <div className={styles.chatBody}>
          <div className={styles.chatRobot}>
            <img src='../../image/09e904cb8f26f.png' alt="Robot" className={styles.robotImage} />
          </div>
          <p>정말 채팅을 거절하실건가요?</p>
          <input
            type="text"
            placeholder="거절 메시지를 입력하세요"
            value={message}
            onChange={handleInputChange}
            className={styles.inputField}
          />
          <button className={styles.rejectButton} onClick={handleSubmit}>채팅 거절하기</button>
        </div>
      </div>
    );
};

export default ChatReject;
