import React, { useState } from 'react';
import '../css/FeedDetail.css';

import { Badge, Button, Card, CardBody, CardSubtitle, CardText, CardTitle, Input, ListGroup, ListGroupItem } from 'reactstrap';

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
        <div className="container">
            <Card>
                <CardBody>
                    <CardTitle tag="h3">{title}</CardTitle>
                    <CardSubtitle>
                        {writerNickname} | {writtenTimeReplace} | {buildingName}
                    </CardSubtitle>
                    <div className="tags">
                        {tags.map((tag) => (
                            <Badge key={tag.tagId} color="primary">
                                {tag.tagText}
                            </Badge>
                        ))}
                    </div>
                    <CardText>{feedText}</CardText>
                </CardBody>
            </Card>

            <Card>
                <CardBody>
                    {attachments.map((attachment) => (
                        <div key={attachment.attachmentId} className="mb-3">
                            <img
                                src={attachment.fileUrl}
                                alt={`Attachment ${attachment.attachmentId}`}
                                className="attachment-img"
                            />
                        </div>
                    ))}
                </CardBody>
            </Card>

            <Card>
                <CardBody>
                    <CardTitle tag="h3">댓글</CardTitle>
                    <ListGroup>
                        {commentList.map((comment) => (
                            <ListGroupItem key={comment.commentId}>
                                <strong>{comment.memberId}</strong>: {comment.commentText}
                            </ListGroupItem>
                        ))}
                    </ListGroup>
                    <CardBody>
                        <form onSubmit={handleCommentSubmit}>
                            <Input
                                type="text"
                                value={newComment}
                                onChange={handleCommentChange}
                                placeholder="Enter your comment"
                                className="form-control"
                            />
                            <Button type="submit" className="btn btn-primary mt-2">
                                Add Comment
                            </Button>
                        </form>
                    </CardBody>
                </CardBody>
            </Card>
        </div>
    );
};

export default FeedDetail;