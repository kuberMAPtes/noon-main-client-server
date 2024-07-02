import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import { FaBullhorn, FaVoteYea } from 'react-icons/fa';
import { MdFeed } from "react-icons/md";
import { useSelector } from 'react-redux';
import { useNavigate, useSearchParams } from 'react-router-dom';
import styles from '../../css/FeedForm/FloatingButton.module.css';

const FloatingButtons = () => {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();

    // 1. memberId
    const memberIdFromStore = useSelector((state) => state.auth.member.memberId);
    const memberIdFromURL = searchParams.get('memberId');
    const writerId = memberIdFromStore || memberIdFromURL;

    // 2. buildingId
    const buildingId = searchParams.get('buildingId');

    const feedFormURL = `/feed/form?memberId=${writerId}&buildingId=${buildingId}`;
    const voteFormURL = `/feed/voteForm?memberId=${writerId}&buildingId=${buildingId}`;
    const megaphoneFormURL = `/feed/megaphoneForm?memberId=${writerId}&buildingId=${buildingId}`;

    const [showAdditionalButtons, setShowAdditionalButtons] = useState(false);

    const handleMainButtonClick = () => {
        setShowAdditionalButtons(!showAdditionalButtons);
    };

    const handleLinkClick = (url) => {
        navigate(url);
    }
    
    return (
        <div className={styles.floatingButtonsContainer}>
            {showAdditionalButtons && (
                <div className={`${styles.additionalButtons} ${showAdditionalButtons ? styles.showButtons : ''}`}>
                    <Button className={styles.additionalButton} onClick={() => handleLinkClick(feedFormURL)}>
                        <MdFeed size={30} />
                        <div className={styles.additionalButtonText}>일반</div>
                    </Button>
                    <Button className={styles.additionalButton} onClick={() => handleLinkClick(voteFormURL)}>
                        <FaVoteYea size={30} />
                        <div className={styles.additionalButtonText}>투표</div>
                    </Button>
                    <Button className={styles.additionalButton} onClick={() => handleLinkClick(megaphoneFormURL)}>
                        <FaBullhorn size={30} />
                        <div className={styles.additionalButtonText}>확성기</div>
                    </Button>
                </div>
            )}
            <div className={styles.mainButton} onClick={handleMainButtonClick}>
                {showAdditionalButtons ? '-' : '+'}
            </div>
        </div>
    );
};

export default FloatingButtons;
