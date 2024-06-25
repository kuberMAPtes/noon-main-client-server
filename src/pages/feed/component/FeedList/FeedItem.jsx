import React, { useEffect, useState } from 'react';
import '../../css/FeedItem.css';

import { Card, CardBody, CardImg, CardText, CardTitle } from 'react-bootstrap';
import { FaHeart, FaRegHeart, FaBookmark, FaRegBookmark } from 'react-icons/fa';
import { toggleLike, toggleBookmark } from '../../axios/FeedAxios';
import useNavigator from '../../util/Navigator'
import renderFeedTextWithLink from '../../util/renderFeedTextWithLink';
import AttachmentGetter from '../../util/AttachmentGetter';
import FeedCategoryGetter from '../../util/FeedCategoryGetter';
import styles from "../../css/FeedItemAndDetail.module.css"; // css 적용

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

    const {goToMemberProfile, goToBuildingProfile, goToFeedDetail} = useNavigator();

    // 데이터 처리
    const writtenTimeReplace = data.writtenTime.replace('T', ' '); // 날짜 포멧팅
    const feedCategoryName = FeedCategoryGetter(feedCategory); // 카테고리 변환

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
            <Card>
                <CardBody>
                    {/* Header */}
                    <div className={styles.headerContainer}>
                        {/* 제목 */}
                        <CardTitle tag="h2" onClick={() => goToFeedDetail(memberId, feedId)} style={{ cursor: 'pointer' }}>
                            {title}
                        </CardTitle>
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
                    <p style={{ whiteSpace: "pre-wrap" }}><CardText>{renderFeedText(feedText)}</CardText></p>
                    <CardText>
                        <small className="text-muted">
                             {writtenTimeReplace}
                        </small>
                    </CardText>
                    <CardText>
                        <small className="text-muted">
                            <div onClick={() => goToMemberProfile(writerId)} style={{ cursor: 'pointer', display: 'inline' }}>{writerNickname}</div> 
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
            </Card>
        </div>
    );
};

export default FeedItem;
