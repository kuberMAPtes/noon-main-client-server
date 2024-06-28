import React, { useState } from 'react';
import styles from './CustomModal.module.css'; // CSS 모듈을 import
import { kickChatroom } from './axios_api'
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { useNavigate  } from 'react-router-dom';
import useMainPage from '../../member/component/common/useMainPage';
// import { useMainPage }  from '../../member/component/common'

export const CustomModal = ({kickRoom, showModal, setShowModal, setParticipants, roomInfoUpdate, currentChatroomID, loginMemberRole, targetMember}) => {
    // console.log("유저정보를 확인합니다 => 요새끼 ", targetMember);
    // console.log("CustomModal 받은 데이터 => ", "채팅방", currentChatroomID, "내권한",loginMemberRole, "조회or내보낼놈",targetMember);
    
    const navigate = useNavigate(); // useNavigate 훅 사용
    const memberProfileUrl = useMainPage(targetMember? targetMember.memberId : null)

    // 유저 정보로 이동
    const handleUserInfo = () => {
        console.log("유저정보를 확인합니다 => 요새끼 ", targetMember.memberId);

        navigate(memberProfileUrl);
        setShowModal(false);
    };

    // 유저 강퇴하기
    const handleBanUser = () => {

        kickChatroom(currentChatroomID, targetMember.chatroomMemberId)
        .then(chatroomData => {
            console.log("사용자를 강퇴했습니다. 업데이트된 채팅방 정보 => ", chatroomData);
            kickRoom(currentChatroomID,targetMember.chatroomMemberId)
            roomInfoUpdate(chatroomData.chatroom)
            setParticipants(chatroomData.activeChatEntrances)
            alert(`${targetMember.chatroomMemberId} 손절!`)
        })
        .catch(error => console.log(error));
    
        setShowModal(false);
    };

    // 모달 배경 클릭 시 모달 닫기
    const handleBackgroundClick = (e) => {
        if (e.target === e.currentTarget) {
            setShowModal(false);
        }
    };

    return (
        // button 을 span 으로 바꾸고 props 로 내려주면될듯
        <>
            {showModal &&
                <div className={styles.customModal} onClick={handleBackgroundClick}>
                    <div className={styles.modalContent}>
                        <h2 className={styles.modalContentTitle}>작업 선택</h2>
                        <button className={styles.modalContentButton} onClick={handleUserInfo} >유저정보</button>
                        {loginMemberRole === 'OWNER' && <button className={styles.modalContentButton} onClick={handleBanUser}>강퇴하기</button> }
                        <button className={styles.modalContentButton} onClick={() => setShowModal(false)}>취소</button>
                    </div>
                </div>
            }
        </>
    );
}

export default CustomModal;