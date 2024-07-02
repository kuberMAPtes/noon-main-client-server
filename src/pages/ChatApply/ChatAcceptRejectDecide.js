import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { getChatApply, chatAccept } from '../Chat/function/axios_api';
import { getMember } from '../member/function/memberAxios'
import styles from './ChatApply.module.css';

const ChatAcceptRejectDecide = () => {
    const [chatApply, setChatApply] = useState([]);
    const [member, setMember] = useState([]);
    const navigate = useNavigate();
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const chatApplyId = queryParams.get('chatApplyId');

    useEffect(() => {
      getChatApply(chatApplyId)
      .then((data) => {
        setChatApply(data);
        
        // 이것이 콜백 지옥이다 !
        getMember({memberId: data.fromId})
        .then((data) => {
          console.log(data);
          setMember(data)
        })
      });

      
    }, [chatApplyId]);

    console.log("chatApply state =>", chatApply);

    const handleSubmit = (decision) => {
      if (decision) {
        chatApply.chatroomType = 'PRIVATE_CHATTING';

        chatAccept(chatApply)
        .then((data) => {
          navigate(`/chat/chatisAccepted`, {
            state: { chatroomID: data.chatroomID, fromID: chatApply.fromId, member },
          });
        });
      } else {
        navigate(`/chat/chatReject`, {
          state: { fromID: chatApply.fromId, chatApplyID: chatApply.chatApplyId, member },
        });
      }
    };

    console.log("랜더링전에 프로필이미지 드갔는지 보자", member);

    return (
      <div className={styles.chatRequest}>
        <div className={styles.chatHeader}>
          <h1>채팅 신청자 : {chatApply.fromId}</h1>

        </div>
        <div className={styles.chatBody}>
          <div className={styles.chatRobot}>
            <img src={member.profilePhotoUrl ? member.profilePhotoUrl : `${process.env.PUBLIC_URL}/image/defaultMemberProfilePhoto.png`} alt="fromId" className={styles.robotImage} />
          </div>
          <p>채팅 신청이 도착했습니다!</p>
          <div className={styles.chatMessage}>
            <p> {chatApply.applyMessage}</p>
          </div>
          <div className={styles.buttons}>
            <button className={styles.acceptButton} onClick={() => handleSubmit(1)}>채팅 수락하기</button>
            <button className={styles.rejectButton} onClick={() => handleSubmit(0)}>채팅 거절하기</button>
          </div>
        </div>
      </div>
    );
};

export default ChatAcceptRejectDecide;
