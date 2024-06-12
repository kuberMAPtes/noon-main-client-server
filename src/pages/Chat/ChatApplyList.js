import React, { useState, useEffect } from 'react';
import { newChatApplyList } from '../../lib/axios_api'
import { useNavigate } from 'react-router-dom'
import styles from './ChatApplyList.css';

const ChatApplyList = () => {
  const [requests, setRequests] = useState([ ]);
  const navigate = useNavigate();

  useEffect(() => {
  
    newChatApplyList('user01') //임시로 유저데이터 넣음 리덕스에서 가져와야함
    .then((dataList)=>{setRequests(dataList);
    })

    }, []);

  const handleSubmit = async (chatApplyId) => {
      navigate(`/chat/chatAcceptRejectDecide?chatApplyId=${chatApplyId}`);
  };

  return (
    <div className={styles.chat_request_list}>
      <div className={styles.chat_header}>
        <h1>새 대화신청 알림 (user01) </h1>
      </div>
      <div className={styles.chat_body}>
        
        {requests.map(request => (
          <div key={request.chatApplyId} className={styles.chat_request}>
            {/* <div className="profile">
              <img src={request.profileUrl} alt="Profile" />
            </div> */}
            <div>
              <h3>신청자 : {request.fromId}</h3>
            </div>
            <div className={styles.details}>
              <p>신청 메세지 : {request.applyMessage}</p>
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
