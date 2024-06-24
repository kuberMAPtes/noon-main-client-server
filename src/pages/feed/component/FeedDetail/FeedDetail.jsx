import React, { useEffect, useState } from 'react';
import '../../css/FeedDetail.css';

import { Image, Badge, Button, Card, CardBody, CardSubtitle, CardText, CardTitle, Form, ListGroup, ListGroupItem } from 'react-bootstrap';
import { toggleBookmark, toggleLike } from '../../axios/FeedAxios';
import { FaBookmark, FaHeart, FaRegBookmark, FaRegHeart, FaCommentAlt, FaRegEye, FaFireAlt } from 'react-icons/fa';
import { GrUpdate } from "react-icons/gr";
import { MdDelete } from "react-icons/md";
import LikedUsersList from './LikedUsersList';
import axios_api from '../../../../lib/axios_api';
import Navigator from '../../util/Navigator'
import navigator from '../../util/Navigator';
import CheckModal from '../Common/CheckModal';
import renderFeedTextWithLink from '../../util/renderFeedTextWithLink';
import AttachmentGetter from '../../util/AttachmentGetter';

const FeedDetail = ({ data, memberId }) => {
    // 데이터
    const {
        feedId,
        title,
        writerId,
        writerNickname,
        writerProfile,
        writtenTime,
        feedText,
        buildingId,
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

    const {goToMemberProfile, goToBuildingProfile, backHistory} = Navigator();

    // 댓글 추가 관리
    const [newComment, setNewComment] = useState('');
    const [commentList, setCommentList] = useState(comments);

    const [likedCount, setLikeCount] = useState(likeCount); // 좋아요 개수
    const [showLikedUsers, setShowLikedUsers] = useState(false); // 리스트 표시 여부

    // Feed Delete Modal 관련
    const [feedDeleteShow, setFeedDeleteShow] = useState(false); // Modal창 여부

    // Comment Delete Modal 관련
    const [commentDeleteShow, setcommentDeleteShow] = useState(false); // Modal창 여부
    const [deleteCommentId, setDeleteCommentId] = useState(null);

    // 피드 수정 화면으로 이동
    const { goToFeedForm } = navigator();

    // 맴버 프로필 리다이렉팅
    const renderFeedText = (feedText) => renderFeedTextWithLink(feedText);

    const [attachmentUrls, setAttachmentUrls] = useState([]); // 첨부파일 URL 목록

    useEffect(() => {
        const fetchAttachments = async () => {
            const urls = await Promise.all(
                attachments.map(async (attachment) => {
                    const url = await AttachmentGetter(attachment.attachmentId);
                    return { attachmentId: attachment.attachmentId, url };
                })
            );
            setAttachmentUrls(urls.filter(urlObj => urlObj.url)); // 유효한 URL만 설정
        };

        fetchAttachments();
    }, [attachments]);


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

    // 좋아요
    const handleLikeClick = () => {
        toggleLike(liked, setLiked, feedId, memberId);
        setLikeCount(preCount => liked ? preCount - 1 : preCount + 1); // 좋아요 수는 변동이 바로 보이도록 변경
    }
    
    // 북마크
    const handleBookmarkClick = () => {
        toggleBookmark(bookmarked, setBookmarked, feedId, memberId);
    }

    // 좋아요를 누른 사람 목록
    const handleShowLikedUsersClick = () => {
        setShowLikedUsers(!showLikedUsers); // 리스트 표시 여부 토글
    }

    // 피드 삭제
    const handleDeleteFeed = async () => {
        let url = "/feed/deleteFeed/" + feedId;

        try {
            const response = await axios_api.post(url)
            console.log("피드 삭제 성공 : " + response.data);
            setFeedDeleteShow(false);
            backHistory(); // 뒤로 가기
        } catch (e) {
            console.log(e);
        }
    }

    // 댓글 삭제
    const handleDeleteComment = async (commentId) => {
        setCommentList(commentList.filter(comment => comment.commentId !== commentId));

        // 댓글 삭제 axios
        let url = "/feed/deleteFeedComment/" + commentId;

        try {
            const response = await axios_api.post(url)
            console.log("댓글 삭제 성공" + response.data);
            setcommentDeleteShow(false);
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
                            <div onClick={() => goToMemberProfile(writerId)} style={{ cursor: 'pointer', display: 'inline' }}>&nbsp; {writerNickname}</div>
                        </div>
                        <div>
                            { memberId && memberId === writerId && (
                                <>
                                    <span onClick={() => setFeedDeleteShow(true)} style={{ cursor: 'pointer', marginRight: '10px' }}>
                                            <MdDelete size='32'/> {/* 피드 삭제 : Modal 열기*/}
                                    </span>
                                    <span onClick={() => goToFeedForm(writerId, feedId)} style={{ cursor: 'pointer', marginRight: '10px' }}>
                                        <GrUpdate size='32'/> {/* 피드 수정 */}
                                    </span>
                                </>
                            )}
                            <span onClick={handleLikeClick} style={{ cursor: 'pointer', marginRight: '10px' }}>
                                {liked ? <FaHeart color="red" size='32'/> : <FaRegHeart size='32'/>} {/* 피드 좋아요 */}
                            </span> 
                            <span onClick={handleBookmarkClick} style={{ cursor: 'pointer' }}>
                                {bookmarked ? <FaBookmark color="gold" size='32' /> : <FaRegBookmark size='32' />} {/* 피드 북마크 */}
                            </span>
                        </div>
                    </div>
                    <br/>
                    <CardSubtitle>
                        {writtenTimeReplace} | <div onClick={() => goToBuildingProfile(buildingId)} style={{ cursor: 'pointer', display: 'inline' }}>{buildingName}</div>  
                    </CardSubtitle>
                    <br/>

                    {/* 제목 */}
                    <CardTitle tag="h2">
                            {title}
                        </CardTitle>

                    {/* 내용 */}
                    <p style={{ whiteSpace: "pre-wrap" }}><CardText>{renderFeedText(feedText)}</CardText></p>
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
                    {attachmentUrls.map(({ attachmentId, url }) => (
                        <div key={attachmentId} className="mb-3">
                            <img
                                src={url}
                                alt={`Attachment ${attachmentId}`}
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
                                    {memberId && memberId === comment.memberId && (
                                    <>
                                        <MdDelete style={{ cursor: 'pointer' }} onClick={() => {
                                            setcommentDeleteShow(true)
                                            setDeleteCommentId(comment.commentId)
                                            }} /> {/* 댓글 삭제 : Modal 열기*/}
                                    </>
                                    )}
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

            {/* Modal : FeedDelete*/}
            <CheckModal 
                show={feedDeleteShow}
                onHide={()=>setFeedDeleteShow(false)}
                onConfirm={handleDeleteFeed}
                title="피드 삭제 확인"
                content="정말 피드를 삭제하시겠습니까?"
            />

            {/* Modal : CommentDelete*/}
            <CheckModal 
                show={commentDeleteShow}
                onHide={()=>setcommentDeleteShow(false)}
                onConfirm={()=>handleDeleteComment(deleteCommentId)}
                title="댓글 삭제 확인"
                content="정말 댓글를 삭제하시겠습니까?"
            />
            <br/><br/><br/><br/>
        </div>
    );
};

export default FeedDetail;