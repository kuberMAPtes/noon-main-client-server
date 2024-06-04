import React, { useState } from 'react';
import './ChatRoomCreation.css';
import axios from 'axios';
import { useNavigate  } from 'react-router-dom';

import { Link } from 'react-router-dom';

const ChatRoomCreation = () => {
    const [dajungMinTemp, setDajungMinTemp] = useState('');
    const [dajungMaxTemp, setDajungMaxTemp] = useState('');
    const [chatroomName, setChatRoomName] = useState('');

    const loggedInUserTestInfo = {
        userId: '12345',
        token: 'your-token-here'
    };

    const navigate = useNavigate();

    const handleSubmit = async(e) => {
        e.preventDefault();
        // Handle form submission, e.g., send data to backend

        const chatRoomData = {
            chatroomMinTemp: parseFloat(dajungMinTemp),
            chatroomMaxTemp: parseFloat(dajungMaxTemp),
            chatroomName : chatroomName,
            chatroomCreatorId: loggedInUserTestInfo.userId,
            chatroomType: 'GROUP_CHATTING'
        };

        console.log(chatRoomData);

        axios.post('http://localhost:8080/chatroom/addChatroom', chatRoomData, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(response => {
            console.log('Chat room created:', response.data);
            navigate(`/chatroom?chatroomID=${response.data.chatroomID}`);
        })
        .catch(error => {
            console.error('There was an error fetching the chat rooms!', error);
        })

    };

    return (
        <div className="chat-room-creation">
            <form onSubmit={handleSubmit}>
                <input 
                    type="number" 
                    placeholder="다정 온도 범위 (Min)" 
                    value={dajungMinTemp}
                    onChange={(e) => setDajungMinTemp(e.target.value)}
                />
                <input 
                    type="number" 
                    placeholder="다정 온도 범위 (Max)" 
                    value={dajungMaxTemp}
                    onChange={(e) => setDajungMaxTemp(e.target.value)}
                />
                <p>친구를 모아보세요!</p>
                <input 
                    type="text" 
                    placeholder="채팅방 이름을 입력하세요" 
                    value={chatroomName}
                    onChange={(e) => setChatRoomName(e.target.value)}
                />
                <button type="submit">채팅방 개설하기</button>
            </form>

            <Link to='/myChatroomList'>내 채팅방 목록</Link>
        </div>
    );
};

export default ChatRoomCreation;
