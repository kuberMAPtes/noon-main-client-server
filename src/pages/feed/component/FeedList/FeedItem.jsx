import React, { useEffect, useState } from 'react';
import '../../css/FeedItem.css';

import { Card, CardBody, CardImg, CardText, CardTitle } from 'react-bootstrap';
import { FaHeart, FaRegHeart, FaBookmark, FaRegBookmark } from 'react-icons/fa';
import { toggleLike, toggleBookmark } from '../../axios/FeedAxios';
import navigate from '../../util/Navigator'
import renderFeedTextWithLink from '../../util/renderFeedTextWithLink';
import AttachmentGetter from '../../util/AttachmentGetter';
import FeedCategoryGetter from '../../util/FeedCategoryGetter';
import styles from "../../css/FeedItemAndDetail.module.css"; // css 적용
import { FcApproval } from "react-icons/fc";
import FeedVote from '../FeedForm/FeedVote';

const FeedItem = ({ data, memberId }) => {

    const {
        feedId,
        title,
        feedText,
        buildingId,
        buildingName,
        writerId,
        writerNickname,
        like,
        bookmark,
        feedCategory,
        mainActivated,
        writtenTime,        // 포멧팅 처리
        feedAttachmentId,
    } = data;

    const [liked, setLiked] = useState(like);
    const [bookmarked, setBookmarked] = useState(bookmark);
    const [mainAttachment, setMainAttachment] = useState(null);

    const {goToMemberProfile, goToBuildingProfile, goToFeedDetail, goToDetailNotice} = navigate();

    // 데이터 처리
    const writtenTimeReplace = data.writtenTime.replace('T', ' '); // 날짜 포멧팅
    const feedCategoryName = FeedCategoryGetter(feedCategory); // 카테고리 변환
    const isNoticeCategory = feedCategory === 'NOTICE'; // 공지 카테고리에 대한 예외
    const isPollCategory = feedCategory === 'POLL'; // 투표 카테고리에 대한 예외

    const renderFeedText = (feedText) => renderFeedTextWithLink(feedText);

    const handleLikeClick = () => {
        toggleLike(liked, setLiked, feedId, memberId);
    }
    
    const handleBookmarkClick = () => {
        toggleBookmark(bookmarked, setBookmarked, feedId, memberId);
    }

    useEffect(() => {
        const loadAttachment = async () => {
            const attachmentUrl = await AttachmentGetter(feedAttachmentId);
            console.log(attachmentUrl);
            if (attachmentUrl) {
                setMainAttachment(attachmentUrl.url);
            } else {
                setMainAttachment(null);
            }
        };

        loadAttachment();

    }, [feedAttachmentId])

    return (
        <div>
            <Card className={isNoticeCategory ? styles.feedItemNotionColor : ''}>
                <CardBody>
                    {/* Header */}
                    <div className={styles.headerContainer}>
                        {/* 제목 : 공지라면 공지로 바로 리다이렉션한다.*/}
                        {isNoticeCategory ? (
                            <CardTitle tag="h1" onClick={() => goToDetailNotice(feedId)} style={{ cursor: 'pointer' }}>
                                <FcApproval /> {title}
                            </CardTitle>
                        ) : (
                            <CardTitle tag="h2" onClick={() => goToFeedDetail(memberId, feedId)} style={{ cursor: 'pointer' }}>
                                {title}
                            </CardTitle>
                        )}

                        <div className={styles.iconContainer}>
                            {/* 피드 카테고리 */}
                            <div className={styles.feedCategory}>{feedCategoryName}</div>

                            {/* 좋아요 */}
                            <span onClick={handleLikeClick}>
                                {liked ? <FaHeart color="red" size='24'/> : <FaRegHeart size='24'/>}
                            </span>

                            {/* 북마크 */}
                            <span onClick={handleBookmarkClick}>
                                {bookmarked ? <FaBookmark color="gold" size='24' /> : <FaRegBookmark size='24' />}
                            </span>
                        </div>
                    </div>

                    {/* Body */}
                    {/* 공지사항일 때는 내용을 출력하지 않는다. */}
                    {isNoticeCategory ? '' : (
                        <p style={{ whiteSpace: "pre-wrap" }}><CardText>{renderFeedText(feedText)}</CardText></p>
                     )}
                    <CardText className={isNoticeCategory ? styles.noticeText : ''}>
                        <small className={styles.textMuted}>
                            {writtenTimeReplace}
                        </small>
                    </CardText>
                    <CardText className={isNoticeCategory ? styles.noticeText : ''}>
                        <small className={styles.textMuted}>
                            <div onClick={() => goToMemberProfile(writerId)} style={{ cursor: 'pointer', display: 'inline'}}>{writerNickname}</div> 
                            &nbsp;|&nbsp;<div onClick={() => goToBuildingProfile(buildingId)} style={{ cursor: 'pointer', display: 'inline' }}>{buildingName}</div>
                        </small>
                    </CardText>
                </CardBody>
                {mainAttachment && (
                    <CardImg
                    alt={feedId}
                    src={mainAttachment}
                    style={{
                        height: 300
                    }}
                    width="100%"
                    />
                )}
                {isPollCategory && (
                    <FeedVote feedId={feedId} memberId={memberId} />
                )}
            </Card>
        </div>
    );
};

export default FeedItem;
