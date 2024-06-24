import React, { useState } from 'react';
import { Button, Card, Container, Form, ListGroup } from 'react-bootstrap';

const FeedVotePage = () => {
    const [question, setQuestion] = useState('');
    const [options, setOptions] = useState(['','']);
    const [votes, setVotes] = useState([]);
    const [voted, setVoted] = useState(false);

    const handleQuestionChange = (e) => {
        setQuestion(e.target.value);
    };

    const handleOptionChange = (index, e) => {
        const newOptions = [...options];
        newOptions[index] = e.target.value;
        setOptions(newOptions);
    };

    const handleAddOption = () => {
        setOptions([...options, '']);
    };
    
    const handleVote = (index) => {
        const newVotes = [...votes];
        newVotes[index] = (newVotes[index] || 0) + 1;
        setVotes(newVotes);
        setVoted(true);
    };
    
    const handleCreatePoll = () => {
        setVotes(Array(options.length).fill(0));
    };

    return (
        <Container>
            <h1 className="my-4">투표 게시판</h1>
            {!voted && (
            <Card className="mb-4">
                <Card.Body>
                <Form>
                    <Form.Group className="mb-3">
                    <Form.Label>질문</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="질문을 입력하세요"
                        value={question}
                        onChange={handleQuestionChange}
                    />
                    </Form.Group>
                    {options.map((option, index) => (
                    <Form.Group className="mb-3" key={index}>
                        <Form.Label>선택지 {index + 1}</Form.Label>
                        <Form.Control
                        type="text"
                        placeholder={`선택지 ${index + 1}을 입력하세요`}
                        value={option}
                        onChange={(e) => handleOptionChange(index, e)}
                        />
                    </Form.Group>
                    ))}
                    <Button variant="outline-primary" onClick={handleAddOption}>
                    선택지 추가
                    </Button>
                    <Button variant="primary" className="ms-2" onClick={handleCreatePoll}>
                    투표 생성
                    </Button>
                </Form>
                </Card.Body>
            </Card>
            )}
            {votes.length > 0 && (
            <Card>
                <Card.Header>{question}</Card.Header>
                <ListGroup variant="flush">
                {options.map((option, index) => (
                    <ListGroup.Item key={index} className="d-flex justify-content-between align-items-center">
                    {option}
                    <Button
                        variant="outline-success"
                        onClick={() => handleVote(index)}
                        disabled={voted}
                    >
                        투표
                    </Button>
                    <span>{votes[index] || 0} 표</span>
                    </ListGroup.Item>
                ))}
                </ListGroup>
            </Card>
            )}
      </Container>
    );
};

export default FeedVotePage;