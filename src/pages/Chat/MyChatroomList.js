import React, { useState, useEffect } from 'react';
    import module from './MyChatroomList.module.css'; // Import CSS module
import { useNavigate, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { getChatroom , getMyChatrooms } from '../Chat/function/axios_api'
import { setChatroomData } from '../../store/store';
import { useSelector } from 'react-redux';
import axios from 'axios';
import Countdown from './function/Countdown'

const MyChatroomList = () => {
    const member = useSelector((state) => state.auth.member);
    const authorization = useSelector((state) => state.auth.authorization);
    const memberID = member.memberId;

    const [chatrooms, setChatrooms] = useState([]);
    const dispatch = useDispatch();
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        getMyChatrooms(memberID)
            .then(chatrooms => {
                fetchUnreadMessageCountAndActiveRooms(chatrooms, memberID)
                    .then(response => {
                        console.log("node 서버", response);

                        // chatrooms 배열의 각 원소에 대해 activeRooms 배열에서 일치하는 chatroomID를 찾고 famous 속성을 추가함
                        const updatedChatrooms = response.chatrooms.map(room => {
                            // activeRooms 배열에서 현재 room의 chatroomID와 일치하는 객체를 찾음
                            const foundActiveRoom = response.activeRooms.find(activeRoom => activeRoom.chatroomID === String(room.chatroomID));
                        
                            if (foundActiveRoom) {
                            // activeRooms 배열에 일치하는 chatroomID가 있으면 famous 값을 1로 설정한 객체를 반환
                            return {...room, famous: 1};
                            } else {
                            // 일치하는 chatroomID가 없으면 그대로 반환
                            return room;
                            }
                        });
                        console.log(updatedChatrooms);
                        setChatrooms(updatedChatrooms); // 채팅방 별 안읽은 메세지 저장
                    })
            })
            .catch(error => console.log(error));
    }, [memberID, location.pathname]); // 채팅방에서 나갈경우 path의 변경을 감지해 리로드

    // 안읽은 메세지 가져오기
    async function fetchUnreadMessageCountAndActiveRooms(chatrooms, memberID) {
        const url = `${process.env.REACT_APP_NODE_SERVER_URL}/node/messageUnreadAndActiverooms`;

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

    // 활발한 채팅방 가져오기
    async function fetchActiveRooms(chatrooms, memberID) {
        const url = `${process.env.REACT_APP_NODE_SERVER_URL}/node/activeRooms`;

        try {
            const response = await axios.get(url);

            console.log("활발한넘",response.data);
            return response.data;

        } catch (error) {
            console.error('Error fetching activerRooms count:', error);
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
            <Countdown/>
            <div className={module.header}>
                <h1> {member.nickname}'s room</h1>
                <img className ={module.profileImage} src={member.profilePhotoUrl ? member.profilePhotoUrl : `${process.env.PUBLIC_URL}/image/defaultMemberProfilePhoto.png`} alt="blank"></img>
                <p>내 다정온도 : {member.dajungScore}도 </p>
                <button onClick={getChatApplyList} className={module.normalButton}>새 대화신청 보기</button>
            </div>
            <div className={module.chatroomList}>
                {chatrooms.map(chatroom => (
                    <div key={chatroom.chatroomID} className={`${module.chatroom} ${chatroom.famous === 1 ? module.hotChatroom : ''}`}>
                        <div className={module.chatroomInfo}>
                            <p className={module.chatroomName}>{chatroom.chatroomName} ({chatroom.chatroomEntrancesSize}) {chatroom.famous === 1 && <span className={module.hotLabel}>Hot</span>}</p>
                            {chatroom.chatroomType === "GROUP_CHATTING" && (<p className={module.chatroomStatus}>방장 : {chatroom.chatroomCreator.nickname} ({chatroom.chatroomMinTemp} 도 이상만)</p>)}
                        </div>
                        {/* {chatroom.chatroomType === 'PRIVATE_CHATTING' && (
                            <img className ={module.profileImage} src={chatroom.chatroomCreator.profilePhotoUrl ? chatroom.chatroomCreator.profilePhotoUrl : `${process.env.PUBLIC_URL}/image/defaultMemberProfilePhoto.png`} alt="Profile" />
                        )} */}
                        <button
                            onClick={() => enterChatroom(chatroom.chatroomID)}
                            className={chatroom.unreadMessage !== 0 ? module.activeButton : module.normalButton}
                        >
                        {chatroom.unreadMessage !== 0 && (
                            <span className={module.unreadBadge}>{chatroom.unreadMessage}</span>
                        )}
                            입장하기
                        </button>

                    </div>
                ))}
            </div>
        </div>
    );
};

export default MyChatroomList;
