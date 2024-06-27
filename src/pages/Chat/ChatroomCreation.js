import React, { useState } from 'react';
import './ChatRoomCreation.css';
import { useNavigate, useParams } from 'react-router-dom';
import { addChatroom } from '../Chat/function/axios_api';
import { addChatroomData } from '../../store/store';
import { useDispatch , useSelector } from 'react-redux';

const ChatRoomCreation = () => {
    const [dajungMinTemp, setDajungMinTemp] = useState('');
    const [dajungMaxTemp, setDajungMaxTemp] = useState('');
    const [chatroomName, setChatRoomName] = useState('');
    const dispatch = useDispatch();

    const member = useSelector((state) => state.auth.member);
    const authorization = useSelector((state) => state.auth.authorization);
    const memberID = member.memberId

    const { buildingId } = useParams(); // 받아온 경로매개변수


    const navigate = useNavigate();

    const handleSubmit = async(e) => {
        e.preventDefault();
        // Handle form submission, e.g., send data to backend

        const chatRoomData = {
            chatroomMinTemp: parseFloat(dajungMinTemp),
            chatroomMaxTemp: parseFloat(dajungMaxTemp),
            chatroomName : chatroomName,
            chatroomCreatorId: memberID,
            chatroomType: 'GROUP_CHATTING',
            buildingId: buildingId ? buildingId : null
        };

        console.log(chatRoomData);

        addChatroom(chatRoomData)
        .then(data => {
            // 페이지 이동하기 전 채팅방 정보를 redux 에 저장해놓음
            dispatch(addChatroomData(data));
            console.log("[Redux] ChatroomCreation.js 디스패치할거 => ", data);
            navigate(`/chat/chatroom?chatroomID=${data.ChatroomInfo.chatroomID}`);           
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
