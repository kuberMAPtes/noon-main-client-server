import React, { useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import io from 'socket.io-client';
import module from './Chatroom.module.css'; // 스타일 파일을 import 합니다
import { getChatroom, addChatEntrance } from '../Chat/function/axios_api'
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { useNavigate  } from 'react-router-dom';
import { CustomModal } from './function/CustomModal'
import { BootstrapModal } from './function/BootstrapModal'

const Chatroom = () => {
  const [receivedMessage, setReceivedMessage] = useState([]); // 소켓에서 수신한 메세지
  const [messageInput, setMessageInput] = useState(''); // 입력창에 입력한 메세지
  const [participants, setParticipants] = useState([]); // 채팅방 참여자 (from spring boot)
  const [roomInfo, setRoomInfo] = useState({}); // 채팅방 정보
  const [liveParticipants, setLiveParticipants] = useState([]); // 채팅방 실시간 참여자 (from node)
  const [showModal, setShowModal] = useState(false); // 유저 프로필보기 / 추방하기 모달 on/off
  const [selectedParticipant, setSelectedParticipant] = useState(null); // 모달에 유저 정보 전달하기 위함
  const [showSidebar, setShowSidebar] = useState(false); // 채팅방 정보는 사이드바에 몰아넣기

  
  const member = useSelector((state) => state.auth.member);
  const authorization = useSelector((state) => state.auth.authorization);
  const memberID = member.memberId
  const chatroomMemberRole = roomInfo.chatroomCreatorId === memberID ? 'OWNER' : 'MEMBER';

  console.log("member", member)
  console.log("authorization", authorization);

  console.log("\n\n\n🐬 Chatroom 컴포넌트 시작 \n\n\n")


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
    console.log("🦄roomInfo 업데이트로 첫번째 useEffect 실행 => ", roomInfo);

    // 소켓 연결 설정
    socketRef.current = io(process.env.REACT_APP_NODE_SERVER_URL, { path: '/socket.io' });

    const socket = socketRef.current;


    if (Object.keys(roomInfo).length === 0){ //roomInfo 가 null or undefined 일 경우 대비
      console.log("🚨roomInfo 없어서 socket 연결없이 useEffect 종료");

      // 채팅방 정보(roomInfo) 없으면 요청 후 useEffect 종료
      getChatroom(chatroomID)
      .then(data => {
        //chatEntranceInfo 에 memberID 가 없으면 ParticiPants 에 등록하기
        const chatEntrancesInfo = data.ChatEntrancesInfo;
        const chatEntranceChecked = chatEntrancesInfo.find(entrance => entrance.chatroomMemberId === memberID);
   
        if(!chatEntranceChecked){
          addChatEntrance(chatroomID, memberID)
          .then(chatEntrance => {
            chatEntrancesInfo.push(chatEntrance);
            console.log("newEntrance 추가된 participants", chatEntrancesInfo);
          })
          .catch(error => {
            console.error("채팅 입장 추가 실패:", error);
          });
        }

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
        const { nickname, chatMsg, time, type, readMembers } = history;
        const text = `${nickname} : ${chatMsg} \n( ${time} )`;

        previousMessages.push({ type: type ? type : 'other' , text : text , readMembers : readMembers });
      });
  
      // 불러오기 완료 메세지 추가
      const completeMsg = {
        type : 'notice',
        text : `${messageHistory.length} 개의 이전 채팅 내역을 모두 불러왔습니다! `,
      }
      previousMessages.push(completeMsg);

      setReceivedMessage((prevMessages) => [...prevMessages, ...previousMessages]);
      
      console.log("메세지 히스토리 넣은거=> ", previousMessages);
    });

    // 실시간 소켓룸 및 실시간 접속자 정보 받아오기
    socket.emit('live_socketRoomInfo', roomInfo, initLiveSetting);

    // 입장과 동시에 채팅읽음처리
    socket.emit('message_read', memberID, roomInfo, (data) =>{
      console.log("🟥⚪메세지 읽었습니다 결과는 ", data)
    })

    // (개발중) 다른유저 채팅 메세지 읽음시 메세지 업데이트 
    // socket.on('message_read_notice', (data)=>{
    //   setMessageReadUpdator(prevState => !prevState)
    // } )

    // 다른유저 채팅방 입장시 실시간 유저에 추가
    socket.on("enter_room_notice", (data)=>{
      console.log("다른 유저가 입장해서 가져온 데이터", data)
      setLiveParticipants(data);
    })

    // 다른유저 채팅방 퇴장시 실시간 유저에 추가
    socket.on("leave_room_notice", (data)=>{
      console.log("다른 유저가 퇴장해서 가져온 데이터", data)
      setLiveParticipants(data);
    })
    
    // 채팅 메세지 수신 
    socket.on('specific_chat', (message) => {
      console.log("표시할 메세지 =>", message);
      setReceivedMessage((prevMessages) => [...prevMessages, message]);
    });

    // 공지 메세지 수신
    socket.on('notice_msg', (noticeMsg) => {
      console.log("표시할 공지메세지 =>", noticeMsg);
      setReceivedMessage((prevMessages) => [...prevMessages, noticeMsg]);
    });

    // 컴포넌트 언마운트 시 소켓 이벤트 리스너 정리
    return () => {
      console.log("unmount! socket off!");
      socket.off('message');
      socket.off('connect');
    };
  }, [roomInfo]);
  
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
      text : messageInput,
      timestamp : new Date(),
      readMembers : [memberID]
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

  // 채팅방 내보내기
  function kickRoom(currentChatroomId, targetMemberId) {

    // 강퇴메세지 보내고 소켓에서도 내보내기
    const socket = socketRef.current;
    socket.emit('kick_room', memberID, roomInfo.chatroomName, targetMemberId);
    console.log(`🖐️kickRoom 실행 : ${memberID}가 ${targetMemberId}를 ${currentChatroomId} 에서 내보냄`)
  }
  
  // 이전 페이지에서 넘어와서 redux 데이터를 받는다면? 
  if (!roomInfo) {
    setTimeout(() => window.location.reload(), 1000);
    return <div>...</div>;
  }

  
  return (
    <div className={module.chatContainer}>
      <button onClick={() => setShowSidebar(!showSidebar)} className={module.sidebarButton}>
        {showSidebar ? 'Hide Sidebar' : 'Show Sidebar'}
      </button>

      {showSidebar && (
      <div className={module.sidebarChat}>

        <br/><br/>
        --------------------
        <p> 로그인 한놈 : {memberID} ({chatroomMemberRole}) </p>
        --------------------

        <div>
          <h2>채팅방 이름: {roomInfo.chatroomName}</h2>
          <p><strong>채팅방 ID:</strong> {roomInfo.chatroomID}</p>
          <p><stroing>건물 ID:</stroing> {roomInfo.buildingId}</p>
          <p><strong>다정온도 제한:</strong> {roomInfo.chatroomMinTemp}°C</p>
          <p><strong>방장:</strong> {roomInfo.chatroomCreatorId}</p>
          <p><strong>채팅방 종류:</strong> {roomInfo.chatroomType}</p>
        </div> 

        <div>
          <h2>채팅 참여자 목록 ({participants.length})</h2>
          {console.log("파티시팬트", participants)}
          {console.log("룸인포", roomInfo)}
          {console.log("셀렉티드 파티시팬트", selectedParticipant)}
          {participants.map((participant, index) => (
            <div key={index}>
              <p>
                <strong>memberID:</strong>{' '} &nbsp;
                <span onClick={() => { 
                  setShowModal(true);
                  setSelectedParticipant(participant.chatroomMember);
                  }} 
                  className={module.clickable} 
                > 
                  {participant.chatroomMember.nickname} ({participant.chatroomMember.memberId})
                </span>  &nbsp;
                ({participant.chatroomMemberType }) 
                <CustomModal
                  kickRoom = {kickRoom}
                  showModal = {showModal} // showModal on off 정보
                  setShowModal = {setShowModal} // show Modal on off 함수
                  setParticipants = {setParticipants}
                  roomInfoUpdate={setRoomInfo}  // 강퇴후 채팅방 정보를 업데이트하기 위한 함수
                  currentChatroomID={roomInfo.chatroomID} // 채팅방ID
                  loginMemberRole={chatroomMemberRole}  // 채팅방에서 로그인유저의 권한
                  targetMember={selectedParticipant} // 클릭한 회원
                />
                {liveParticipants.includes(participant.chatroomMemberId) && (
                  <span className={module.liveIndicator}>🟢</span>
                )}
              </p>
            
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
      )}

      <div className={module.chatBody}>
        {receivedMessage.map((msg, index) => (
          <div key={index} className={`${module.chatMessage} ${msg.type === 'mine' ? module.question : msg.type === 'other' ? module.response : module.noticeMessage}`}>
            <div className={module.messageText}>{msg.text}</div>
            <div className={module.messageTimestamp}>{msg.timestamp ? msg.timestamp.toString() : ''}</div>
            {msg.type !== 'notice' && (
                  <p>안읽은 사람 수 : { participants.length - msg.readMembers.length }</p>
              )}      
          </div>
        ))}
    </div>

    <div className={module.chatFooter}>
      <input
        type="text"
        value={messageInput}
        onChange={(e) => setMessageInput(e.target.value)}
        onKeyPress={(e) => {
          if (e.key === 'Enter') {
            sendMessage();
          }
        }}
        placeholder="메시지를 입력하세요..."
      />
      <button onClick={sendMessage} style={{ backgroundColor: '#9BAAF8' }} >Send</button>
      <button onClick={leaveRoom} style={{ backgroundColor: '#9BAAF8' }}>채팅방 나가기</button>
      </div>
    </div>

  );
};

export default Chatroom;
