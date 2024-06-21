import React, { useState, useEffect } from 'react';
import './MyChatroomList.css';
import { getMyChatrooms } from '../../lib/axios_api'
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { getChatroom } from '../../lib/axios_api';
import { setChatroomData } from '../../store/store';
import { useSelector } from 'react-redux';
import axios from 'axios';

const MyChatroomList = () => {
    const member = useSelector((state) => state.auth.member);
    const authorization = useSelector((state) => state.auth.authorization);
    const memberID = member.memberId

    const [chatrooms, setChatrooms] = useState([]);
    const dispatch = useDispatch();

    const navigate = useNavigate();

    // 멤버ID가 바뀌면 스프링 서버에서 채팅방 목록에 필요한 채팅방 배열 받아옴 
    useEffect(() => {

        getMyChatrooms(memberID)
            .then(chatrooms => {
                fetchUnreadMessageCount(chatrooms, memberID)
                .then(data => {
                    setChatrooms(data.chatrooms)
                    console.log("chatroom최종 ",data.chatrooms)
                    console.log("활발한 새키",data)
                    }
                )
            })
            .catch(error => console.log(error));

    }, [memberID]);

    // 채팅방 목록을 받아올 때 노드서버에 들러 안읽은 메세지도 추가해옴
    async function fetchUnreadMessageCount(chatrooms, memberID) {
        const url = `${process.env.REACT_APP_NODE_SERVER_URL}/node/messageUnread`; // 서버의 URL에 맞게 수정

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
                <h1> {member.nickName}'s room</h1>
                <p>(userId : {memberID}) </p>
                <p>내 다정온도 : {member.dajungScore}도 </p>
                <button onClick={()=> addChatroom()}>채팅방 개설하기</button>
                <button onClick={()=> getChatApplyList()}>새 대화신청 보기</button>
            </div>
            <div className="chatroom-list">
                {chatrooms.map(chatroom => (
                    <div key={chatroom.chatroomID} className="chatroom">
                        <div className="chatroom-info">
                            <p className="chatroom-name">{chatroom.chatroomName}</p>
                            <p className="chatroom-status">방장 : {chatroom.chatroomCreator.memberId} ({chatroom.chatroomMinTemp} 도 이상만)</p>
                            <p>안읽은메세지수 : {chatroom.unreadMessage} </p>
                        </div>
                        <button 
                            onClick={() => enterChatroom(chatroom.chatroomID)}
                            className={chatroom.unreadMessage !== 0 ? 'active-button' : ''}
                        >
                            입장하기
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default MyChatroomList;
