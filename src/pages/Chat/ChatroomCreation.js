import React, { useState } from 'react';
import './ChatRoomCreation.css';
import { useNavigate  } from 'react-router-dom';
import { addChatroom } from '../../lib/axios_api'

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

        addChatroom(chatRoomData)
        .then(data => {
            navigate(`/chat/chatroom?chatroomID=${data.chatroomID}`);           
        })
        .catch( error => console.log(error));

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
        </div>
    );
};

export default ChatRoomCreation;
