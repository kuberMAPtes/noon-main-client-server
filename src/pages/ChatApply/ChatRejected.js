import React from 'react';
import { useNavigate  } from 'react-router-dom';
import './ChatApply.css';

const ChatRejected = () => {

    const navigate = useNavigate();
  
    const handleSubmit = () => {

      navigate('/chat/ChatApplyList');
      //채팅방 목록으로
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
          <p>채팅을 거절했습니다.</p>
          <button onClick={handleSubmit}>나가기</button>
        </div>
      </div>
    );
};

export default ChatRejected;