import React, { useState } from 'react';
import {
    Card,
    Container,
    Row,
    Col,
    ListGroup,
    Image,
    Badge,
    Form,
    Button,
} from 'react-bootstrap';

const FeedDetail = ({ data }) => {
    const {
        title,
        writerNickname,
        writtenTime,
        feedText,
        buildingName,
        attachments = [],
        tags = [],
        comments = [],
    } = data;

    const writtenTimeReplace = data.writtenTime.replace('T', ' ');

    const [newComment, setNewComment] = useState('');
    const [commentList, setCommentList] = useState(comments);

    const handleCommentChange = (e) => {
        setNewComment(e.target.value);
    };

    const handleCommentSubmit = (e) => {
        e.preventDefault();
        const newCommentEntity = {
            feedId: 10001,
            commentId: commentList.length + 1,
            memberId: 'empty_user',
            commentText: newComment,
            writtenTime: new Date().toISOString(),
            activated: true,
        };
        setCommentList([...commentList, newCommentEntity]);
        setNewComment('');
    };

    return (
        <Container>
            <Row className="mt-3">
                <Col>
                    <Card>
                        <Card.Body>
                            <Card.Title>{title}</Card.Title>
                            <Card.Subtitle className="mb-2 text-muted">
                                {writerNickname} | {writtenTimeReplace} |{' '}
                                {buildingName}
                            </Card.Subtitle>
                            <Card.Subtitle className="mb-2 text-muted">
                                {tags.map((tag) => (
                                    <Badge key={tag.tagId} bg="primary">
                                        {tag.tagText}
                                    </Badge>
                                ))}
                            </Card.Subtitle>
                            <Card.Text>{feedText}</Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>

            <Row className="mt-3">
                <Col>
                    <Card>
                        <Card.Body>
                            {attachments.map((attachment) => (
                                <div
                                    key={attachment.attachmentId}
                                    className="mb-3"
                                >
                                    <Image
                                        src={attachment.fileUrl}
                                        alt={`Attachment ${attachment.attachmentId}`}
                                        fluid
                                    />
                                </div>
                            ))}
                        </Card.Body>
                    </Card>
                </Col>
            </Row>

            <Row className="mt-3">
                <Col>
                    <Card>
                        <Card.Header>Comments</Card.Header>
                        <ListGroup variant="flush">
                            {commentList.map((comment) => (
                                <ListGroup.Item key={comment.commentId}>
                                    <strong>{comment.memberId}</strong>:{' '}
                                    {comment.commentText}
                                </ListGroup.Item>
                            ))}
                        </ListGroup>
                        <Card.Body>
                            <Form onSubmit={handleCommentSubmit}>
                                <Form.Group controlId="commentInput">
                                    <Form.Control
                                        type="text"
                                        value={newComment}
                                        onChange={handleCommentChange}
                                        placeholder="Enter your comment"
                                    />
                                </Form.Group>
                                <Button
                                    variant="primary"
                                    type="submit"
                                    className="mt-2"
                                >
                                    Add Comment
                                </Button>
                            </Form>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default FeedDetail;
