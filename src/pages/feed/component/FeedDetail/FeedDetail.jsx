import React, { useState } from 'react';
import '../../css/FeedDetail.css';

import { Badge, Button, Card, CardBody, CardSubtitle, CardText, CardTitle, Form, Input, ListGroup, ListGroupItem } from 'react-bootstrap';
import { toggleBookmark, toggleLike } from '../../axios/FeedAxios';
import { FaBookmark, FaHeart, FaRegBookmark, FaRegHeart } from 'react-icons/fa';

const FeedDetail = ({ data, memberId }) => {
    const {
        feedId,
        title,
        writerNickname,
        writtenTime,
        feedText,
        buildingName,
        like,
        bookmark,
        mainActivated,
        attachments = [],
        tags = [],
        comments = [],
    } = data;

    const [liked, setLiked] = useState(like);
    const [bookmarked, setBookmarked] = useState(bookmark);

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

    const handleLikeClick = () => {
        toggleLike(liked, setLiked, feedId, memberId);
    }
    
    const handleBookmarkClick = () => {
        toggleBookmark(bookmarked, setBookmarked, feedId, memberId);
    }

    return (
        <div className="container">
            <Card>
                <CardBody>
                    {/* Header */}
                    <div className="d-flex justify-content-between align-items-center">
                        <CardTitle tag="h2">
                            {title}
                        </CardTitle>
                        <div>
                            <span onClick={handleLikeClick} style={{ cursor: 'pointer', marginRight: '10px' }}>
                                {liked ? <FaHeart color="red" size='32'/> : <FaRegHeart size='32'/>}
                            </span>
                            <span onClick={handleBookmarkClick} style={{ cursor: 'pointer' }}>
                                {bookmarked ? <FaBookmark color="gold" size='32' /> : <FaRegBookmark size='32' />}
                            </span>
                        </div>
                    </div>
                    <CardSubtitle>
                        {writerNickname} | {writtenTimeReplace} | {buildingName}
                    </CardSubtitle>

                    {/* Body */}
                    <CardText>{feedText}</CardText>
                    <div className="tags">
                        {tags.map((tag) => (
                            <Badge key={tag.tagId} color="primary">
                                {tag.tagText}
                            </Badge>
                        ))}
                    </div>
                    <div className="feed-stats">
                        <p>좋아요 수: 0</p>
                        <p>댓글 수: {commentList.length}</p>
                        <p>조회수: 0</p>
                        <p>인기도: 0</p>
                    </div>
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
                            <Form.Control
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