import React from 'react';
import { Button, Modal } from 'react-bootstrap';
import { FaBullhorn, FaVoteYea } from 'react-icons/fa';
import { MdFeed } from "react-icons/md";
import { useSelector } from 'react-redux';
import { useNavigate, useSearchParams } from 'react-router-dom';

const SlideUpModal = ({ show, onHide }) => {  
    const navigate = useNavigate();

    const [searchParams] = useSearchParams();

    // 1. memberId
    const memberIdFromStore = useSelector((state) => state.auth.member.memberId);
    const memberIdFromURL = searchParams.get('memberId');
    const writerId = memberIdFromStore || memberIdFromURL;

    // 2. buildingId
    const buildingId = searchParams.get('buildingId');

    const handleLinkClick = (url) => {
        onHide();
        navigate(url);
    }

    const feedFormURL = `/feed/form?memberId=${writerId}&buildingId=${buildingId}`;
    const voteFormURL = `/feed/voteForm?memberId=${writerId}&buildingId=${buildingId}`;
    const megaphoneFormURL = `/feed/megaphoneForm?memberId=${writerId}&buildingId=${buildingId}`;

    console.log("SlideUpModal writerId : ", writerId, "buildingId : ", buildingId);  // 디버깅 로그
    
    return (
        <Modal
            show={show} onHide={onHide}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title>피드 카테고리 선택</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className="d-flex justify-content-around">
                    <Button variant="outline-primary" onClick={() => handleLinkClick(feedFormURL)}>
                        <MdFeed size={50} />
                        <div>일반</div>
                    </Button>
                    <Button variant="outline-primary" onClick={() => handleLinkClick(voteFormURL)}>
                        <FaVoteYea size={50} />
                        <div>투표</div>
                    </Button>
                     {/* 미정 */}
                    <Button variant="outline-primary" onClick={() => handleLinkClick(megaphoneFormURL)}>
                        <FaBullhorn size={50} />
                        <div>확성기</div>
                    </Button>
                </div>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onHide}>
                    닫기
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default SlideUpModal;
