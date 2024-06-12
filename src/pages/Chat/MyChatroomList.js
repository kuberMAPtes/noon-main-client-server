import React, { useState, useEffect } from 'react';
import './MyChatroomList.css';
import { getMyChatrooms } from '../../lib/axios_api'
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { getChatroom } from '../../lib/axios_api';
import { setChatroomData } from '../../store/store';

const MyChatroomList = () => {
    const [chatrooms, setChatrooms] = useState([]);
    const dispatch = useDispatch();

    const loginUser = {
      userId : "24241", // Replace with the actual member ID
      nickName : "현준잉",
      dajungTemp : "36.5",
    }

    const navigate = useNavigate();


    useEffect(() => {

        getMyChatrooms(loginUser.userId)
            .then(data => {
                setChatrooms(data)
            })
            .catch(error => console.log(error));

    }, [loginUser.userId]);

    const enterChatroom = async (chatRoomID) => {

        // 페이지 이동하기 전 채팅방 정보를 redux 에 저장해놓음
        const chatroomData = await getChatroom(chatRoomID);
        dispatch(setChatroomData(chatroomData));

        navigate(`/chat/chatroom?chatroomID=${chatRoomID}`);   
        
    }

    const addChatroom = () => {
        navigate(`/chat/chatroomCreation`);   
    }
    const getChatApplyList = () => {
        navigate(`/chat/chatApplyList`);   
    }

    return (
        <div className="app">
            <div className="header">
                <h1> {loginUser.nickName}'s room</h1>
                <p>(userId : {loginUser.memberId}) </p>
                <p>내 다정온도 : {loginUser.dajungTemp}도 </p>
                <button onClick={()=> addChatroom()}>채팅방 개설하기</button>
                <button onClick={()=> getChatApplyList()}>새 대화신청 보기</button>
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
