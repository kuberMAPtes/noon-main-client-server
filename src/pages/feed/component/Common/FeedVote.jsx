import React, { useState, useEffect } from 'react';
import { Badge, Button, Card } from 'react-bootstrap';
import axios_api from '../../../../lib/axios_api';

/**
 * 피드 미리보기 시 사용하는 컴포넌트
 */
const VotePreview = ({ feedId }) => {
    const [question, setQuestion] = useState('');
    const [options, setOptions] = useState([]);
    const [selectedOption, setSelectedOption] = useState('');

    useEffect(() => {
        // 여기서 feedId를 이용하여 서버에서 투표 데이터를 가져오는 로직을 구현해야 함
        // 예를 들어, axios를 사용하여 비동기로 데이터를 가져오는 예제를 보여드리겠습니다.
        const fetchVoteData = async () => {
            try {
                // axios를 사용하여 특정 feedId에 대한 투표 데이터를 가져온다고 가정
                const response = await axios_api.get(`/api/vote/${feedId}`);
                const { question, options } = response.data;
                setQuestion(question);
                setOptions(options);
            } catch (error) {
                console.error('투표 데이터를 가져오는 중 오류 발생:', error);
                // 에러 처리 로직을 추가할 수 있음
            }
        };

        fetchVoteData();
    }, [feedId]);

    const handleOptionChange = (option) => {
        setSelectedOption(option);
    };

    const handleVoteSubmit = () => {
        if (selectedOption) {
            // 선택한 옵션 처리 로직을 여기에 추가
            console.log('선택한 옵션:', selectedOption);
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
                            style={{
                                minWidth: '120px',
                                width: '100%', // 버튼이 전체 너비를 차지하도록 설정
                                height: '40px',
                                padding: '5px 10px',
                                fontSize: '14px', // 고정된 폰트 사이즈
                            }}
                            className="me-2"
                        >
                            {option}
                        </Button>
                        <Badge bg="secondary">0</Badge>
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
