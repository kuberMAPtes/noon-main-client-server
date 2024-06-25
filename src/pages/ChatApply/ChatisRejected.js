import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import styles from './ChatApply.module.css';

const ChatisRejected = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const fromID = queryParams.get('fromID');

    const handleSubmit = () => {
      navigate('/chat/chatApplyList');
    };

    return (
      <div className={styles.chatRequest}>
        <div className={styles.chatHeader}>
          <h1>{fromID} 는 당신에게 철벽당했습니다</h1>
          <div className={styles.chatVersion}>v1.0</div>
        </div>
        <div className={styles.chatBody}>
          <div className={styles.chatRobot}>
            <img src='../../image/09e904cb8f26f.png' alt="Robot" className={styles.robotImage} />
          </div>
          <p>1대1 채팅이 거절되었습니다</p>
          <button className={styles.backButton} onClick={handleSubmit}>나가기</button>
        </div>
      </div>
    );
};

export default ChatisRejected;
