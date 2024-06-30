import React, { useEffect, useState } from 'react';

import { Card, CardBody, CardImg, CardText } from 'react-bootstrap';
import { FaHeart, FaRegHeart, FaBookmark, FaRegBookmark } from 'react-icons/fa';
import { toggleLike, toggleBookmark } from '../../axios/FeedAxios';
import navigate from '../../util/Navigator'
import renderFeedTextWithLink from '../../util/renderFeedTextWithLink';
// import AttachmentGetter from '../../util/AttachmentGetter';
import FeedCategoryGetter from '../../util/FeedCategoryGetter';
import styles from "../../css/FeedItemAndDetail.module.css"; // css 적용
import { FcApproval } from "react-icons/fc";
import FeedVote from '../FeedForm/FeedVote';
import axios_api from '../../../../lib/axios_api';

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
            const response = await axios_api.get(`/feed/getFeedAttachmentDto?attachmentId=${feedAttachmentId}`);
            if(response === null) return;

            console.log(response.data);
            const feedAttachmentDto = response.data;
            const attachmentType = response.data.fileType
            if(feedAttachmentDto.blurredFileUrl != null) {
                setMainAttachment({
                    url : feedAttachmentDto.blurredFileUrl,
                    type : attachmentType
                });
            } else if(feedAttachmentDto.fileUrl != null) {
                setMainAttachment({
                    url : feedAttachmentDto.fileUrl,
                    type : attachmentType
                });
            } else {
                setMainAttachment(null);
            }
        };

        loadAttachment();

    }, [feedAttachmentId])

    return (
        <div className={styles.feedItemContainer}>
            <Card className={isNoticeCategory ? styles.feedItemNotionColor : ''}>
                <CardBody>
                    {/* Header */}
                    <div className={styles.headerContainer}>
                        {/* 제목 : 공지라면 공지로 바로 리다이렉션한다.*/}
                        {isNoticeCategory ? (
                            <h1 className={styles.noticeTitle} onClick={() => goToDetailNotice(feedId)} style={{ cursor: 'pointer' }}>
                                <FcApproval /> {title}
                            </h1>
                        ) : (
                            <h2 className={styles.cardTitle} onClick={() => goToFeedDetail(memberId, feedId)} style={{ cursor: 'pointer' }}>
                                {title}
                            </h2>
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
                        <p className={styles.feedText}>{renderFeedText(feedText)}</p>
                     )}
                    <CardText className={isNoticeCategory ? styles.noticeText : ''}>
                        <small className={styles.textMuted}>{writtenTimeReplace}</small>
                    </CardText>
                    <CardText className={isNoticeCategory ? styles.noticeText : ''}>
                        <small className={styles.textMuted}>
                            <div onClick={() => goToMemberProfile(writerId)} className={styles.linkText}>{writerNickname}</div> 
                            &nbsp;|&nbsp;
                            <div onClick={() => goToBuildingProfile(buildingId)} className={styles.linkText}>{buildingName}</div>
                        </small>
                    </CardText>
                </CardBody>
                {mainAttachment &&  mainAttachment.type === 'PHOTO' && (
                    <CardImg
                    alt={feedId}
                    src={mainAttachment.url}
                    className={styles.responsiveMaxImg}
                    />
                )}
                {mainAttachment &&  mainAttachment.type === 'VIDEO' && (
                    <div className={styles.videoWrapper}>
                        <video controls className={styles.responsiveVideo}>
                            <source src={mainAttachment.url} type="video/mp4" />
                            Your browser does not support the video tag.
                        </video>
                    </div>
                )}
                {isPollCategory && (
                    <FeedVote feedId={feedId} memberId={memberId} />
                )}
            </Card>
        </div>
    );
};

export default FeedItem;


