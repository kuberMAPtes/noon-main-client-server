import React, { useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import io from 'socket.io-client';
import './Chatroom.css'; // 스타일 파일을 import 합니다
import { getChatroom } from '../../lib/axios_api';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

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
  const [liveParticipants, setLiveParticipants] = useState([]);

  const socketRef = useRef();

  useEffect(() => {
    // 소켓 연결 설정
    socketRef.current = io(process.env.REACT_APP_NODE_SERVER_URL, { path: '/socket.io' });

    const socket = socketRef.current;

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
      
    // redux 에서 가져오지만 새로고침시에도 채팅방을 그대로 두기 위해 두번 axios
    getChatroom(chatroomID)
      .then(data => {
        setRoomInfo(data.ChatroomInfo);
        setParticipants(data.ChatEntrancesInfo);
      })
      .catch(error => console.log(error));
    });

    console.log('Connected to server', roomInfo.chatroomName);

    // 멤버ID를 소켓ID에 매핑
    socket.emit('mapping_memberID_to_socketID', memberID, (result)=>{
        
      console.log(result); // 멤버 ID 와 매핑된 소켓아이디 확인
    })

    // 메세지 수신 (왜 useEffect 안에 들어와야하지?)
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
  }, [chatroomData]);

  // 채팅방 정보가 업데이트되면 호출
  useEffect(() => {
    const socket = socketRef.current;
    if (roomInfo) {
      socket.emit('init_chatRoom', roomInfo, initSetting);
    }
  }, [roomInfo]);

  const initSetting = (socketRoom) => {
    const socket = socketRef.current;
    console.log("🌹생성된방?", socketRoom);

    // 채팅방 입장하며 해당 채팅방에 있는 실시간 member Id들을 조회 
    socket.emit("enter_room", socketRoom, (liveusers) => {

      console.log("채팅방 실시간 접속자 정보", liveusers);
      setLiveParticipants(liveusers);
    });

    // 채팅내역 불러오기
    socket.on("msg_history", (messageHistory) => {
      console.log("메세지 히스토리 받은거 => ", messageHistory);
      const previousMessages = [];

      messageHistory.forEach( history => {
        const { nickname, chatMsg, time, type } = history;
        const text = `${nickname} : ${chatMsg} (${time})`;

        previousMessages.push({ type: type ? type : 'other' , text : text });
      });
 
      setReceivedMessage((prevMessages) => [...prevMessages, previousMessages]);

      console.log("메세지 히스토리 넣은거 => ", previousMessages);
    });
  };

  // 채팅 메세지 보내기
  const sendMessage = () => {

    // 내가 보낸 채팅 메세지 표시
    const myMessage = {
      type : 'mine', //css로 내가 보냈는지 남이 보냈는지 별도로 표기
      text : `나 : ${messageInput} (${new Date()})`
    }
    setReceivedMessage((prevMessages) => [...prevMessages, myMessage]);

    const socket = socketRef.current;
    socket.emit('msg_toRoom', messageInput, roomInfo);
    setMessageInput('');
  };

  // 채팅방 나가기
  const leaveRoom = () => {
    const socket = socketRef.current;
    socket.emit("leave_room", roomInfo, (data) => {
      console.log("나갈예정인 방", data);
      /* 여기에 data(roomName) 받아서 채팅방 나가는 코드 추가해야함 */
    });
  };

  // 이전 페이지에서 넘어와서 redux 데이터를 받는다면? 
  if (!roomInfo) {
    setTimeout(() => window.location.reload(), 1000);
    return <div>Loading...</div>;
  }

  return (
    <div className="chat-container">
      <div className="sidebar">
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

        <div className="chat">
          <div className="messages">
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
