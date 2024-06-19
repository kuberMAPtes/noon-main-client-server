import React, { useState, useEffect } from 'react';
import { Form, Button, Card, ListGroup, Container, Row, Col } from 'react-bootstrap';
import "../css/FeedForm.css";

const FeedForm = ({ existingFeed, onSave }) => {
    const [feedData, setFeedData] = useState({
        title: '',
        feedText: '',
        tags: [],
        category: '',
        publicRange: '',
        attachments: []
    });

    useEffect(() => {
        if (existingFeed) {
            setFeedData({
                title: existingFeed.title,
                feedText: existingFeed.feedText,
                tags: existingFeed.tags || [],
                category: existingFeed.category,
                publicRange: existingFeed.publicRange,
                attachments: existingFeed.attachments || []
            });
        } else {
            setFeedData({
                title: '',
                feedText: '',
                tags: [],
                category: '',
                publicRange: '',
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

    const handleSubmit = (e) => {
        e.preventDefault();
        const updatedFeed = {
            ...existingFeed,
            ...feedData,
            tags: feedData.tags
        };
        onSave(updatedFeed);
    };

    const handleCancel = () => {
        setFeedData({
            title: '',
            feedText: '',
            tags: [],
            category: '',
            publicRange: '',
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
                                        {file.name}
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
                                    name="tags"
                                    value={feedData.tags}
                                    onChange={handleChange}
                                />
                                <Button className="ml-2">추가</Button>
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
