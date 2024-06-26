import React, { useState, useEffect } from 'react';
import { Button, Form, Card, Container, Badge } from 'react-bootstrap';
import axios_api from '../../../../lib/axios_api';
import CheckModal from '../Common/CheckModal';
import navigator from '../../util/Navigator'
import VotePreview from './VotePreview';
import { Label } from 'reactstrap';
// import renderFeedTextWithLink from '../../util/renderFeedTextWithLink';

const FeedVoteForm = ({ existingFeed, inputWriterId, inputBuildingId, inputFeedId, onSave }) => {
    const [previewVoteShow, setPreviewVoteShow] = useState(false);
    const [feedData, setFeedData] = useState({
        title: '',
        feedText: '',
        updateTagList: [],
        category: 'MEGAPHONE',
        publicRange: 'PUBLIC',
        viewCnt: 0,
        writtenTime: '',
        modified: false,
    });

    const [newVote, setNewVote] = useState({ 
        question: '', 
        options: [''] 
    });

    // 태그 추가 
    const [tagInput, setTagInput] = useState('');

    // Feed Add, Update Modal 관련
    const [feedAddShow, setFeedAddShow] = useState(false);
    const [feedUpdateShow, setFeedUpdateShow] = useState(false);

    // navigator
    const { goToFeedDetail } = navigator();
    
    // @(memberId)를 통해 리다이렉션하기
    // const renderFeedText = (feedText) => renderFeedTextWithLink(feedText);

    /* 투표 관련 */
    useEffect(() => {
        fetchVotes();
    }, []);

    // 투표 미리보기 
    const handlePreviewVote = () => {
        setPreviewVoteShow(true);
    };
    
    const fetchVotes = async () => {
        try {
            // const response = await axios_api.get('/feed/getVote' + inputFeedId);
        } catch (error) {
            console.error('투표 목록을 가져오는 중 오류 발생:', error);
        }
    };

    const handleOptionChange = (index, value) => {
        const updatedOptions = [...newVote.options];
        updatedOptions[index] = value;
        setNewVote({ ...newVote, options: updatedOptions });
    };

    const addOption = () => {
        setNewVote({ ...newVote, options: [...newVote.options, ''] });
    };


    /* 피드 관련 */
    // 변경 사항 반영
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFeedData({
            ...feedData,
            [name]: value,
        });
    };

    // 피드 추가
    const handleAddSubmit = async () => {
        try {
            const addFeedData = {
                writerId: inputWriterId,
                buildingId: inputBuildingId,
                mainActivate: false,
                viewCnt: 0,
                writtenTime: new Date(),
                modified: false,
                title: feedData.title,
                feedText: feedData.feedText,
                updateTagList: feedData.updateTagList,
                feedCategory: feedData.category,
                publicRange: feedData.publicRange
            };

            console.log(addFeedData);

            const feedResponse = await axios_api.post('/feed/addFeed', addFeedData);
            const feedId = feedResponse.data;

            console.log("feedId : " + feedId);

            const addVoteData = {
                feedId: feedId,
                question: newVote.question,
                options: newVote.options
            }

            const voteResponse = await axios_api.post('/feed/addVote', addVoteData);
            const voteData = voteResponse.data;

            console.log("voteData : " + voteData);

            console.log('피드가 성공적으로 저장되었습니다:', feedResponse.data);

            goToFeedDetail(inputWriterId, feedId);

        } catch (error) {
            console.error('피드 저장 중 오류 발생:', error);
        }
    }

    // 피드 수정
    const handleUpdateSubmit = async () => {
        try {
            const updateFeedData = {
                feedId: inputFeedId,
                writerId: inputWriterId,
                mainActivate: feedData.mainActivate,
                viewCnt: feedData.viewCnt,
                writtenTime: feedData.writtenTime,
                modified: true,
                title: feedData.title,
                feedText: feedData.feedText,
                updateTagList: feedData.updateTagList,
                feedCategory: 'POLL',
                publicRange: feedData.publicRange,
            };

            console.log(updateFeedData);

            const feedResponse = await axios_api.post(`/feed/updateFeed`, updateFeedData);

            const feedId = feedResponse.data;
            
            console.log('피드가 성공적으로 저장되었습니다:', feedResponse.data);

            goToFeedDetail(inputWriterId, feedId);
        } catch (error) {
            console.error('피드 수정 중 오류 발생:', error);
        }
    }

    // 피드 추가 및 수정 제출하기
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            if (inputFeedId) {
                setFeedUpdateShow(true);
            } else {
                setFeedAddShow(true);
            }
        } catch (error) {
            console.error("HandleSubmit Error 발생 : " + error);
        }
    }
    
    // 모달 창 띄우기
    const handleModalConfirm = async () => {
        try {
            if (inputFeedId) {
                await handleUpdateSubmit();
            } else {
                await handleAddSubmit();
            }

            onSave && onSave();
            setFeedAddShow(false);
            setFeedUpdateShow(false);
        } catch (error) {
            console.error("HandleModalConfirm Error 발생 : " + error);
        }
    }

    // 태그 추가 및 삭제
    const handleTagAdd = () => {
        if (tagInput.trim() !== '') {
            setFeedData(prevState => ({
                ...prevState,
                updateTagList: [...prevState.updateTagList, tagInput.trim()]
            }));
            setTagInput('');
        }
    };

    const handleTagRemove = (tagText) => {
        const updatedTags = feedData.updateTagList.filter(t => t !== tagText);
        setFeedData({ ...feedData, updateTagList: updatedTags });
    };

    // 취소
    const handleCancel = () => {
        setFeedData({
            title: '',
            feedText: '',
            tags: [],
            publicRange: 'PUBLIC',
        });
    };

    return (
        <Container className="feed=form">
            <Card>
                <Card.Body>
                    <Form onSubmit={handleSubmit}>
                        <Label>확성기로 하고 싶은 말을 작성하세요!</Label>
                        {/* 내용 */}
                        <Form.Group controlId="feedText" className="mb-3">
                            <Form.Label>내용</Form.Label>
                            <Form.Control
                                as="textarea"
                                name="feedText"
                                rows={3}
                                placeholder="내용을 입력하세요"
                                value={feedData.feedText}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>
                        <Button variant="primary" type="submit" className="mr-2">
                            저장
                        </Button>
                        &nbsp;&nbsp;
                        <Button variant="secondary" onClick={handleCancel}>
                            취소
                        </Button>
                    </Form>
                </Card.Body>
            </Card>

            {/* Modal : addFeed*/}
            <CheckModal 
                show={feedAddShow}
                onHide={()=>setFeedAddShow(false)}
                onConfirm={handleModalConfirm}
                title="피드 추가"
                content="새로운 일상을 공유할까요?"
            />

            {/* Modal : updateFeed*/}
            <CheckModal 
                show={feedUpdateShow}
                onHide={()=>setFeedUpdateShow(false)}
                onConfirm={handleModalConfirm}
                title="피드 수정"
                content="변화된 일상을 공유할까요?"
            />
        </Container>


    );
};

export default FeedVoteForm;
