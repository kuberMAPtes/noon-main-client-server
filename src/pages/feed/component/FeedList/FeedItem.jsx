import React, { useState } from 'react';
import '../../css/FeedItem.css';

import { Card, CardBody, CardImg, CardText, CardTitle } from 'react-bootstrap';
import { FaHeart, FaRegHeart, FaBookmark, FaRegBookmark } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { toggleLike, toggleBookmark } from '../../axios/FeedAxios';
import useNavigator from '../../util/Navigator'

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
        feedAttachmentURL,  // 일단 임시 이미지로 대체
    } = data;

    const [liked, setLiked] = useState(like);
    const [bookmarked, setBookmarked] = useState(bookmark);

    const {goToMemberProfile, goToBuildingProfile, goToFeedDetail} = useNavigator();

    // 데이터 처리
    const writtenTimeReplace = data.writtenTime.replace('T', ' ');


    const handleLikeClick = () => {
        toggleLike(liked, setLiked, feedId, memberId);
    }
    
    const handleBookmarkClick = () => {
        toggleBookmark(bookmarked, setBookmarked, feedId, memberId);
    }
    
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
                    <CardText>{feedText}</CardText>
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
                <CardImg
                    alt={feedId}
                    src="https://picsum.photos/200/300?grayscale​"  // 임시 사진
                    style={{
                        height: 300
                    }}
                    width="100%"
                />
            </Card>
        </div>
    );
};

export default FeedItem;
