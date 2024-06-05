import React, { useState, useEffect } from 'react';
import './MyChatroomList.css';
import { getMyChatrooms } from '../../lib/axios_api'
import { useNavigate } from 'react-router-dom';

const MyChatroomList = () => {
    const [chatrooms, setChatrooms] = useState([]);
    const memberId = "12345"; // Replace with the actual member ID

    const navigate = useNavigate();


    useEffect(() => {

        getMyChatrooms(memberId)
            .then(data => {
                setChatrooms(data)
            })
            .catch(error => console.log(error));

    }, [memberId]);

    const enterChatroom = (chatRoomID) => {
        navigate(`/chat/chatroom?chatroomID=${chatRoomID}`);   
    }

    const addChatroom = () => {
        navigate(`/chat/chatroomCreation    `);   
    }

    return (
        <div className="app">
            <div className="header">
                <h1>현준's room</h1>
                <p>1024 members</p>
                <button onClick={()=> addChatroom()}>채팅방 개설하기</button>
            </div>
            <div className="chatroom-list">
                {chatrooms.map(chatroom => (
                    <div key={chatroom.chatroomID} className="chatroom">
                        <div className="chatroom-info">
                            <p className="chatroom-name">{chatroom.chatroomName}</p>
                            <p className="chatroom-status">방장 : {chatroom.chatroomCreatorId} ({chatroom.chatroomMinTemp} 도 이상만)</p>
                        </div>
                        <button onClick={()=> enterChatroom(chatroom.chatroomID)}>입장하기</button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default MyChatroomList;
