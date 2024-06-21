import React, { useState, useEffect } from 'react';
import { Form, Button, Card, ListGroup, Container, Badge } from 'react-bootstrap';
import "../../css/FeedForm.css";
import axios_api from '../../../../lib/axios_api';

const FeedForm = ({ existingFeed, onSave, inputWriterId, inputBuildingId }) => {
    const [feedData, setFeedData] = useState({
        writerId: inputWriterId,
        mainActivate: false,
        viewCnt: 0,
        writtenTime: '',  // 현재 시간
        modified : false,
        title: '',
        feedText: '',
        updateTagList: [],
        category: 'GENERAL',
        publicRange: 'PUBLIC',
        attachments: []
    });
    const [tagInput, setTagInput] = useState(''); // 태그 추가

    useEffect(() => {
        if (existingFeed) {
            setFeedData({
                title: existingFeed.title,
                feedText: existingFeed.feedText,
                updateTagList : existingFeed.tags || [],
                category: existingFeed.category || 'GENERAL',
                publicRange: existingFeed.publicRange || 'PUBLIC',
                attachments: existingFeed.attachments || []
            });
        } else {
            setFeedData({
                title: '',
                feedText: '',
                tags: [],
                category: 'GENERAL',
                publicRange: 'PUBLIC',
                attachments: []
            });
        }
    }, [existingFeed]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFeedData({
            ...feedData,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const addFeedData = {
                writerId: inputWriterId,
                buildingId : inputBuildingId,
                mainActivate: false,
                viewCnt: 0,
                writtenTime: new Date(),
                modified : false,
                title: feedData.title,
                feedText: feedData.feedText,
                updateTagList: [],
                feedCategory: feedData.category,
                publicRange: feedData.publicRange
            };

            console.log(addFeedData);

            // 먼저 피드 데이터를 전송
            const feedResponse = await axios_api.post('/feed/addFeed', addFeedData);

            const feedId = feedResponse.data;

            // 파일 업로드를 위해 FormData를 생성
            const formData  = new FormData();
            feedData.attachments.forEach((file) => {
                formData.append('multipartFile', file);
            });

            // 첨부파일을 업로드
            await axios_api.post(`/feed/addFeedAttachment/${feedId}`, formData , {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

            onSave(feedResponse.data); // 저장 후 처리할 함수 호출
            console.log('피드가 성공적으로 저장되었습니다:', feedResponse.data);
        } catch (error) {
            console.error('피드 저장 중 오류 발생:', error);
        }
    };

    const handleCancel = () => {
        setFeedData({
            title: '',
            feedText: '',
            tags: [],
            category: 'GENERAL',
            publicRange: 'PUBLIC',
            attachments: []
        });
    };

    // 첨부파일 변경, 삭제에 대하여
    const handleFileChange = (e) => {
        const files = Array.from(e.target.files);
        setFeedData(prevState => ({
            ...prevState,
            attachments: [...prevState.attachments, ...files]
        }));
    };

    const handleFileRemove = (fileName) => {
        const updatedFiles = feedData.attachments.filter((file) => file.name !== fileName);
        setFeedData({ ...feedData, attachments: updatedFiles });
    };

    const isImageOrVideo = (file) => {
        return file.type.startsWith('image/') || file.type.startsWith('video/');
    };

    // 태그 추가, 변경, 삭제에 대하여
    const handleTagAdd = () => {
        if (tagInput.trim() !== '') {
            setFeedData(prevState => ({
                ...prevState,
                tags: [...prevState.tags, tagInput.trim()]
            }));
            setTagInput('');
        }
    };

    const handleTagRemove = (tag) => {
        const updatedTags = feedData.tags.filter(t => t !== tag);
        setFeedData({ ...feedData, tags: updatedTags });
    };

    return (
        <Container className="feed-form">
            <Card>
                <Card.Body>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group controlId="feedTitle" className="mb-3">
                            <Form.Label>제목</Form.Label>
                            <Form.Control
                                type="text"
                                name="title"
                                value={feedData.title}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>

                        <Form.Group controlId="feedText" className="mb-3">
                            <Form.Label>내용</Form.Label>
                            <Form.Control
                                as="textarea"
                                name="feedText"
                                rows={3}
                                value={feedData.feedText}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>

                        <Form.Group controlId="attachments" className="mb-3">
                            <Form.Label>첨부 파일</Form.Label>
                            <Form.Control
                                type="file"
                                name="attachments"
                                multiple
                                onChange={handleFileChange}
                            />
                            <ListGroup className="file-list mt-3">
                                {feedData.attachments.map((file, index) => (
                                    <ListGroup.Item key={index} className="d-flex justify-content-between align-items-center">
                                        {isImageOrVideo(file) ? (
                                            <img src={URL.createObjectURL(file)} alt={file.name} style={{ maxWidth: '50px', maxHeight: '50px' }} />
                                        ) : (
                                            <span>{file.name}</span>
                                        )}
                                        <Button variant="danger" size="sm" onClick={() => handleFileRemove(file.name)}>삭제</Button>
                                    </ListGroup.Item>
                                ))}
                            </ListGroup>
                        </Form.Group>

                        <Form.Group controlId="feedTags" className="mb-3">
                            <Form.Label>태그</Form.Label>
                            <div className="d-flex">
                                <Form.Control
                                    type="text"
                                    value={tagInput}
                                    onChange={(e) => setTagInput(e.target.value)}
                                    placeholder="태그를 입력하세요"
                                />
                                <Button className="ml-2" onClick={handleTagAdd}>추가</Button>
                            </div>
                            <div className="mt-2">
                            {Array.isArray(feedData.tags) && feedData.tags.map((tag, index) => (
                                <Badge key={index} pill variant="primary" className="mr-2">
                                    {tag} <span className="badge-close" onClick={() => handleTagRemove(tag)}>×</span>
                                </Badge>
                            ))}
                            </div>
                        </Form.Group>

                        <Form.Group controlId="feedCategory" className="mb-3">
                            <Form.Label>카테고리</Form.Label>
                            <Form.Control
                                as="select"
                                name="category"
                                value={feedData.category}
                                onChange={handleChange}
                                required
                            >
                                <option value="GENERAL">일반</option>
                                <option value="COMPLIMENT">칭찬하기</option>
                                <option value="QUESTION">Q&A</option>
                                <option value="EVENT">이벤트</option>
                                <option value="POLL">투표</option>
                                <option value="SHARE">나눔</option>
                                <option value="HELP_REQUEST">도움 요청</option>
                                <option value="MEGAPHONE">확성기</option>
                                <option value="NOTICE">공지사항</option>
                            </Form.Control>
                        </Form.Group>

                        <Form.Group controlId="publicRange" className="mb-3">
                            <Form.Label>공개 범위</Form.Label>
                            <Form.Control
                                as="select"
                                name="publicRange"
                                value={feedData.publicRange}
                                onChange={handleChange}
                                required
                            >
                                <option value="PUBLIC">전체 공개</option>
                                <option value="PRIVATE">비공개</option>
                                <option value="FOLLOWER_ONLY">팔로워 공개</option>
                                <option value="MUTUAL_ONLY">맞팔 공개</option>
                            </Form.Control>
                        </Form.Group>

                        <div className="form-buttons d-flex justify-content-between">
                            <Button type="submit" variant="primary">저장</Button>
                            <Button type="button" variant="secondary" onClick={handleCancel}>취소</Button>
                        </div>
                    </Form>
                </Card.Body>
            </Card>
        </Container>
    );
};

export default FeedForm;
