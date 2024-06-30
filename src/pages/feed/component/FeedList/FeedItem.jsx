import React, { useEffect, useState } from 'react';

import { Image, Card, CardBody, CardImg, CardText } from 'react-bootstrap';
import { FaHeart, FaRegHeart, FaBookmark, FaRegBookmark, FaBuilding } from 'react-icons/fa';
import { toggleLike, toggleBookmark } from '../../axios/FeedAxios';
import navigate from '../../util/Navigator'
import renderFeedTextWithLink from '../../util/renderFeedTextWithLink';
// import AttachmentGetter from '../../util/AttachmentGetter';
import FeedCategoryGetter from '../../util/FeedCategoryGetter';
import styles from "../../css/common/FeedItemAndDetail.module.css"; // css 적용
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
        writerProfile,
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
    const isEventCategory = feedCategory === 'EVENT';
    const isMegaphoneCategory = feedCategory === 'MEGAPHONE';


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
            <Card className={(isNoticeCategory ? styles.feedItemNotionColor : '') 
                + (isEventCategory ? styles.feedItemEventColor : '')
                + (isMegaphoneCategory ? styles.feedItemMegaphoneColor : '')}>
                <CardBody>
                    {/* Header */}
                    <div className={styles.headerContainer}>
                        <div className="d-flex align-items-center">
                            <Image src={writerProfile || 'https://via.placeholder.com/50'} roundedCircle width="50" height="50" className="mr-3" />
                            <div onClick={() => goToMemberProfile(writerId)}> &nbsp; {writerNickname}</div>
                        </div>
                        <div onClick={() => goToBuildingProfile(buildingId)} className={styles.linkText}><FaBuilding /> {buildingName}</div>
                    </div>
                    

                    {/* Body- 1 */}
                    {/* 첨부파일을 보여준다. 공지일 때는 보여주지 않는다. */}
                    {(mainAttachment && isNoticeCategory === false ) && (
                        <br/>
                    )}

                    {isNoticeCategory ? '' : (
                        <div>
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
                        </div>
                     )}

                    {/* Body- 2 */}
                    {/* 좋아요, 북마크, 피드 카테고리를 추가한다. */}
                    <div className={styles.iconContainer}>
                        <div className={styles.iconLeft}>
                            {/* 좋아요 */}
                            <span onClick={handleLikeClick}>
                                {liked ? <FaHeart color="red" size='24'/> : <FaRegHeart size='24'/>}
                            </span>
                            {/* 북마크 */}
                            <span onClick={handleBookmarkClick}>
                                {bookmarked ? <FaBookmark color="gold" size='24' /> : <FaRegBookmark size='24' />}
                            </span>
                        </div>

                        <div className={styles.iconRight}>
                            {/* 피드 카테고리 */}
                            <div className={styles.feedCategory}>{feedCategoryName}</div>
                        </div>
                    </div>

                    {/* footer */}
                    {/* 제목 : 공지라면 공지로 바로 리다이렉션한다.*/}
                    {isNoticeCategory ? (
                        <h2 className={styles.noticeTitle} onClick={() => goToDetailNotice(feedId)} style={{ cursor: 'pointer' }}>
                            <FcApproval /> {title}
                        </h2>
                    ) : (
                        <h2 className={styles.cardTitle} onClick={() => goToFeedDetail(memberId, feedId)} style={{ cursor: 'pointer' }}>
                            {title}
                        </h2>
                    )}

                    {/* 공지사항일 때는 내용을 출력하지 않는다. */}
                    {isNoticeCategory ? '' : (
                        <p className={styles.feedText}>{renderFeedText(feedText)}</p>
                     )}
                    <CardText>
                        <small className={styles.textMuted}>{writtenTimeReplace}</small>
                    </CardText>
                </CardBody>
            </Card>
        </div>
    );
};

export default FeedItem;


