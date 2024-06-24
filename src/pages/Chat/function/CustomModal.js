import React, { useState } from 'react';
import styles from './CustomModal.module.css'; // CSS 모듈을 import
import { kickChatroom } from './axios_api'
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { useNavigate  } from 'react-router-dom';
// import { useMainPage }  from '../../member/component/common'

export const CustomModal = ({setRoomInfo, currentChatroomID, targetMemberID}) => {

    console.log("CustomModal 받은 데이터 => ", setRoomInfo, currentChatroomID, targetMemberID);

    const [showModal, setShowModal] = useState(false);
    const member = useSelector((state) => state.auth.member);
    // const mainPageUrl = useMainPage(targetMemberID);

    // 유저 정보로 이동
    const handleUserInfo = () => {
        console.log("유저정보를 확인합니다.");

        // <Link to=targetMemberID.....></Link>      

        setShowModal(false);
    };

    // 유저 강퇴하기
    const handleBanUser = (targetMemberID) => {
        console.log("사용자를 강퇴합니다.");

        kickChatroom(currentChatroomID, targetMemberID)
        .then(chatroomData => {
            setRoomInfo(chatroomData)
        })
        .catch(error => console.log(error));
    
        setShowModal(false);
    };

    return (
        // button 을 span 으로 바꾸고 props 로 내려주면될듯
        <>
            <button onClick={() => setShowModal(true)}>모달 열기</button>

            {showModal &&
                <div className={styles.customModal}>
                    <div className={styles.modalContent}>
                        <h2 className={styles.modalContentTitle}>작업 선택</h2>
                        <button className={styles.modalContentButton} onClick={handleUserInfo}>유저정보</button>
                        <button className={styles.modalContentButton} onClick={handleBanUser}>강퇴하기</button>
                        <button className={styles.modalContentButton} onClick={() => setShowModal(false)}>취소</button>
                    </div>
                </div>
            }
        </>
    );
}

export default CustomModal;