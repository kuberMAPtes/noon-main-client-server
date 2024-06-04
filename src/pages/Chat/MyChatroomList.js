import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './MyChatroomList.css';

const MyChatroomList = () => {
    const [chatrooms, setChatrooms] = useState([]);
    const memberId = "your-member-id"; // Replace with the actual member ID

    useEffect(() => {
        const fetchChatrooms = async () => {
            try {
                const response = await axios.get('http://localhost:8080/chatroom/getMyChatrooms?userId=12345');
                console.log(response.data);

                setChatrooms(response.data);
            } catch (error) {
                console.error("Error fetching chat rooms", error);
            }
        };

        fetchChatrooms();
    }, [memberId]);

    return (
        <div className="app">
            <div className="header">
                <h1>현준's room</h1>
                <p>1024 members</p>
            </div>
            <div className="chatroom-list">
                {chatrooms.map(chatroom => (
                    <div key={chatroom.chatroomId} className="chatroom">
                        <div className="chatroom-info">
                            <p className="chatroom-name">{chatroom.chatroomName}</p>
                            <p className="chatroom-status">방장 : {chatroom.chatroomCreatorId} ({chatroom.chatroomMinTemp} 도 이상만)</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default MyChatroomList;
