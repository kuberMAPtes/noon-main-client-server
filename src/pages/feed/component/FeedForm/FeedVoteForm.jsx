import React, { useState, useEffect } from 'react';
import { Button, Form, Card, Badge } from 'react-bootstrap';
import axios_api from '../../../../lib/axios_api';
import CheckModal from '../Common/CheckModal';
import navigator from '../../util/Navigator'
import VotePreview from './VotePreview';
import styles from '../../css/FeedForm/FeedForm.module.css';
import buttonStyles from '../../css/common/FeedButton.module.css';
import { IoWarning } from "react-icons/io5";
// import renderFeedTextWithLink from '../../util/renderFeedTextWithLink';

const FeedVoteForm = ({ existingFeed, inputWriterId, inputBuildingId, inputFeedId, onSave }) => {
    const [feedData, setFeedData] = useState({
        title: '',
        feedText: '',
        updateTagList: [],
        category: 'POLL',
        publicRange: 'PUBLIC',
        viewCnt: 0,
        writtenTime: '',
        modified: false,
    });

    // 태그 추가 
    const [tagInput, setTagInput] = useState('');

    // Feed Add, Update Modal 관련
    const [feedAddShow, setFeedAddShow] = useState(false);
    const [feedUpdateShow, setFeedUpdateShow] = useState(false);

    // navigator
    const { goToFeedDetail, backHistory } = navigator();
    
    // @(memberId)를 통해 리다이렉션하기
    // const renderFeedText = (feedText) => renderFeedTextWithLink(feedText);

    /* 투표 관련 */
    const [newVote, setNewVote] = useState({ 
        question: '', 
        options: [''] 
    });

    const [previewVoteShow, setPreviewVoteShow] = useState(false);

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
        backHistory(); // 뒤로가기
    };

    return (
        <div className={styles.feedFormContainer}>
            <Form onSubmit={handleSubmit}>
                <div className={styles.noticeBox}>
                    <span className={styles.noticeBoxText}>
                        <IoWarning/> 투표 피드는 생성 후 수정이 되지 않습니다.
                    </span>
                </div>
                {/* 제목 */}
                <Form.Group controlId="feedTitle" className="mb-3">
                    <Form.Control
                        type="text"
                        name="title"
                        placeholder="제목을 입력하세요"
                        value={feedData.title}
                        onChange={handleChange}
                        required
                    />
                </Form.Group>

                {/* 내용 */}
                <Form.Group controlId="feedText" className="mb-3">
                    <Form.Control
                        as="textarea"
                        name="feedText"
                        rows={10}
                        placeholder="내용을 입력하세요"
                        value={feedData.feedText}
                        onChange={handleChange}
                        required
                    />
                </Form.Group>

                {/* 태그 */}
                <Form.Group controlId="feedTags" className="mb-3">
                    <Form.Control
                        type="text"
                        value={tagInput}
                        onChange={(e) => setTagInput(e.target.value)}
                        placeholder="태그를 입력하세요"
                        className={styles.tagInput}
                    />
                    <Button onClick={handleTagAdd} className={buttonStyles.fullWidthButton}>태그 추가</Button>
                    <div className={styles.tagList}>
                        {Array.isArray(feedData.updateTagList) && feedData.updateTagList.map((tag, index) => (
                            <Badge key={index} className={`mr-2 ${styles.tagBadge}`}>
                                {tag} <span className={styles.badgeClose} onClick={() => handleTagRemove(tag)}>×</span>
                            </Badge>
                        ))}
                    </div>
                </Form.Group>

                {/* 공개 범위 추가 */}
                <Form.Group controlId="feedPublicRange" className="mb-3">
                    <Form.Label>공개 범위</Form.Label>
                    <Form.Control
                        as="select"
                        name="publicRange"
                        value={feedData.publicRange}
                        onChange={handleChange}
                        required
                    >
                        <option value="PUBLIC">전체 공개</option>
                        <option value="FOLLOWER_ONLY">팔로워 공개</option>
                        <option value="MUTUAL_ONLY">맞팔 공개</option>
                        <option value="PRIVATE">비공개</option>
                    </Form.Control>
                </Form.Group>
                <hr/>
                {/* 투표 생성*/}
                <div className={styles.noticeBox}>
                    <span className={styles.noticeBoxText}>
                        투표를 생성해서 다양한 사람들의 의견을 들어보세요! <br/>
                        투표 옵션을 추가하여 다양한 선택지를 만들 수 있습니다.
                    </span>
                </div>
                <Form.Group className="mb-3">
                    <Form.Label>투표 질문</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="투표 질문을 입력하세요"
                        value={newVote.question}
                        onChange={(e) => setNewVote({ ...newVote, question: e.target.value })}
                    />
                </Form.Group>
                
                {newVote.options.map((option, index) => (
                    <Form.Group key={index} className="mb-3">
                        <Form.Label>투표 옵션 {index + 1}</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder={`옵션 ${index + 1}`}
                            value={option}
                            onChange={(e) => handleOptionChange(index, e.target.value)}
                        />
                    </Form.Group>
                ))}
                <Button className={buttonStyles.fullWidthButton} onClick={addOption}>
                    옵션 추가
                </Button>
                <hr/>
                <Button className={buttonStyles.fullWidthButtonBlack} variant="primary" type="submit" >
                    저장
                </Button>
                &nbsp;&nbsp;
                <Button className={buttonStyles.fullWidthButtonRed} onClick={handleCancel}>
                    취소
                </Button>
            </Form>

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

            {/* 투표 미리 보기 */}
            {/* <Button variant="info" onClick={handlePreviewVote} className="me-2">
                투표 미리 보기
            </Button> */}

            {/* Modal : 투표 미리 보기 */}
            {previewVoteShow && (
                <VotePreview
                    question={newVote.question}
                    options={newVote.options}
                    onSelectVote={(selectedOption) => {
                        setPreviewVoteShow(false); // 투표가 끝나면 Modal 닫기
                    }}
                />
            )}
        </div>
    );
};

export default FeedVoteForm;
