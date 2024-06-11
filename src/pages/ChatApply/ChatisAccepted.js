import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './ChatApply.css';

const ChatisAccepted = () => {

    const navigate = useNavigate();
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const chatroomID = queryParams.get('chatroomID');
    const fromID = queryParams.get('fromID');
  
    console.log("쿼리로 받아온 것", chatroomID, fromID)

    const handleSubmit = (option) => {
      console.log(option);

      if(option === 'chat'){
        console.log('여기로 채팅하러감',chatroomID);
        navigate(`/chat/chatroom?chatroomID=${chatroomID}`);
      }else if(option === 'list'){
        navigate(`/chat/chatApplyList`);
      }

    };
  
    return (
      <div className="chat-request">
        <div className="chat-header">
          <h1>{fromID} 와 대화를 시작해보세요 !</h1>
          <div className="chat-version">v1.0</div>
        </div>
        <div className="chat-body">
          <div className="chat-robot">
            {/* Placeholder for the robot image */}
            <img src='../../image/09e904cb8f26f.png' alt="Robot" />
          </div>
          <p>1대1 채팅이 수락되었습니다!</p>

          <button onClick={() => handleSubmit('chat')}>채팅 하러가기</button>
          <button onClick={() => handleSubmit('list')}>뒤로 가기</button>
        </div>
      </div>
    );
};

export default ChatisAccepted;