import React, { useState } from 'react';
import '../../css/FeedDetail.css';

import { Image, Badge, Button, Card, CardBody, CardSubtitle, CardText, CardTitle, Form, ListGroup, ListGroupItem } from 'react-bootstrap';
import { toggleBookmark, toggleLike } from '../../axios/FeedAxios';
import { FaBookmark, FaHeart, FaRegBookmark, FaRegHeart, FaCommentAlt, FaRegEye, FaFireAlt, FaExchangeAlt } from 'react-icons/fa';
import { MdDelete } from "react-icons/md";
import LikedUsersList from './LikedUsersList';
import axios_api from '../../../../lib/axios_api';

const FeedDetail = ({ data, memberId }) => {
    const {
        feedId,
        title,
        writerNickname,
        writerProfile,
        writtenTime,
        feedText,
        buildingName,
        like,
        likeCount,
        bookmark,
        bookmarkCount,
        popularity,
        mainActivated,
        viewCnt,
        attachments = [],
        tags = [],
        comments = [],
    } = data;

    const [liked, setLiked] = useState(like); // 좋아요 여부
    const [bookmarked, setBookmarked] = useState(bookmark); // 북마크 여부

    const writtenTimeReplace = data.writtenTime.replace('T', ' '); // 날짜 포멧팅

    // 댓글 추가 관리
    const [newComment, setNewComment] = useState('');
    const [commentList, setCommentList] = useState(comments);

    const [likedCount, setLikeCount] = useState(likeCount); // 좋아요 개수
    const [showLikedUsers, setShowLikedUsers] = useState(false); // 리스트 표시 여부

    // 댓글 추가 내용 만들기
    const handleCommentChange = (e) => {
        setNewComment(e.target.value);
    };


    const handleCommentSubmit = async (e) => {
        e.preventDefault();

        const newCommentEntity = {
            feedId: feedId,
            memberId: memberId,
            commentId : 0,
            commentText: newComment,
            writtenTime: new Date().toISOString(),
            activated: true,
        };

        let url = "/feed/addFeedComment";

        // 댓글 추가 axios
        try {
            const response = await axios_api.post(url, newCommentEntity)
            console.log(response.data);

            newCommentEntity.commentId = response.data;
        } catch (e) {
            console.log(e);
        }

        setCommentList([...commentList, newCommentEntity]);
        setNewComment('');
    };

    const handleLikeClick = () => {
        toggleLike(liked, setLiked, feedId, memberId);
        setLikeCount(preCount => liked ? preCount - 1 : preCount + 1); // 좋아요 수는 변동이 바로 보이도록 변경
    }
    
    const handleBookmarkClick = () => {
        toggleBookmark(bookmarked, setBookmarked, feedId, memberId);
    }

    const handleShowLikedUsersClick = () => {
        setShowLikedUsers(!showLikedUsers); // 리스트 표시 여부 토글
    }

    // 댓글 삭제
    const handleDeleteComment = async (commentId) => {
        setCommentList(commentList.filter(comment => comment.commentId !== commentId));

        // 댓글 삭제 axios
        let url = "/feed/deleteFeedComment/" + commentId;

        // 댓글 추가 axios
        try {
            const response = await axios_api.post(url)
            console.log(response.data);
        } catch (e) {
            console.log(e);
        }
    }


    return (
        <div className="container">
            <Card>
                <CardBody>
                    {/* Header */}
                    <div className="d-flex justify-content-between align-items-center">
                        <div className="d-flex align-items-center">
                            <Image src={writerProfile || 'https://via.placeholder.com/50'} roundedCircle width="50" height="50" className="mr-3" />
                            <div>&nbsp; {writerNickname}</div>
                        </div>
                        <div>
                            <span onClick={handleLikeClick} style={{ cursor: 'pointer', marginRight: '10px' }}>
                                {liked ? <FaHeart color="red" size='32'/> : <FaRegHeart size='32'/>}
                            </span>
                            <span onClick={handleBookmarkClick} style={{ cursor: 'pointer' }}>
                                {bookmarked ? <FaBookmark color="gold" size='32' /> : <FaRegBookmark size='32' />}
                            </span>
                        </div>
                    </div>
                    <br/>
                    <CardSubtitle>
                        {writtenTimeReplace} | {buildingName}  
                    </CardSubtitle>
                    <br/>
                    <CardTitle tag="h2">
                            {title}
                        </CardTitle>
                    <CardText>{feedText}</CardText>
                    { tags && tags.length > 0 && (
                        <div className="tags">
                            {tags.map((tag) => (
                                    <Badge className='tag' key={tag.tagId} color="primary">
                                        {tag.tagText}
                                    </Badge>
                                ))}
                        </div>
                    )}
                    {/* Body */}
                    <div className="feed-stats">
                        <p onClick={handleShowLikedUsersClick} style={{ cursor: 'pointer' }}
                        ><FaRegHeart size='20'/> &nbsp; {likedCount}</p> {/* 좋아요 수 */}
                        <p><FaCommentAlt size='20'/> &nbsp; {commentList.length}</p> {/* 댓글 수 */}
                        <p><FaRegEye size='20'/> &nbsp; {viewCnt}</p> {/* 조회수 */}
                        <p><FaFireAlt size='20'/>&nbsp; {popularity}</p> {/* 인기도 */}
                    </div>
                    {showLikedUsers && <LikedUsersList feedId={feedId} />}
                </CardBody>
            </Card>

            <Card>
                <CardBody>
                    {attachments.map((attachment) => (
                        <div key={attachment.attachmentId} className="mb-3">
                            <img
                                // src={attachment.fileUrl}
                                src = "https://picsum.photos/200/300?grayscale​" 
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
                            <ListGroupItem key={comment.commentId} className="d-flex justify-content-between align-items-center">
                                <div className='d-flex align-items-center'>
                                    <Image src={comment.memberProfile || 'https://via.placeholder.com/50'} roundedCircle width="50" height="50" className="mr-3" />
                                    <div>
                                        <strong>&nbsp; {comment.memberId}</strong> &nbsp;
                                        <span className="text-muted" style={{ fontSize: '0.9em' }}>{new Date(comment.writtenTime).toLocaleString()}</span>
                                        <div>&nbsp; {comment.commentText}</div>
                                    </div>
                                </div>
                                <div>
                                    <MdDelete style={{ cursor: 'pointer' }} onClick={() => handleDeleteComment(comment.commentId)} />
                                </div>
                            </ListGroupItem>
                        ))}
                    </ListGroup>
                    <Form onSubmit={handleCommentSubmit} className='mt-3'>
                        <Form.Group controlId="formNewComment">
                            <Form.Control
                                type="text"
                                value={newComment}
                                onChange={handleCommentChange}
                                placeholder="Enter your comment"
                                className="form-control"
                            />
                        </Form.Group>
                        <Button type="submit" className="btn btn-primary mt-2">
                            추가
                        </Button>
                    </Form>
                </CardBody>
            </Card>
            <br/><br/><br/><br/>
        </div>
    );
};

export default FeedDetail;