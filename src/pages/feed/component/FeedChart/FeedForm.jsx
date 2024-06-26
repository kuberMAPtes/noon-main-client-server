import React, { useState, useEffect } from 'react';
import { Form, Button, Card, ListGroup, Container, Badge } from 'react-bootstrap';
import "../../css/FeedForm.css";
import axios_api from '../../../../lib/axios_api';

const FeedForm = ({ existingFeed, inputWriterId, inputBuildingId, inputFeedId, onSave }) => {
    const [feedData, setFeedData] = useState({
        writerId: inputWriterId,
        mainActivate: false,
        viewCnt: 0,
        writtenTime: '',
        modified: false,
        title: '',
        feedText: '',
        updateTagList: [],
        category: 'GENERAL',
        publicRange: 'PUBLIC',
        attachments: []
    });
    const [tagInput, setTagInput] = useState('');

    useEffect(() => {
        if (existingFeed) {
            setFeedData({
                writerId: existingFeed.writerId,
                mainActivate: existingFeed.mainActivate,
                viewCnt: existingFeed.viewCnt,
                writtenTime: existingFeed.writtenTime,
                modified: true,
                title: existingFeed.title,
                feedText: existingFeed.feedText,
                updateTagList: existingFeed.updateTagList || [],
                category: existingFeed.category || 'GENERAL',
                publicRange: existingFeed.publicRange || 'PUBLIC',
                attachments: existingFeed.attachments || []
            });
        } else {
            setFeedData({
                writerId: inputWriterId,
                mainActivate: false,
                viewCnt: 0,
                writtenTime: '',
                modified: false,
                title: '',
                feedText: '',
                updateTagList: [],
                category: 'GENERAL',
                publicRange: 'PUBLIC',
                attachments: []
            });
        }
    }, [existingFeed, inputWriterId]);

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
            if (inputFeedId) {
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
                    feedCategory: feedData.category,
                    publicRange: feedData.publicRange,
                    attachments: feedData.attachments
                };

                console.log(updateFeedData);

                const feedResponse = await axios_api.post(`/feed/updateFeed`, updateFeedData);

                const feedId = feedResponse.data;

                const formData = new FormData();
                feedData.attachments.forEach((file) => {
                    formData.append('multipartFile', file);
                });

                await axios_api.post(`/feed/addFeedAttachment/${feedId}`, formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                });

                console.log('피드가 성공적으로 저장되었습니다:', feedResponse.data);

            } else {
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

                const formData = new FormData();
                feedData.attachments.forEach((file) => {
                    formData.append('multipartFile', file);
                });

                await axios_api.post(`/feed/addFeedAttachment/${feedId}`, formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                });

                console.log('피드가 성공적으로 저장되었습니다:', feedResponse.data);
            }

            onSave && onSave();
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
        return file && file.type && (file.type.startsWith('image/') || file.type.startsWith('video/'));
    };

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
                                {Array.isArray(feedData.updateTagList) && feedData.updateTagList.map((tag, index) => (
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
                            </Form.Control>
                        </Form.Group>

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
                                <option value="GROUP">그룹 공개</option>
                                <option value="PRIVATE">비공개</option>
                            </Form.Control>
                        </Form.Group>

                        <Button variant="primary" type="submit" className="mr-2">
                            저장
                        </Button>
                        <Button variant="secondary" onClick={handleCancel}>
                            취소
                        </Button>
                    </Form>
                </Card.Body>
            </Card>
        </Container>
    );
};

export default FeedForm;
