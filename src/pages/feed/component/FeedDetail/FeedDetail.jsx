import React, { useEffect, useState } from 'react';
import '../../css/FeedDetail.css';

import { Image, Badge, Button, Card, CardBody, CardSubtitle, CardText, CardTitle, Form, ListGroup, ListGroupItem } from 'react-bootstrap';
import { toggleBookmark, toggleLike } from '../../axios/FeedAxios';
import { FaBookmark, FaHeart, FaRegBookmark, FaRegHeart, FaCommentAlt, FaRegEye, FaFireAlt, FaBuilding } from 'react-icons/fa';
import { GrUpdate } from "react-icons/gr";
import { MdDelete, MdFeed } from "react-icons/md";
import LikedUsersList from './LikedUsersList';
import axios_api from '../../../../lib/axios_api';
import navigator from '../../util/Navigator';
import CheckModal from '../Common/CheckModal';
import renderFeedTextWithLink from '../../util/renderFeedTextWithLink';
import AttachmentGetter from '../../util/AttachmentGetter';
import styles from  "../../css/common/FeedItemAndDetail.module.css"; // css 적용
import FeedCategoryGetter from '../../util/FeedCategoryGetter';
import FeedVote from '../FeedForm/FeedVote';

const FeedDetail = ({ data, memberId }) => {
    // 데이터
    const {
        feedId,
        title,
        writerId,
        writerNickname,
        writerProfile,
        writtenTime, // 포멧팅
        feedText,
        buildingId,
        buildingName,
        like,
        likeCount,
        bookmark,
        popularity,
        feedCategory,
        mainActivated,
        viewCnt,
        attachments = [],
        tags = [],
        comments = [],
    } = data;

    const [liked, setLiked] = useState(like); // 좋아요 여부
    const [bookmarked, setBookmarked] = useState(bookmark); // 북마크 여부

    // 데이터 처리
    const writtenTimeReplace = data.writtenTime.replace('T', ' '); // 날짜 포멧팅
    const feedCategoryName = FeedCategoryGetter(feedCategory); // 카테고리 변환

    // 네비게이션 관리
    const {goToMemberProfile, goToBuildingProfile, backHistory, goToFeedForm} = navigator();

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

    // 맴버 프로필 리다이렉팅
    const renderFeedText = (feedText) => renderFeedTextWithLink(feedText);

    const [attachmentUrls, setAttachmentUrls] = useState([]); // 첨부파일 URL 목록

    // 첨부파일 적용
    useEffect(() => {
        const fetchAttachments = async () => {
            const urls = await Promise.all(
                attachments.map(async (attachment) => {
                    if(attachment.blurredFileUrl != null) {
                        const url = { type: "image", url: attachment.blurredFileUrl };
                        return { attachmentId : attachment.attachmentId, url }; // 블러 사진 적용 : url 그대로 가져오기
                    } else {
                        const url = await AttachmentGetter(attachment.attachmentId);
                        return { attachmentId: attachment.attachmentId, url };
                    }
                    // const url = await AttachmentGetter(attachment.attachmentId);
                    // return { attachmentId: attachment.attachmentId, url };
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
            memberNickname : '',
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

            newCommentEntity.commentId = response.data.commentId;
            newCommentEntity.memberNickname = response.data.memberNickname;
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

    const isPollCategory = feedCategory === 'POLL'; // 투표 카테고리에 대한 예외

    return (
            <div>
            <div className={styles.iconContainer}>
                { memberId && memberId === writerId && (
                    <div className={styles.iconLeft}>
                        <span onClick={() => setFeedDeleteShow(true)}>
                            <MdDelete size='32'/> {/* 피드 삭제 : Modal 열기*/}
                        </span>
                        <span onClick={() => goToFeedForm(writerId, feedId)}>
                            <MdFeed size='32'/> {/* 피드 수정 */}
                        </span>
                    </div>
                )}
                <div className={styles.iconRight}>
                    <Button variant="secondary" onClick={()=>goToBuildingProfile(buildingId)}>
                        해당 건물 프로필로 이동
                    </Button>
                </div>
            </div>
            <Card>
                <CardBody>
                    {/* Header */}
                    <div className="d-flex justify-content-between align-items-center">
                        <div className="d-flex align-items-center">
                            <Image src={writerProfile || 'https://via.placeholder.com/50'} roundedCircle width="50" height="50" className="mr-3" />
                            <div onClick={() => goToMemberProfile(writerId)} className={styles.headerContainer}>&nbsp; {writerNickname}</div>
                        </div>
                        <div onClick={() => goToBuildingProfile(buildingId)} className={styles.linkText}><FaBuilding /> {buildingName}</div>
                    </div>

                    {/* 좋아요, 북마크, 카테고리 */}
                    <div className={styles.iconContainer}>
                        <div className={styles.iconLeft}>
                            {/* 피드 좋아요 */}
                            <span onClick={handleLikeClick}>
                                {liked ? <FaHeart color="red" size='32'/> : <FaRegHeart size='32'/>} 
                            </span> 

                            {/* 피드 북마크 */}
                            <span onClick={handleBookmarkClick}>
                                {bookmarked ? <FaBookmark color="gold" size='32' /> : <FaRegBookmark size='32' />} 
                            </span>
                        </div>
                        {/* 피드 카테고리 */}
                        <div className={styles.feedCategoryDetail}>{feedCategoryName}</div>
                    </div>
                    
                    {/* 제목 */}
                    <CardTitle tag="h2">{title}</CardTitle>

                    {/* 내용 */}
                    <p style={{ whiteSpace: "pre-wrap" }}><CardText>{renderFeedText(feedText)}</CardText></p>

                    {/* 태그 목록 */}
                    { tags && tags.length > 0 && (
                        <div className="tags">
                            {tags.map((tag) => (
                                    <Badge className='tag' key={tag.tagId} color="primary">
                                        {tag.tagText}
                                    </Badge>
                                ))}
                        </div>
                    )}
                    {/* 작성 시간 */}
                    <br/>
                    <CardSubtitle>{writtenTimeReplace}</CardSubtitle>

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

            {/* 첨부 파일 OR 투표 */}
            { !isPollCategory ? (
                <Card>
                    <CardBody>
                    {attachmentUrls.map((attachmentUrl, index) => (
                        <div key={index}>
                        {attachmentUrl.url.type === "image" && (
                            <img
                                src={attachmentUrl.url.url}
                                alt={`Attachment ${attachmentUrl.attachmentId}`}
                                className={styles.responsiveMaxImg}
                            />
                        )}
                        {attachmentUrl.url.type === "video" && (
                            <video controls className={styles.responsiveVideo}>
                                <source src={attachmentUrl.url.url} type="video/mp4" />
                                Your browser does not support the video tag.
                            </video>
                        )}
                        </div>
                    ))}
                    </CardBody>
                </Card>
                ) : (
                    <FeedVote feedId={feedId} memberId={memberId}/>
                )
            }   
            <Card>
                <CardBody>
                    <CardTitle tag="h3">댓글</CardTitle>
                    <ListGroup>
                        {commentList.map((comment) => (
                            <ListGroupItem key={comment.commentId} className="d-flex justify-content-between align-items-center">
                                <div className='d-flex align-items-center'>
                                    <Image src={comment.memberProfile || 'https://via.placeholder.com/50'} roundedCircle width="50" height="50" className="mr-3" />
                                    <div>
                                        <strong onClick={() => goToMemberProfile(comment.memberId)}>&nbsp; {comment.memberNickname}</strong> &nbsp;
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