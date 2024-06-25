import React, { useState } from 'react';
import { Badge, Button, Card, Form } from 'react-bootstrap';

const VotePreview = ({ question, options, onSelectVote }) => {
    const [selectedOption, setSelectedOption] = useState('');

    const handleOptionChange = (option) => {
        setSelectedOption(option);
    };

    const handleVoteSubmit = () => {
        if (selectedOption) {
            onSelectVote(selectedOption);
        } else {
            alert('옵션을 선택해 주세요.');
        }
    };

    return (
        <Card className="mb-4">
            <Card.Header>{question}</Card.Header>
            <Card.Body>
            {options.map((option, index) => (
                    <div key={index} className="d-flex align-items-center mb-2">
                        <Button
                            variant={selectedOption === option ? 'primary' : 'outline-primary'}
                            onClick={() => handleOptionChange(option)}
                            style={{ minWidth: '120px', width: '120px', height: '40px', padding: '5px 10px' }}
                            className="me-2"
                        >
                            {option}
                        </Button>
                        <Badge bg="secondary">{/* 투표 수를 여기에 표시 */}</Badge>
                    </div>
                ))}
                <Button variant="primary" onClick={handleVoteSubmit} className="mt-3">
                    투표
                </Button>
            </Card.Body>
        </Card>
    );
};

export default VotePreview;