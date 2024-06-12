import React from 'react';
import { useNavigate, useLocation  } from 'react-router-dom';
import './ChatApply.css';

const ChatisRejected = () => {

    const navigate = useNavigate();
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const fromID = queryParams.get('fromID');

    const handleSubmit = () => {
      //친구 목록으로
      navigate('/chat/chatApplyList')
    };
  
    return (
      <div className="chat-request">
        <div className="chat-header">
          <h1> {fromID} 는 당신에게 철벽당했습니다 </h1>
          <div className="chat-version">v1.0</div>
        </div>
        <div className="chat-body">
          <div className="chat-robot">
            {/* Placeholder for the robot image */}
            <img src='../../image/09e904cb8f26f.png' alt="Robot" />
          </div>
          <p>1대1 채팅이 거절되었습니다</p>
          <button onClick={handleSubmit}>나가기</button>
        </div>
      </div>
    );
};

export default ChatisRejected;