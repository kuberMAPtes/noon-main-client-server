import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import io from 'socket.io-client';
import './Chatroom.css'; // 스타일 파일을 import 합니다
import { getChatroom } from '../../lib/axios_api'

import {Link} from 'react-router-dom';


// express 서버의 socket.io 로 접속
const socket = io('http://localhost:8081', { path: '/socket.io' });

// 1. 닉네임을 만들어야댐

const Chatroom = () => {

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const chatroomID = queryParams.get('chatroomID');
  console.log("(chatroomID) 네비게이션 쿼리파라미터로 받아온 chatroom useLocation => ", chatroomID);

  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [participants, setParticipants] = useState([]); // 채팅방 참여자
  const [roomInfo, setRoomInfo] = useState({}); // 채팅방 정보

  useEffect(() => {
    // 채팅을 위해 노드서버와 웹소켓연결
    socket.on('connect', () => {
        console.log('Connected to server', roomInfo.chatroomName);

        // 채팅방ID 에 해당하는 채팅방 정보 가져오기
        getChatroom(chatroomID)
        .then(data => {
          setRoomInfo(data.ChatroomInfo);
          setParticipants(data.ChatEntrancesInfo);
        })
        .catch(error => console.log(error));
    });

    // 메세지 수신 
    socket.on('specific_chat', (message) => {
        console.log("표시할 메세지 =>", message);
        setMessages((prevMessages) => [...prevMessages, message]);
    });

    // 컴포넌트 언마운트 시 소켓 이벤트 리스너 정리
    return () => {
        console.log("unmount! socket off!")
        socket.off('message');
        socket.off('connect');
        };
}, [chatroomID, roomInfo]);

    const initSetting = (chatrooms) => {
        console.log("🌹생성된방?", chatrooms);
        
    };

    const sendMessage = () => {
    socket.emit('msg_toRoom', newMessage, roomInfo.chatroomName);
    setNewMessage('');
    };

    // roomInfo가 변경되면 init_chatRoom을 호출
    if (roomInfo.chatroomName) {
        socket.emit('init_chatRoom', roomInfo.chatroomName, initSetting);
    }

  return (
    <div className="chat-container">
      <div className="sidebar">
        <div>
          <h2>채팅방 이름: {roomInfo.chatroomName}</h2>
          <p><strong>ID:</strong> {roomInfo.chatroomID}</p>
          <p><strong>다정온도 제한:</strong> {roomInfo.chatroomMinTemp}°C</p>
          <p><strong>방장:</strong> {roomInfo.chatroomCreatorId}</p>
          <p><strong>채팅방 종류:</strong> {roomInfo.chatroomType}</p>
        </div>
        <div>
          <h2>채팅 참여자 목록 ({participants.length})</h2>
          {console.log(participants)}
          {participants.map( (participant,index) => (
            <div key={index}>
              <p><strong> memberID:</strong> {participant.chatroomMemberId} ({participant.chatroomMemberType})</p>
            </div>
          ))}
        </div>
        
        <Link to='/chat/myChatroomList'>내 채팅방 목록</Link>

      </div>

      <div className="chat">
        <div className="messages">
          {messages.map((specific_chat, index) => (
            <div key={index} className="message">
              <p>{specific_chat.nickname} : {specific_chat.chatMsg} ({specific_chat.time})</p>
            </div>
          ))}
        </div>
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
        />
        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
};

export default Chatroom;
