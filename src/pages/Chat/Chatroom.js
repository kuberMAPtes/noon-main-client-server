import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import io from 'socket.io-client';
import './Chatroom.css'; // 스타일 파일을 import 합니다
import { getChatroom } from '../../lib/axios_api';
import { useSelector } from 'react-redux';

import {Link} from 'react-router-dom';


// express 서버의 socket.io 로 접속
const socket = io('http://localhost:8081', { path: '/socket.io' });

// 1. 닉네임을 만들어야댐

const Chatroom = () => {

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const chatroomID = queryParams.get('chatroomID');
  const chatroomData = useSelector(state => state.chatroom.chatroomData);

  console.log("[useLocation] 넘겨받은 chatroomID => ", chatroomID);
  console.log("[Redux] useSelector 로 받아온 setChatroomData 혹은 addChatroomData", chatroomData)

  const [receivedMessage, setReceivedMessage] = useState([]); // 소켓에서 수신한 메세지
  const [messageInput, setMessageInput] = useState(''); // 입력창에 입력한 메세지
  const [participants, setParticipants] = useState([]); // 채팅방 참여자
  const [roomInfo, setRoomInfo] = useState({}); // 채팅방 정보

  const [liveParticipants, setLiveParticipants] = useState({ members: [] });

  useEffect(() => {
    // 채팅방 입장후에 getChatroom 을 하면 새로고침해야 방정보 업데이트됨
    // 이전화면에서 axios 후 redux 에 채팅방 정보를 넣고 가져오게끔 변경

    if (chatroomData) {
      setRoomInfo(chatroomData.chatroomInfo);
      setParticipants(chatroomData.chatEntrancesInfo);

      console.log("roomInfo", roomInfo);
      console.log("participants", participants);
    }

    // 채팅을 위해 노드서버와 웹소켓연결
    socket.on('connect', () => {
        console.log('Connected to server', roomInfo.chatroomName);

        // redux 에서 가져오지만 새로고침시에도 채팅방을 그대로 두기 위해 두번 axios
        getChatroom(chatroomID)
        .then(data => {
          setRoomInfo(data.ChatroomInfo);
          setParticipants(data.ChatEntrancesInfo);
        })
        .catch(error => console.log(error));

    });

    // 메세지 수신 (왜 useEffect 안에 들어와야하지?)
    socket.on('specific_chat', (message) => {
        console.log("표시할 메세지 =>", message);
        setReceivedMessage((prevMessages) => [...prevMessages, message]);
    });

    // 입장 메세지 수신
    socket.on('enter_msg', (enterMsg) =>{
      console.log("표시할 입장메세지 =>", enterMsg);
      setReceivedMessage((prevMessages) => [...prevMessages, enterMsg])
    })

    // 퇴장 메세지 수신
    socket.on('leave_msg', (leaveMsg) =>{
      console.log("표시할 퇴장메세지 =>", leaveMsg);
      setReceivedMessage((prevMessages) => [...prevMessages, leaveMsg])
    })
  

    // 컴포넌트 언마운트 시 소켓 이벤트 리스너 정리
    return () => {
        console.log("unmount! socket off!")
        socket.off('message');
        socket.off('connect');
        };
    
}, [])

    // 채팅방 정보가 업데이트되면 호출
    useEffect(() => {
      if (roomInfo) {
        socket.emit('init_chatRoom', roomInfo.chatroomName, initSetting);
      }
    }, [roomInfo]);
  
    const initSetting = (chatrooms) => {
      console.log("🌹생성된방?", chatrooms);

      // 채팅방 입장 
      socket.emit("enter_room", roomInfo.chatroomName, (data) => {
        console.log("from 채팅서버 enter_room", data)

        setLiveParticipants(data.roomInfo)
      })

      // 채팅내역 불러오기
      socket.on("msg_history", (messageHistory)=>{
        //setReceivedMessage((prevMessages) => [...prevMessages, messageHistory])
        console.log("메세지 히스토리".messageHistory);
      })
    };

    // 채팅 메세지 보내기
    const sendMessage = () => {
      socket.emit('msg_toRoom', messageInput, roomInfo.chatroomName);
      setMessageInput('');
    };

    // 채팅방 나가기
    const leaveRoom = () => { 
      socket.emit("leave_room", roomInfo.chatroomName, (data) => {

        console.log("나갈예정인 방", data)
        /* 여기에 data(roomName) 받아서 채팅방 나가는 코드 추가해야함 */

      })
    }

    // 이전 페이지에서 넘어와서 redux 데이터를 받는다면? 
    if(!roomInfo){
      setTimeout(()=>window.location.reload(),1000)
      return <div>Loading...</div>;
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
          {/* {console.log(participants)} */}
          {participants.map( (participant,index) => (
            <div key={index}>
              <p><strong> memberID:</strong> {participant.chatroomMemberId} ({participant.chatroomMemberType})</p>
            </div>
          ))}
        </div>

        <div>
          <h2>실시간 채팅 참여자 목록 ({liveParticipants.personnel})</h2>
          {/* {console.log(participants)} */}
          {liveParticipants.members.map( (liveParticipant,index) => (
            <div key={index}>
              <p><strong> socketID:</strong> {liveParticipant}</p>
            </div>
          ))}
        </div>
        
        <Link to='/chat/myChatroomList'>내 채팅방 목록</Link>

      </div>

      <div className="chat">
        <div className="messages">
          {receivedMessage.map((msg, index) => (
            <div key={index} className="message">
              <p>{msg}</p>
            </div>
          ))}

        </div>
        <input
          type="text"
          value={messageInput}
          onChange={(e) => setMessageInput(e.target.value)}
        />
        <button onClick={sendMessage}>Send</button>
        <button onClick={leaveRoom}>채팅방 나가기</button>
      </div>
    </div>
  );
};

export default Chatroom;
