import React, { useEffect, useState } from 'react';
import '../../css/FeedItem.css';

import { Card, CardBody, CardImg, CardText, CardTitle } from 'react-bootstrap';
import { FaHeart, FaRegHeart, FaBookmark, FaRegBookmark } from 'react-icons/fa';
import { toggleLike, toggleBookmark } from '../../axios/FeedAxios';
import useNavigator from '../../util/Navigator'
import axios_api from '../../../../lib/axios_api';
import renderFeedTextWithLink from '../../util/renderFeedTextWithLink';
import AttachmentGetter from '../../util/AttachmentGetter';

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
        mainActivated,
        writtenTime,        // 포멧팅 처리
        feedAttachmentId,
    } = data;

    const [liked, setLiked] = useState(like);
    const [bookmarked, setBookmarked] = useState(bookmark);
    const [mainAttachment, setMainAttachment] = useState(null);

    const {goToMemberProfile, goToBuildingProfile, goToFeedDetail} = useNavigator();

    // 데이터 처리
    const writtenTimeReplace = data.writtenTime.replace('T', ' ');

    const renderFeedText = (feedText) => renderFeedTextWithLink(feedText);

    const handleLikeClick = () => {
        toggleLike(liked, setLiked, feedId, memberId);
    }
    
    const handleBookmarkClick = () => {
        toggleBookmark(bookmarked, setBookmarked, feedId, memberId);
    }
    
    // 첨부파일 처리
    // const handleMainAttachment = async (e) => {
    //     let url = `/feed/getFeedAttachment?attachmentId=${feedAttachmentId}`;
    //     try {
    //         const response = await axios_api.get(url, {
    //             responseType:'arraybuffer'
    //         });
            
    //         if (response.data && response.data.byteLength > 0) {
    //             const imageBlob = new Blob([response.data], { type: 'image/jpeg' });
    //             const imageObjectURL = URL.createObjectURL(imageBlob);
    
    //             setMainAttachment(imageObjectURL);
    //         } else {
    //             console.log(feedAttachmentId + " 데이터가 없음");
    //         }
    //     } catch (e) {
    //         if (e.response && e.response.status === 404) {
    //             console.log("Attachment not found (404)");
    //         } else {
    //             console.log(e);
    //         }
    //     }
    // }
    

    useEffect(() => {
        const loadAttachment = async () => {
            const attachmentUrl = await AttachmentGetter(feedAttachmentId);
            if (attachmentUrl) {
                setMainAttachment(attachmentUrl);
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
                    <div className="d-flex justify-content-between align-items-center">
                        <CardTitle tag="h2" onClick={() => goToFeedDetail(memberId, feedId)} style={{ cursor: 'pointer' }}>
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
