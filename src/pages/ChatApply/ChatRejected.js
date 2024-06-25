import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './ChatApply.module.css';

const ChatRejected = () => {
    const navigate = useNavigate();

    const handleSubmit = () => {
      navigate('/chat/ChatApplyList');
    };

    return (
      <div className={styles.chatRequest}>
        <div className={styles.chatHeader}>
          <h1>fromId</h1>
          <div className={styles.chatVersion}>v1.0</div>
        </div>
        <div className={styles.chatBody}>
          <div className={styles.chatRobot}>
            <img src='../../image/09e904cb8f26f.png' alt="Robot" className={styles.robotImage} />
          </div>
          <p>채팅을 거절했습니다.</p>
          <button className={styles.backButton} onClick={handleSubmit}>나가기</button>
        </div>
      </div>
    );
};

export default ChatRejected;
