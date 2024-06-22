import React, { useState, useEffect } from 'react';
import styles from './MyChatroomList.module.css'; // Import CSS module
import { getMyChatrooms } from '../../lib/axios_api';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { getChatroom } from '../../lib/axios_api';
import { setChatroomData } from '../../store/store';
import { useSelector } from 'react-redux';
import axios from 'axios';

const MyChatroomList = () => {
    const member = useSelector((state) => state.auth.member);
    const authorization = useSelector((state) => state.auth.authorization);
    const memberID = member.memberId;

    const [chatrooms, setChatrooms] = useState([]);
    const dispatch = useDispatch();

    const navigate = useNavigate();

    useEffect(() => {
        getMyChatrooms(memberID)
            .then(chatrooms => {
                fetchUnreadMessageCount(chatrooms, memberID)
                    .then(data => {
                        setChatrooms(data.chatrooms);
                    })
            })
            .catch(error => console.log(error));
    }, [memberID]);

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
        <div className={styles.app}> {/* Use styles from CSS module */}
            <div className={styles.header}>
                <h1> {member.nickName}'s room</h1>
                <p>(userId : {memberID}) </p>
                <p>내 다정온도 : {member.dajungScore}도 </p>
                <button onClick={addChatroom}>채팅방 개설하기</button>
                <button onClick={getChatApplyList}>새 대화신청 보기</button>
            </div>
            <div className={styles['chatroom-list']}> {/* Use styles from CSS module */}
                {chatrooms.map(chatroom => (
                    <div key={chatroom.chatroomID} className={styles.chatroom}> {/* Use styles from CSS module */}
                        <div className={styles['chatroom-info']}> {/* Use styles from CSS module */}
                            <p className={styles['chatroom-name']}>{chatroom.chatroomName}</p> {/* Use styles from CSS module */}
                            <p className={styles['chatroom-status']}>방장 : {chatroom.chatroomCreator.memberId} ({chatroom.chatroomMinTemp} 도 이상만)</p> {/* Use styles from CSS module */}
                            <p>안읽은메세지수 : {chatroom.unreadMessage} </p>
                        </div>
                        <button
                            onClick={() => enterChatroom(chatroom.chatroomID)}
                            className={chatroom.unreadMessage !== 0 ? styles['active-button'] : ''}
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
