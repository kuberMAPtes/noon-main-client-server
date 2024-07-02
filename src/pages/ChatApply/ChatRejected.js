import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import styles from './ChatApply.module.css';

const ChatRejected = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { member } = location.state || {};

    const handleSubmit = () => {
      navigate('/chat/ChatApplyList');
    };

    return (
      <div className={styles.chatRequest}>
        <div className={styles.chatHeader}>

        </div>
        <div className={styles.chatBody}>
          <div className={styles.chatRobot}>
            <img src={member.profilePhotoUrl ? member.profilePhotoUrl : `${process.env.PUBLIC_URL}/image/defaultMemberProfilePhoto.png`} alt="Robot" className={styles.robotImage} />
          </div>
          <p>채팅을 거절했습니다.</p>
          <button className={styles.rejectButton} onClick={handleSubmit}>나가기</button>
        </div>
      </div>
    );
};

export default ChatRejected;
