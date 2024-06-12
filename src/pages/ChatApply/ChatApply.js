import React, { useState } from 'react';
import './ChatApply.css';
import { chatRequest } from '../../lib/axios_api';
import { useNavigate  } from 'react-router-dom';

//채팅을 신청하는 js
const ChatApply = () => {
  const [applyMessage, setApplyMessage] = useState('');

  const handleInputChange = (event) => {
    setApplyMessage(event.target.value);
  };

  const navigate = useNavigate();

  const handleSubmit = () => {

    const chatApplyData = {
      message : applyMessage,
      fromId : 'user01', // 수정해야함
      toId : 'user02' // 수정해야함
    }
    console.log(chatApplyData)

    chatRequest(chatApplyData)
    .then(data => {
        console.log(data)
    })

    navigate(`/chat/chatAcceptRejectDecide`);
  };

  return (
    <div className="chat-request">
      <div className="chat-header">
        <h1>fromId</h1>
        <div className="chat-version">v1.0</div>
      </div>
      <div className="chat-body">
        <div className="chat-robot">
          {/* Placeholder for the robot image */}
          <img src='../../image/09e904cb8f26f.png' alt="Robot" />
        </div>
        <p>친구가 되어보세요!</p>
        <input
          type="text"
          placeholder="신청 메시지를 입력하세요"
          value={applyMessage}
          onChange={handleInputChange}
        />
        <button onClick={handleSubmit}>채팅 신청하기</button>
      </div>
    </div>
  );
};

export default ChatApply;
