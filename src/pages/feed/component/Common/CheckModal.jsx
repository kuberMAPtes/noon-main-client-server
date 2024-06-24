import React from 'react';
import { Button, Modal } from 'react-bootstrap';

const CheckModal = ({show, onHide, onConfirm, title, content}) => {

    return (
        <div>
            <Modal show={show} onHide={onHide}>
            <Modal.Header closeButton>
                <Modal.Title>{title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>{content}</Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onHide}>취소</Button>
                <Button variant="primary" onClick={onConfirm}>확인</Button>
            </Modal.Footer>
            </Modal>
        </div>
    );
};

export default CheckModal;