import React, { useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import io from 'socket.io-client';
import module from './Chatroom.module.css'; // 스타일 파일을 import 합니다
import { getChatroom } from '../../lib/axios_api';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { useNavigate  } from 'react-router-dom';
import ActiveChatroomChecker from './function/ActiveChatroomChecker';

////////// 임시로 member Id를 만듦 /////////////
function generateRandomNickname() {
  const adjectives = ['Red', 'Blue', 'Green', 'Yellow', 'Silver', 'Golden', 'Clever', 'Swift', 'Wise', 'Brave'];
  const nouns = ['Fox', 'Wolf', 'Eagle', 'Lion', 'Tiger', 'Bear', 'Snake', 'Dragon', 'Phoenix', 'Knight']; 
  const emoji = ['😺','🙉','🦁','🐺','🦒','🦊','🐯','🐰','🦝','🐷','🐻','🐻‍❄️','🐼','🐨','🦓','🐔','🦄','🫏','🐽']
  const randomAdjective = adjectives[Math.floor(Math.random() * adjectives.length)];
  const randomNoun = nouns[Math.floor(Math.random() * nouns.length)];
  const randomEmoji = emoji[Math.floor(Math.random() * nouns.length)];

  return randomEmoji + ' ' +randomAdjective +' ' + randomNoun;
}
const randomNickname = generateRandomNickname();

const memberID = randomNickname;

////////////////////////////////////////////////

const Chatroom = () => {
  console.log("\n\n\n🐬 Chatroom 컴포넌트 시작 \n\n\n")

  const [receivedMessage, setReceivedMessage] = useState([]); // 소켓에서 수신한 메세지
  const [messageInput, setMessageInput] = useState(''); // 입력창에 입력한 메세지
  const [participants, setParticipants] = useState([]); // 채팅방 참여자 (from spring boot)
  const [roomInfo, setRoomInfo] = useState({}); // 채팅방 정보
  const [liveParticipants, setLiveParticipants] = useState([]); // 채팅방 실시간 참여자 (from node)

  console.log("🦄랜더링 roomInfo => ", roomInfo);

  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const chatroomID = queryParams.get('chatroomID');
  const chatroomData = useSelector(state => state.chatroom.chatroomData);

  // 채팅방 입장후에 getChatroom 을 하면 새로고침해야 방정보 업데이트됨
  // 이전화면에서 axios 후 redux 에 채팅방 정보를 넣고 가져오게끔 변경
  if (chatroomData) {
      console.log("✅ redux 에서 꺼내온 데이터를 state에 저장함")
      setRoomInfo(chatroomData.chatroomInfo);
      setParticipants(chatroomData.chatEntrancesInfo);

      console.log("roomInfo", roomInfo);
      console.log("participants", participants);
    }

  const socketRef = useRef();


  // 접속 유저가 바뀌거나 채팅방 정보가 바뀌면 소켓에 연결하고 기본 세팅을 함
  // socket 들을 등록해서 메세지를 수신할 수 있게도 함
  useEffect(() => {
    console.log("🦄첫번째 useEffect roomInfo => ", roomInfo);

    // 소켓 연결 설정
    socketRef.current = io(process.env.REACT_APP_NODE_SERVER_URL, { path: '/socket.io' });

    const socket = socketRef.current;

    // 활발한 채팅방 함수 실행
    ActiveChatroomChecker(socketRef, roomInfo);

    if (Object.keys(roomInfo).length === 0){ //roomInfo 가 null or undefined 일 경우 대비
      console.log("🚨roomInfo 없어서 socket 연결없이 useEffect 종료");

      // 채팅방 정보(roomInfo) 없으면 요청 후 useEffect 종료
      getChatroom(chatroomID)
      .then(data => {
        setRoomInfo(data.ChatroomInfo);
        setParticipants(data.ChatEntrancesInfo);
      })
      .catch(error => console.log(error));

      return ;
    }

    // 채팅을 위해 노드서버와 웹소켓연결
    socket.on('connect', async () => {
      console.log('Connected to server', roomInfo.chatroomName);
    });

    // 멤버ID를 소켓ID에 매핑
    socket.emit('mapping_memberID_to_socketID', memberID, (result)=>{
        
      console.log(result); // 멤버 ID 와 매핑된 소켓아이디 확인
    })

    // 이전 채팅 불러오기
    socket.emit("msg_history", roomInfo, (messageHistory) => {

      const previousMessages = [];

      // 불러오기 시작 메세지 추가
      const startMsg = {
        type : 'notice',
        text : '이전 채팅 내역을 불러오고 있습니다'
      }
      previousMessages.push(startMsg);

      // 채팅 서버 DB 에서 불러온 과거 메세지
      console.log("메세지 히스토리 받은거 => ", messageHistory);
      
      messageHistory.forEach( history => {
        const { nickname, chatMsg, time, type } = history;
        const text = `${nickname} : ${chatMsg} \n( ${time} )`;

        previousMessages.push({ type: type ? type : 'other' , text : text });
      });
  
      // 불러오기 완료 메세지 추가
      const completeMsg = {
        type : 'notice',
        text : `${messageHistory.length} 개의 이전 채팅 내역을 모두 불러왔습니다! `
      }
      previousMessages.push(completeMsg);

      setReceivedMessage((prevMessages) => [...prevMessages, ...previousMessages]);
      
      console.log("메세지 히스토리 넣은거=> ", previousMessages);
    });

    // 실시간 소켓룸 및 실시간 접속자 정보 받아오기
    socket.emit('live_socketRoomInfo', roomInfo, initLiveSetting);

    // 채팅 메세지 수신 
    socket.on('specific_chat', (message) => {
      console.log("표시할 메세지 =>", message);
      setReceivedMessage((prevMessages) => [...prevMessages, message]);
    });

    // 입장 메세지 수신
    socket.on('enter_msg', (enterMsg) => {
      console.log("표시할 입장메세지 =>", enterMsg);
      setReceivedMessage((prevMessages) => [...prevMessages, enterMsg]);
    });

    // 퇴장 메세지 수신
    socket.on('leave_msg', (leaveMsg) => {
      console.log("표시할 퇴장메세지 =>", leaveMsg);
      setReceivedMessage((prevMessages) => [...prevMessages, leaveMsg]);
    });

    // 컴포넌트 언마운트 시 소켓 이벤트 리스너 정리
    return () => {
      console.log("unmount! socket off!");
      socket.off('message');
      socket.off('connect');
    };
  }, [memberID, roomInfo]);

  
  // 소켓에서 열린 실시간 채팅방 과 실시간 채팅유저정보를 받음
  const initLiveSetting = (socketRoom) => {
    const socket = socketRef.current;
    console.log("🌹생성된방?", socketRoom);

    // 채팅방 입장하며 해당 채팅방에 있는 실시간 member Id들을 조회 
    socket.emit("enter_room", socketRoom, (liveusers) => {

      console.log("🌹채팅방 실시간 접속자 정보", liveusers);
      setLiveParticipants(liveusers);
    });
  };

  // 채팅 메시지가 업데이트될 때마다 스크롤을 아래로 내립니다(개발중)
  useEffect( ()=>{
    
    const messagesContainer = document.querySelector('.messages');
    console.log("⚓ 스크롤 조정", messagesContainer)

    if (messagesContainer) {
      messagesContainer.scrollBottom = messagesContainer.scrollHeight;
    }

  },[receivedMessage])

  // 채팅 메세지 보내기
  const sendMessage = () => {

    // 내가 보낸 채팅 메세지 표시
    const myMessage = {
      type : 'mine', //css로 내가 보냈는지 남이 보냈는지 별도로 표기
      text : `${messageInput} \n( ${new Date()} )`
    }
    setReceivedMessage((prevMessages) => [...prevMessages, myMessage]);
    
    console.log("메세지 입력한거 => ", myMessage);

    const socket = socketRef.current;
    socket.emit('msg_toRoom', messageInput, roomInfo);
    setMessageInput('');
  };

  // 채팅방 나가기
  const leaveRoom = () => {
    const socket = socketRef.current;

    socket.emit("leave_room", roomInfo, (data) => {
      console.log("나갈예정인 방", data);
      
      navigate(`/chat/myChatroomList`);           
    });
  };

  // 이전 페이지에서 넘어와서 redux 데이터를 받는다면? 
  if (!roomInfo) {
    setTimeout(() => window.location.reload(), 1000);
    return <div>Loading...</div>;
  }

  return (
    <div className={module.chatContainer}>
      <div className={module.sidebarChat}>
        --------------------------------
        <p> 로그인 한놈 : {memberID} </p>
        --------------------------------

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
          {participants.map((participant, index) => (
            <div key={index}>
              <p><strong> memberID:</strong> {participant.chatroomMemberId} ({participant.chatroomMemberType})</p>
            </div>
          ))}
        </div>

        <div>
          <h2>실시간 채팅 참여자 목록 ({liveParticipants.length})</h2>
          {liveParticipants.map((liveParticipant, index) => (
            <div key={index}>
              <p><strong> socketID:</strong> {liveParticipant}</p>
            </div>
          ))}
        </div>
        
        <Link to='/chat/myChatroomList'>내 채팅방 목록</Link>
      </div>

        <div className={module.chat}>
          <div className={module.messages}>
            {receivedMessage.map((msg, index) => (
              <div key={index} className={`message ${msg.type === 'mine' ? 'mine-message' : msg.type === 'other' ? 'other-message' : 'notice-message'}`}>
                <p>{msg.text}</p>
              </div>
            ))}
          </div>
        <input
          type="text"
          value={messageInput}
          onChange={(e) => setMessageInput(e.target.value)}
          placeholder="메시지를 입력하세요..."
        />
        <button onClick={sendMessage}>Send</button>
        <button onClick={leaveRoom}>채팅방 나가기</button>
      </div>
    </div>
  );
};

export default Chatroom;
