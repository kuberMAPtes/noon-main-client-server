import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';

export const BootstrapModal = (props) => {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleUserInfo = () => {
        console.log("유저정보를 확인합니다.");
        // 여기에 원하는 동작을 추가할 수 있습니다.
        handleClose();
    };

    const handleBanUser = () => {
        console.log("사용자를 강퇴합니다.");
        // 여기에 원하는 동작을 추가할 수 있습니다.
        handleClose();
    };

    return (
        <>
            <Button variant="primary" onClick={handleShow}>
                모달 열기
            </Button>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>작업 선택</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Button variant="info" onClick={handleUserInfo}>유저정보</Button>{' '}
                    <Button variant="danger" onClick={handleBanUser}>강퇴하기</Button>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        취소
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default BootstrapModal;
