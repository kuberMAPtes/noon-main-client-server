import React, { useState, useEffect } from 'react';
import { Badge, Button, Card } from 'react-bootstrap';
import axios_api from '../../../../lib/axios_api';
import styles from '../../css/FeedForm/FeedVote.module.css';

/**
 * 실제 피드에서 사용하는 투표
 */
const FeedVote = ({ feedId, memberId }) => {
    const [question, setQuestion] = useState('');
    const [options, setOptions] = useState([]);
    const [votes, setVotes] = useState([]);
    const [selectedOption, setSelectedOption] = useState('');

    // 투표에 대한 데이터 갱신
    useEffect(() => {
        const fetchVoteData = async () => {
            try {
                const response = await axios_api.get(`/feed/getVote/${feedId}`);
                const { question, options, votes, voterIds } = response.data;
                setQuestion(question);
                setOptions(options);
                if(options) {
                    setVotes(votes && votes.length === options.length ? votes : new Array(options.length).fill(0));
                } 
                // console.log("Fetched options: ", options);
                // console.log("Fetched votes: ", votes);

                // 선택한 투표 내용 그대로 고정함
                if(voterIds && voterIds[memberId] !== undefined) {
                    const selectedOptionIndex = voterIds[memberId];
                    setSelectedOption(options[selectedOptionIndex]);
                }

            } catch (error) {
                console.error('투표 데이터를 가져오는 중 오류 발생:', error);
            }
        };

        fetchVoteData();
    }, [feedId]);

    const handleOptionChange = (option) => {
        setSelectedOption(option);
    };

    const handleVoteSubmit = async () => {
        if (selectedOption !== '') {
            try {
                const chosenOptionIndex = options.indexOf(selectedOption);
                const response = await axios_api.post('/feed/addVoting', {
                    feedId,
                    memberId,
                    options,
                    chosenOption: chosenOptionIndex
                });
                
                const { votes } = response.data;
                setVotes(votes);
                // console.log("Updated votes: ", votes);

            } catch (error) {
                console.error('투표를 제출하는 중 오류 발생:', error);
            }
        } else {
            alert('옵션을 선택해 주세요.');
        }
    };

    return (
        <div>
        <br/>
        <Card className={`mb-4 ${styles.voteCard}`}>
            <Card.Header className={styles.voteHeader}>{question}</Card.Header>
            <Card.Body>
                {options && options.map((option, index) => (
                    <div key={index} className={styles.voteOption}>
                        <Button
                            className={`${styles.voteButton} ${selectedOption === option ? styles.voteButtonSelected : ''}`}
                            onClick={() => handleOptionChange(option)}
                        >
                            {option}
                        </Button> &nbsp;&nbsp;
                        <Badge bg="secondary">{votes[index] !== undefined ? votes[index] : 0}</Badge>
                    </div>
                ))}
                <Button variant="danger" className={styles.voteSubmitButton} onClick={handleVoteSubmit}>
                    투표
                </Button>
            </Card.Body>
        </Card>
        </div>
    );
};

export default FeedVote;
