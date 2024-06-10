import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { getChatApply, chatAccept, chatReject } from '../../lib/axios_api';
import './ChatApply.css';

const ChatAcceptRejectDecide = () => {
    const [chatApply, setChatApply] = useState([]);
    const navigate = useNavigate();
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const chatApplyId = queryParams.get('chatApplyId');

    useEffect( () => {
      getChatApply(chatApplyId)
      .then((data)=>{
        setChatApply(data)
      })
    },[])

    console.log("chatApply state =>", chatApply);

    const handleSubmit = (decision) => {

      // const chatApply = {
      //   chatApplyId : chatApplyId, // 됐다
      //   accepted : decision,
      //   fromId : 'user011',
      //   toId : 'user021',
      //   applyMessage : '이거신청메세지 어디서 따와야되누',
      //   rejectMessgae : '이거거절메세지 어디서 따와야되누'
      // }

      //수락할 경우 채팅방으로 입장
      if(decision){

        chatAccept(chatApply)
        .then((data)=>{
          navigate(`/chat/chatisAccepted?chatroomID=${data.chatroomID}&fromID=${chatApply.fromId}`);
        })
        
      // 거절할 경우 거절확정페이지로 이동하여 거절
      }else{
          navigate(`/chat/chatReject?fromID=${chatApply.fromId}&chatApplyID=${chatApply.chatApplyId}`);
        }
      ;
    }

    return (
      <div className="chat-request">
        <div className="chat-header">
          <h1>채팅 신청자 : {chatApply.fromId}</h1>
          <div className="chat-version">v1.0</div>
        </div>
        <div className="chat-body">
          <div className="chat-robot">
            {/* Placeholder for the robot image */}
            <img src='../../image/09e904cb8f26f.png' alt="Robot" />
          </div>
          <p>채팅 신청이 도착했습니다!</p>
          <button onClick={()=> handleSubmit(1)}>채팅 수락하기</button>
          <button onClick={()=> handleSubmit(0)}>채팅 거절하기</button>
        </div>
      </div>
    );
  }

export default ChatAcceptRejectDecide;