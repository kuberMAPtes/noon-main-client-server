import React, { useState, useEffect } from 'react';
import { io } from 'socket.io-client';
// import '../App.css';

const socket = io('http://localhost:8081', { path: '/socket.io' });

function ChatTest() {
  const [nickname, setNickname] = useState('');
  const [chatInput, setChatInput] = useState('');
  const [chatInputSpecific, setChatInputSpecific] = useState('');
  const [makeChatRoomInput, setMakeChatRoomInput] = useState('');
  const [currentChatRoomNames, setCurrentChatRoomNames] = useState([]); // 현재 채팅방 목록
  const [roomPersonnel, setRoomPersonnel] = useState([]);
  const [messages, setMessages] = useState([]);
  const [chatDisplay, setChatDisplay] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [searchCondition, setSearchCondition] = useState('');

  useEffect(() => {
    socket.on('connect', () => {
      console.log('Connected to server');

      // show opened publicRooms and its personnel 
      socket.emit('init_chatRoom', initSetting);
    });

    socket.on('room_info', (roomInfo) => {
      setRoomPersonnel(roomInfo.members);
    });

    socket.on('welcome_event', (msg) => {
      setMessages((prevMessages) => [...prevMessages, msg]);
    }); 

    socket.on('msg', (chat) => {
      setMessages((prevMessages) => [...prevMessages, ` 📢(모두에게) ${chat.nickname} : ${chat.chatMsg} (보낸시간 : ${chat.time})`]);
    });

    socket.on('specific_chat', (chat) => {
      setMessages((prevMessages) => [...prevMessages, `🤫(채팅방에만) ${chat.nickname} : ${chat.chatMsg} (보낸시간 : ${chat.time})`]);
    });
  }, []);

  // show opened publicRooms and its personnel 
  const initSetting = (currentChatRoomAndPersonnel) => {
    setCurrentChatRoomNames(currentChatRoomAndPersonnel.publicRooms);
    setRoomPersonnel(currentChatRoomAndPersonnel.Personnel.map(member => member[0]));
  };

  const displayMyChatRoom = () => {
    console.log('displayMyChatRoom(), ChatRoomList => ', currentChatRoomNames);
  };

  // display user's current room list
  const displayCurrentChatRoom = (roomName) => {
    console.log('displayMyChatRoom(), currentChatRoomName => ', roomName);
  };

  const handleMakeChatRoom = (e) => {
    e.preventDefault();
    socket.emit('enter_room', makeChatRoomInput, (roomName) => {
      displayMyChatRoom();
      displayCurrentChatRoom(roomName);
    });
  };

  const handleQuitChatRoom = (e) => {
    e.preventDefault();
    socket.emit('leave_room', currentChatRoomNames.pop(), (roomName) => {
      displayMyChatRoom();
      displayCurrentChatRoom(roomName);
    });
  };

  const handleChatFormSpecific = (e) => {
    e.preventDefault();
    socket.emit('msg_toRoom', chatInputSpecific, currentChatRoomNames);
    setChatInputSpecific('');
  };

  const handleChatForm = (e) => {
    e.preventDefault();
    socket.emit('msg', chatInput);
    setChatInput('');
  };

  const handleNicknameForm = (e) => {
    e.preventDefault();
    socket.emit('nickname', nickname);
  };

  const handleChatHistoryButton = async () => {
    try {
      const response = await fetch('/api/chatSearch');
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const chatHistory = await response.json();
      let chatHistoryHTML = '';
      chatHistory.forEach(chat => {
        chatHistoryHTML += `${chat.nickname} : ${chat.chatMsg} (${chat.time}) <br/>`;
      });
      setChatDisplay(chatHistoryHTML);
    } catch (error) {
      console.error('Error fetching chat history:', error);
    }
  };

  const handleChatSearchedHistoryForm = async (e) => {
    e.preventDefault();
    const url = new URL('/api/chatSearch', window.location.origin);
    url.searchParams.append('searchTerm', searchTerm);
    url.searchParams.append('searchCondition', searchCondition);

    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const chatSearchedHistory = await response.json();
      let chatHistoryHTML = '';
      chatSearchedHistory.forEach(chat => {
        chatHistoryHTML += `${chat.nickname} : ${chat.chatMsg} (${chat.time}) <br/>`;
      });
      setChatDisplay(chatHistoryHTML);
    } catch (error) {
      console.error('Error fetching searched chat history:', error);
    }
  };

  return (
    <div className="App">
      <ul id="chatRoomList">
        {currentChatRoomNames.length === 0 ? (
          <h2>채팅방이 없습니다 만들어주세요🤫</h2>
        ) : (
          currentChatRoomNames.map(room => (
            <li key={room}>
              {room}
              <button onClick={() => socket.emit('enter_room', room, displayCurrentChatRoom)}>
                입장하기
              </button>
            </li>
          ))
        )}
      </ul>

      <form id="makeChatRoom_form" onSubmit={handleMakeChatRoom}>
        <input
          id="makeChatRoom_input"
          value={makeChatRoomInput}
          onChange={(e) => setMakeChatRoomInput(e.target.value)}
        />
        <button type="submit">새로운 채팅방 입장하기</button>
      </form>

      <form id="quitChatRoom_form">
        <button id="quitChatRoom" onClick={handleQuitChatRoom}>
          채팅방 나가기(공사중)
        </button>
      </form>

      <div id="chatRoomNamePosition">
        <h1>&nbsp; 쿠버맵티스 공용 서버에용</h1>
      </div>

      <ul id="room_personnel">
        채팅 참여 인원 ({roomPersonnel.length})
        {roomPersonnel.map(person => (
          <li key={person}>{person}</li>
        ))}
      </ul>

      <ul id="messages">
        {messages.map((msg, index) => (
          <li key={index}>{msg}</li>
        ))}
      </ul>

      <form id="chat_form_specific" onSubmit={handleChatFormSpecific}>
        <input
          id="chat_input_specific"
          value={chatInputSpecific}
          onChange={(e) => setChatInputSpecific(e.target.value)}
        />
        <button type="submit">Send (접속중 채팅방)</button>
      </form>

      <form id="chat_form" onSubmit={handleChatForm}>
        <input
          id="chat_input"
          value={chatInput}
          onChange={(e) => setChatInput(e.target.value)}
        />
        <button type="submit">Send (전체 채팅방)</button>
      </form>

      <form id="nickname_form" onSubmit={handleNicknameForm}>
        <input
          id="nickname_input"
          value={nickname}
          onChange={(e) => setNickname(e.target.value)}
        />
        <button type="submit">닉네임 변경</button>
      </form>

      <h3>개발 history</h3>
      
      <pre id="chatDisplay">{chatDisplay}</pre>

      <form id="chatSearchedHistoryAll" onSubmit={handleChatSearchedHistoryForm}>
        <label htmlFor="search-term">Search:</label>
        <input
          type="text"
          id="search-term"
          name="searchTerm"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="검색어를 입력하셈"
        />
        <label htmlFor="search-Condition">검색조건:</label>
        <select
          id="search-Condition"
          name="searchCondition"
          value={searchCondition}
          onChange={(e) => setSearchCondition(e.target.value)}
        >
          <option value="chatNickname">닉네임</option>
          <option value="chatDate">채팅날짜</option>
          <option value="chatMsg">내용</option>
        </select>
        <button type="submit">1) 검색하여 채팅내용 불러오기 (클릭)</button>
        <button type="button" id="chatHistoryAll" onClick={handleChatHistoryButton}>
          2) 채팅내용 전체 불러오기 (클릭)
        </button>
      </form>

      <br/><br/><br/>
    <strong>개발완료</strong><br/>
    24.5.17(금) - 1:1 채팅기능 구현 (완료) <br/>
    24.5.18(토) - 닉네임 변경기능 (완료) <br/>
    24.5.18(토) - 채팅방 인원 수 표시, 최초 채팅방 접속일자 표시 (완료) <br/>
    24.5.19(일) - 채팅방 접속자 표시, 채팅별 전송일자 표시 (완료) <br/>
    24.5.20(월) - 채팅내용 몽고DB 저장하고 전체 채팅 조회하기 (완료) <br/>
    24.5.22(수) - 특정 닉네임/날짜/채팅내용별로 채팅메세지 선택 조회하기 (완료)<br/>
    24.5.25(토) - 채팅방 생성 (진행완료) <br/>
    24.5.27(월) - 채팅방 나가기 (진행완료) <br/>
    24.5.28(화) - 다른 채팅방 입장 및 기존 채팅방 재입장 (진행완료) <br/>
    24.5.28(화) - 서버에 존재하는 전체 채팅방 표시 (진행완료) <br/>

    <br/>

    <strong>개발예정</strong>
    (개념, 코드 정리하기 + 어댑터공부)
    <br/>
    24.5.31(금) - 리액트전환 <br/>
    24.5.31(금) - 채팅방 CRUD 하기 (feat. 스프링) <br/>
    <li> Create : 채팅방 만들면 DB에 남기기 (Spring - mySQL) </li>
    <li> Read   : 채팅방 (목록띄우고) 찾아들어가서 채팅하기 (Node - mongoDB) </li>
    <li> Update : 채팅방 이름 바꾸기</li>
    <li> Delete : 채팅방 터뜨리거나 인원이 0명이면 자동 소멸되도록</li>
    24.5.31(토) - 채팅삭제 <br/> 
    24.5.31(토) - 채팅에 이미지, 동영상 올리기 <br/>
    24.5.31(토) - 채팅읽음 <br/>
    

    <br/>
    <strong>해결중인 버그임돠</strong>
    <br/>
    채팅방 나가기 -> 나가기는 됨. 근데 해당 채팅방 다른유저 채팅참여인원, 참여목록에는 그대로 남는 버그.  <br/>
    채팅방 입장 -> 같은 방에 입장하면 계속 입장메세지 뜨는 버그(나갈때는 해결)
    채팅방 입장 -> 새로운 사람들어올때는 기존 유저 화면에선 반영안되는 버그  <br/>
    채팅방 변경 -> 다른 방 들어갈 때 기존의 방은 나가기 안되는 버그 <br/>
    
    <br/><br/>
    </div>
  );
}

export default ChatTest;