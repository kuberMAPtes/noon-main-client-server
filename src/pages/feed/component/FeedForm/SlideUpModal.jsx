import React from 'react';
import { Button, Modal } from 'react-bootstrap';
import { FaBullhorn, FaVoteYea } from 'react-icons/fa';
import { MdFeed } from "react-icons/md";
import { Link } from 'react-router-dom';

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
                    <Link to="/feed/form" onClick={props.onHide}>
                        <Button variant="outline-primary">
                            <MdFeed size={50} />
                            <div>일반</div>
                        </Button>
                    </Link>
                    <Link to="/feed/form/vote" onClick={props.onHide}>
                        <Button variant="outline-primary">
                            <FaVoteYea size={50} />
                            <div>투표</div>
                        </Button>
                    </Link>
                    <Link to="/feed/form" onClick={props.onHide}> {/* 미정 */}
                        <Button variant="outline-primary">
                            <FaBullhorn size={50} />
                            <div>확성기</div>
                        </Button>
                    </Link>
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
