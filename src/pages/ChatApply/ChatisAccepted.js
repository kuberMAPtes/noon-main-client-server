import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import styles from './ChatApply.module.css';

const ChatisAccepted = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const chatroomID = queryParams.get('chatroomID');
    const fromID = queryParams.get('fromID');

    const handleSubmit = (option) => {
      if(option === 'chat'){
        navigate(`/chat/chatroom?chatroomID=${chatroomID}`);
      }else if(option === 'list'){
        navigate(`/chat/chatApplyList`);
      }
    };

    return (
      <div className={styles.chatRequest}>
        <div className={styles.chatHeader}>
          <h1>{fromID} 와 대화를 시작해보세요 !</h1>
          <div className={styles.chatVersion}>v1.0</div>
        </div>
        <div className={styles.chatBody}>
          <div className={styles.chatRobot}>
            <img src='../../image/09e904cb8f26f.png' alt="Robot" className={styles.robotImage} />
          </div>
          <p>1대1 채팅이 수락되었습니다!</p>
          <div className={styles.buttons}>
            <button className={styles.chatButton} onClick={() => handleSubmit('chat')}>채팅 하러가기</button>
            <button className={styles.backButton} onClick={() => handleSubmit('list')}>뒤로 가기</button>
          </div>
        </div>
      </div>
    );
};

export default ChatisAccepted;
