import React, { useState } from 'react';
import { Badge, Button, Card } from 'react-bootstrap';
import styles from '../../css/FeedForm/FeedVote.module.css';

/**
 * 피드 미리보기 시 사용하는 컴포넌트
 */
const VotePreview = ({ question, options, onSelectVote }) => {
    const [selectedOption, setSelectedOption] = useState('');

    const handleOptionChange = (option) => {
        setSelectedOption(option);
    };

    const handleVoteSubmit = () => {
        if (selectedOption) {
            onSelectVote(selectedOption);
        } else {
            alert('옵션을 선택해 주세요.'); // 알림
        }
    };

    return (
        <Card className="mb-4">
            <Card.Header>{question}</Card.Header>
            <Card.Body>
            {options.map((option, index) => (
                    <div key={index} className="d-flex align-items-center mb-2">
                        <Button
                            className={`${styles.voteButton} ${selectedOption === option ? styles.voteButtonSelected : ''}`}
                            onClick={() => handleOptionChange(option)}
                            style={{
                                minWidth: '120px',
                                width: '100%', // 버튼이 전체 너비를 차지하도록 설정
                                height: '40px',
                                padding: '5px 10px',
                                fontSize: '14px', // 고정된 폰트 사이즈
                            }}
                        >
                        {option}
                        </Button> &nbsp;&nbsp;
                        <Badge bg="secondary">0</Badge>
                    </div>
                ))}
                <Button variant="danger" onClick={handleVoteSubmit} className="mt-3">
                    투표
                </Button>
            </Card.Body>
        </Card>
    );
};

export default VotePreview;