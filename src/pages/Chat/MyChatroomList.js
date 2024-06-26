import React, { useState, useEffect } from 'react';
import module from './MyChatroomList.module.css'; // Import CSS module
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { getChatroom , getMyChatrooms } from '../Chat/function/axios_api'
import { setChatroomData } from '../../store/store';
import { useSelector } from 'react-redux';
import axios from 'axios';
import Countdown from '../../lib/Countdown'

const MyChatroomList = () => {
    const member = useSelector((state) => state.auth.member);
    const authorization = useSelector((state) => state.auth.authorization);
    const memberID = member.memberId;

    const [chatrooms, setChatrooms] = useState([]);
    const [activeChatrooms, setActiveChatrooms] = useState([]);
    const dispatch = useDispatch();

    const navigate = useNavigate();

    useEffect(() => {
        getMyChatrooms(memberID)
            .then(chatrooms => {
                fetchUnreadMessageCount(chatrooms, memberID)
                    .then(data => {
                        console.log("node 서버", process.env.REACT_APP_NODE_SERVER_URL, "에서 읽은메세지 요청중");
                        setChatrooms(data.chatrooms); // 채팅방 별 안읽은 메세지 저장
                        setActiveChatrooms(data.activeChatrooms); // 활발한 채팅방 저장
                    })
            })
            .catch(error => console.log(error));
    }, [memberID]);

    // 안읽은 메세지 가져오기
    async function fetchUnreadMessageCount(chatrooms, memberID) {
        const url = `${process.env.REACT_APP_NODE_SERVER_URL}/node/messageUnread`;

        try {
            const response = await axios.post(url, {
                chatrooms: chatrooms,
                memberID: memberID
            });

            return response.data;

        } catch (error) {
            console.error('Error fetching unread messages count:', error);
            return null;
        }
    }

    const enterChatroom = async (chatRoomID) => {
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
        <div className={module.app}>
            <div className={module.header}>
                <h1> {member.nickName}'s room</h1>
                <p>(userId : {memberID}) </p>
                <p>내 다정온도 : {member.dajungScore}도 </p>
                <button onClick={addChatroom} className={module.normalButton}>채팅방 개설하기</button>
                <button onClick={getChatApplyList} className={module.normalButton}>새 대화신청 보기</button>
            </div>
            <div className={module.chatroomList}>
                {chatrooms.map(chatroom => (
                    <div key={chatroom.chatroomID} className={module.chatroom}>
                        <div className={module.chatroomInfo}>
                            <p className={module.chatroomName}>{chatroom.chatroomName}</p>
                            <p className={module.chatroomStatus}>방장 : {chatroom.chatroomCreator.memberId} ({chatroom.chatroomMinTemp} 도 이상만)</p>
                            <p>안읽은메세지수 : {chatroom.unreadMessage} </p>
                        </div>
                        <button
                            onClick={() => enterChatroom(chatroom.chatroomID)}
                            className={chatroom.unreadMessage !== 0 ? module.activeButton : module.normalButton}
                        >
                            입장하기
                        </button>
                    </div>
                ))}
            </div>
            <Countdown/>
        </div>
    );
};

export default MyChatroomList;
