import React, { useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import io from 'socket.io-client';
import module from './Chatroom.module.css'; // 스타일 파일을 import 합니다
import { getChatroom, addChatEntrance, kickChatroom } from './function/axios_api'
import { useSelector, useDispatch } from 'react-redux';
import { setFooterEnbaled } from '../../redux/slices/footerEnabledSlice'
import { Link } from 'react-router-dom';
import { useNavigate  } from 'react-router-dom';
import { CustomModal } from './function/CustomModal'

const Chatroom = () => {
  const [receivedMessage, setReceivedMessage] = useState([]); // 소켓에서 수신한 메세지
  const [messageInput, setMessageInput] = useState(''); // 입력창에 입력한 메세지
  const [participants, setParticipants] = useState([]); // 채팅방 참여자 (from spring boot)
  const [roomInfo, setRoomInfo] = useState({}); // 채팅방 정보
  const [liveParticipants, setLiveParticipants] = useState([]); // 채팅방 실시간 참여자 (from node)
  const [showModal, setShowModal] = useState(false); // 유저 프로필보기 / 추방하기 모달 on/off
  const [selectedParticipant, setSelectedParticipant] = useState(null); // 모달에 유저 정보 전달하기 위함
  const [showSidebar, setShowSidebar] = useState(false); // 채팅방 정보는 사이드바에 몰아넣기
  const [reRendering, setReRedering] = useState(false); // 조용히 리랜더링을 강제하고 싶을때 사용
  
  const member = useSelector((state) => state.auth.member);
  const authorization = useSelector((state) => state.auth.authorization);
  const memberID = member.memberId
  
  const chatroomMemberRole = roomInfo.chatroomCreator && roomInfo.chatroomCreator.memberId
  ? (roomInfo.chatroomCreator.memberId === memberID ? 'OWNER' : 'MEMBER')
  : 'MEMBER';
  
  console.log("member", member)
  console.log("authorization", authorization);

  console.log("\n\n\n🐬 Chatroom 컴포넌트 시작 \n\n\n")


  console.log("🦄랜더링 roomInfo => ", roomInfo);

  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const chatroomID = queryParams.get('chatroomID');
  const chatroomData = useSelector(state => state.chatroom.chatroomData);
  const footerEnabled = useSelector((state) => state.footerEnabled.value);

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

  // 새로고침시 socketID가 다시만들어져서 계속 재입장하는 버그를 픽스한다
  let sessionID = localStorage.getItem('sessionID');
  if (!sessionID) {
      sessionID = generateRandomID(); // 임의의 고유 ID 생성
      localStorage.setItem('sessionID', sessionID);
  }
  function generateRandomID() {
    return '_' + Math.random().toString(36).substr(2, 9);
  }

  // 접속 유저가 바뀌거나 채팅방 정보가 바뀌면 소켓에 연결하고 기본 세팅을 함
  // socket 들을 등록해서 메세지를 수신할 수 있게도 함
  useEffect(() => {
    console.log("🦄roomInfo 업데이트로 첫번째 useEffect 실행 => ", roomInfo);

    // 소켓 연결 설정
    socketRef.current = io(process.env.REACT_APP_NODE_SERVER_URL, { 
      path: '/socket.io',
      query: {
        sessionID: sessionID
      }
    });

    const socket = socketRef.current;


    if (Object.keys(roomInfo).length === 0){ //roomInfo 가 null or undefined 일 경우 대비
      console.log("🚨roomInfo 없어서 socket 연결없이 useEffect 종료");

      // 채팅방 정보(roomInfo) 없으면 요청 후 useEffect 종료
      getChatroom(chatroomID)
      .then(data => {

        //유저가 채팅방에 입장할 때 chatEntranceInfo 에 memberID 가 없으면 ParticiPants 에 등록하기
        const chatEntrancesInfo = data.ChatEntrancesInfo;
        const chatEntranceChecked = chatEntrancesInfo.find(entrance => entrance.chatroomMember.memberId === memberID);
        
        //단 1:1채팅방에는 채팅수락시 이미 chatEntrance가 서버상에 등록되므로 생략
       if(!chatEntranceChecked && data.ChatroomInfo.chatroomType==="GROUP_CHATTING"){
        console.log(chatEntrancesInfo , " <= 여기에 멤버아이디 ", memberID, " 가 없으므로 chackEntranceChecked 를 추가하려고합니다 => ",chatEntranceChecked )
 
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
      console.log('Connected to server with sessionID: ', sessionID);
      console.log('Connected to server on roomID: ', roomInfo.chatroomName);
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
        const { sender, chatMsg, time, type, readMembers } = history;

        previousMessages.push({ type: sender === memberID ? 'mine' : 'other' , sender : sender, text : chatMsg , timestamp : time, readMembers : readMembers });
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
    socket.emit('live_socketRoomInfo', roomInfo, (liveusers) =>{

      console.log("🌹실시간 유저?", liveusers);
      setLiveParticipants(liveusers);

    });

    // 채팅방 입장하며 해당 채팅방에 있는 실시간 member Id들을 조회 
    socket.emit("enter_room", roomInfo.chatroomName, (data) => {

      console.log("🌹채팅방 입장", data);

    });
 
    // 입장과 동시에 채팅읽음처리
    socket.emit('message_read', memberID, roomInfo, (data) =>{
      console.log("🟥⚪메세지 읽었습니다 결과는 ", data)

      setReRedering(prev => !prev)
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
    socket.on('specific_chat', async (message) => {
 
      // 내 아디이를 읽음목록에 추가
      if (!message.readMembers.includes(memberID)) {
        message.readMembers.push(memberID);
      }
      
      console.log("표시할 메세지(읽음후) =>", message);

      // 수신했으면 읽은거로 처리
      await socket.emit('message_read', memberID, roomInfo, async (data) =>{
  
        await setReceivedMessage((prevMessages) => [...prevMessages, message]);
        console.log("🟥⚪메세지 읽고 내꺼에 저장 결과는 ", data)
      })

      setReRedering(prev => !prev)
    });

    // 공지 메세지 수신
    socket.on('notice_msg', (noticeMsg) => {
      console.log("표시할 공지메세지 =>", noticeMsg);
      setReceivedMessage((prevMessages) => [...prevMessages, noticeMsg]);
    });

    // 채팅방 강퇴당하기
    socket.on('kicked_room', (data) => {
      const { roomId } = data;
      console.log(`방 ${roomId}에서 강퇴됨`);
      
      // 사용자 인터페이스 업데이트
      alert(`방 ${roomId}에서 강퇴되었습니다.`);

      // 강퇴된 방에서 나가는 로직 추가
      navigate(`/chat/myChatroomList`);
    })
    // 컴포넌트 언마운트 시 소켓 이벤트 리스너 정리
    return () => {
      console.log("unmount! socket off!");
      socket.off('message');
      socket.off('connect');
    };
  }, [roomInfo])
  
  // 화면 리랜더링하고 싶을때 씁니다
  useEffect( ()=>{
    console.log("-------- 조용하게 화면 리랜더링 ------")
    console.log(reRendering)
  },[reRendering])

  // 채팅 메세지 보내기
  const sendMessage = () => {

    // 내가 보낸 채팅 메세지 표시
    const myMessage = {
      type : 'mine', //css로 내가 보냈는지 남이 보냈는지 별도로 표기
      text : messageInput,
      sender : member.nickname,
      timestamp : new Date(),
      readMembers : [memberID]
    }
    setReceivedMessage((prevMessages) => [...prevMessages, myMessage]);
    
    console.log("메세지 입력한거 => ", myMessage);

    const socket = socketRef.current;
    socket.emit('msg_toRoom', messageInput, roomInfo);
    setMessageInput('');
  };

  // 채팅방 잠깐 나가기
  const leaveRoom = () => {
    const socket = socketRef.current;

    socket.emit("leave_room", roomInfo, (data) => {
      console.log("나갈예정인 방", data);
      
      navigate(`/chat/myChatroomList`);           
    });
  };

  // 채팅방 아예 나가기
  const leaveRoomForever = () => {

    alert(`채팅방 ${roomInfo.chatroomID} 에서 퇴장합니다`)

    //DB에서도 나가기
    kickChatroom(roomInfo.chatroomID, memberID)
    .then(chatroomData => {
      console.log("회원이 나갔습니다. 업데이트된 채팅방 정보 => ", chatroomData);
      setRoomInfo([...chatroomData.chatroom])
      setParticipants(chatroomData.activeChatEntrances)
    })
    .catch(error => console.log(error));

    const socket = socketRef.current;
    //현재 소켓에서 나가면서 메세지보내기
    socket.emit("leave_room_forever", roomInfo, (data) => {
      console.log("나갈예정인 방", data);
      
      navigate(`/chat/myChatroomList`);           
    });
  }

  // 채팅방 내보내기
  function kickRoom(currentChatroomId, targetMemberId) {

    // 강퇴메세지 보내고 소켓에서도 내보내기
    const socket = socketRef.current;
    socket.emit('kick_room', memberID, roomInfo.chatroomName, targetMemberId);
    console.log(`🖐️kickRoom 실행 : ${memberID}가 ${targetMemberId}를 ${currentChatroomId} 에서 내보냄`)
  }
 
  // 채팅메세지 올라오면 스크롤다운
  const chatBodyRef = useRef(null);

  useEffect(() => {
    // Scroll to the bottom of the chat body whenever receivedMessage changes
    if (chatBodyRef.current) {
      chatBodyRef.current.scrollTop = chatBodyRef.current.scrollHeight;
      //scrollTop =  number of pixels that the content of an element is scrolled vertically.
    }
  }, [receivedMessage]);

  const dispatch = useDispatch();

  // Footer 숨기기
  useEffect(() => {
    
    dispatch(setFooterEnbaled(false));

    return () => {
      // 컴포넌트가 언마운트될 때 Footer 다시 보이기
      dispatch(setFooterEnbaled(true));
    };
  }, []);


  /* 몽고dB 채팅메세지에 memberId 만 딸랑 집어넣었는데 DB 뒤엎기 싫어서 이러고 있음 */

  // 채팅메세지 작성자를 participant 과 매핑해서 닉네임 받아오기
  function particiPantToMsgSenderNickName(sender){
    const matchedParticipant = participants.find(p => p.chatroomMember.memberId === sender);

    // 공지메세지에는 msg.sender 가 없어서 예외처리
    if (matchedParticipant && matchedParticipant.chatroomMember) {
      const { nickname } = matchedParticipant.chatroomMember;
      
      return (
        <div className={module.sender}>
          <span> {nickname} </span>
        </div>      
      );
    } else {
      // Handle case where participant or chatroomMember is not found
      return null; // or return a placeholder image or handle the case as needed
    }
  }

  // 채팅메세지 작성자를 participant 과 매핑해서 닉네임 받아오기
  function particiPantToMsgImgeUrl(sender){
    const matchedParticipant = participants.find(p => p.chatroomMember.memberId === sender);

    // 공지메세지에는 msg.sender 가 없어서 예외처리
    if (matchedParticipant && matchedParticipant.chatroomMember) {
      const { profilePhotoUrl } = matchedParticipant.chatroomMember;
      
      return (
          <img className={module.profileImage} src={profilePhotoUrl ? profilePhotoUrl : `${process.env.PUBLIC_URL}/image/defaultMemberProfilePhoto.png`} alt="Profile"></img>
      );
    } else {
      // Handle case where participant or chatroomMember is not found
      return null; // or return a placeholder image or handle the case as needed
    }
  }
  
  // 이전 페이지에서 넘어와서 redux 데이터를 받는다면? 
  if (!roomInfo) {
    setTimeout(() => window.location.reload(), 1000);
    return <div>...</div>;
  }


  
  return (
    // <div className={module.chatContainer} style={{ height: footerEnbled ? 'calc(100% - 50px)' : '100%', transition: 'height 0.3s ease' }}></div>
    <div className={module.chatContainer}>
      <button onClick={leaveRoom} className={module.backButton}>
        ⏪ Back
      </button>

      <button onClick={() => setShowSidebar(!showSidebar)} className={module.sidebarButton}>
        {showSidebar ? 'Hide Sidebar ⏩' : 'Show Sidebar ⏩'}
      </button>

      {showSidebar && (
      <div className={`${module.sidebarChat} ${showSidebar ? module.show : ''}`}>

        <br/><br/><br/>
        <div className={module.container}>
          <p> 로그인 유저 : {memberID} ({chatroomMemberRole}) </p>

          <div className={module.chatroomInfo}>
            <div>
              <h2>채팅방 이름: {roomInfo.chatroomName}</h2>
              {/* <p><strong>채팅방 ID:</strong> {roomInfo.chatroomID}</p> */}
              <p><strong>건물 ID:</strong> {roomInfo.buildingId}</p>
              {roomInfo.chatroomMinTemp !== null && (
                <p><strong>다정온도 제한:</strong> {roomInfo.chatroomMinTemp}°  C</p>
              )}
              {/* <p><strong>방장:</strong> {roomInfo.chatroomCreator}</p> */}
              <p><strong>채팅방 종류:</strong> {roomInfo.chatroomType}</p>
              {/* {roomInfo.chatroomType === 'PRIVATE_CHATTING' && (
                <img className={module.profileImage} src={roomInfo.chatroomCreator.profilePhotoUrl} alt="Profile" />
              )} */}
            </div> 
          </div>

          <div className={module.chatroomParticipantList}>
            <h2>채팅 참여자 목록 ({participants.length})</h2>
            {console.log("파티시팬트", participants)}
            {console.log("룸인포", roomInfo)}
            {console.log("라이브 파티시팬트", liveParticipants)}
            {participants.map((participant, index) => (
              <div key={index} className={module.participant}>
                <p>
                  {/* <strong>memberID:</strong>{' '} &nbsp; */}
                  <img className={module.profileImage} src={participant.chatroomMember.profilePhotoUrl ? participant.chatroomMember.profilePhotoUrl : `${process.env.PUBLIC_URL}/image/defaultMemberProfilePhoto.png`} alt="Profile"/>
                  <span onClick={() => { 
                    setShowModal(true);
                    setSelectedParticipant(participant.chatroomMember);
                    }} 
                    className={module.clickable} 
                  > 
                    {participant.chatroomMember.nickname} 
                    {/* ({participant.chatroomMember.memberId}) */}
                  </span>  &nbsp;
                  ({participant.chatroomMemberType}) 
                  <CustomModal
                    kickRoom = {kickRoom}
                    showModal = {showModal} // showModal on off 정보
                    setShowModal = {setShowModal} // show Modal on off 함수
                    setParticipants = {setParticipants}
                    roomInfoUpdate={setRoomInfo}  // 강퇴후 채팅방 정보를 업데이트하기 위한 함수
                    currentChatroomID={roomInfo.chatroomID} // 채팅방ID
                    loginMemberRole={chatroomMemberRole}  // 채팅방에서 로그인유저의 권한
                    targetMember={selectedParticipant} // 클릭한 회원
                    loginMemberID = {memberID}
                  />
                  {liveParticipants.includes(participant.chatroomMember.memberId) && (
                    <span className={module.liveIndicator}>🟢</span>
                  )}
                  {participant.chatroomMember.memberId === memberID && (
                    <span className={module.myLabel}>Me</span>
                  )}
                </p>
              
              </div>
            ))}
          </div>

          {/* <div>
            <h2>실시간 채팅 참여자 목록 ({liveParticipants.length})</h2>
            {liveParticipants.map((liveParticipant, index) => (
              <div key={index}>
                <p><strong> socketID:</strong> {liveParticipant}</p>
              </div>
            ))}
          </div>         */}
          <button onClick={leaveRoomForever} className={module.leaveButton}>채팅방 나가기</button>
          </div>
      </div>
      )}

      <div className={module.chatBody} ref={chatBodyRef}>
      {console.log(receivedMessage)}
        {receivedMessage.map((msg, index) => (
          <div key={index} className={`${module.chatMessage} ${msg.type === 'mine' ? module.question : msg.type === 'other' ? module.response : module.notice}`}>
            {msg.type === 'other' && msg.sender && (
               particiPantToMsgSenderNickName(msg.sender)
            )}
            <div className={module.messageContent} style={{ justifyContent: msg.type === 'mine' ? 'flex-end' : 'flex-start' }}>
              {msg.type === 'mine' && (
                <span className={module.unreadCount}>
                  {(participants.length - msg.readMembers.length) > 0 ? (participants.length - msg.readMembers.length) : 0} 
                </span>
              )}
              {particiPantToMsgImgeUrl(msg.sender)}
              <div className={module.messageText}>{msg.text}</div>
              {msg.type === 'other' && (
                <span className={module.unreadCount}>
                  {(participants.length - msg.readMembers.length) > 0 ? (participants.length - msg.readMembers.length) : 0} 
                </span>
              )}
            </div>
            <div className={module.messageTimestamp}>
              {msg.timestamp ? msg.timestamp.toString() : ''}
            </div>   
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
      </div>
    </div>

  );
};

export default Chatroom;
