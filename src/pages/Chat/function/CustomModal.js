import React, { useState } from 'react';
import styles from './CustomModal.module.css'; // CSS 모듈을 import

export const CustomModal = () => {
    const [showModal, setShowModal] = useState(false);

    const handleUserInfo = () => {
        console.log("유저정보를 확인합니다.");
        // 여기에 원하는 동작을 추가할 수 있습니다.
        setShowModal(false);
    };

    const handleBanUser = () => {
        console.log("사용자를 강퇴합니다.");
        // 여기에 원하는 동작을 추가할 수 있습니다.
        setShowModal(false);
    };

    return (
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