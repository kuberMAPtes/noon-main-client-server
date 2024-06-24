import React from 'react';
import { Button, Modal } from 'react-bootstrap';
import { FaBullhorn, FaVoteYea } from 'react-icons/fa';

const SlideUpModal = (props) => {
    return (
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title>피드 카테고리 선택</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className="d-flex justify-content-around">
                <Button variant="outline-primary">
                    <FaVoteYea size={50} />
                    <div>투표</div>
                </Button>
                <Button variant="outline-primary">
                    <FaBullhorn size={50} />
                    <div>확성기</div>
                </Button>
                </div>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={props.onHide}>
                닫기
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default SlideUpModal;