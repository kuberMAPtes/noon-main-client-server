import React, { useState } from 'react';
import '../../css/FeedItem.css';

import {Card, CardBody, CardImg, CardText, CardTitle} from 'react-bootstrap';
import { FaHeart, FaRegHeart, FaBookmark, FaRegBookmark } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import axios_api from '../../../../lib/axios_api';

const FeedItem = ({ data, memberId }) => {

    const {
        feedId,
        title,
        feedText,
        buildingName,
        writerNickname,
        like,
        bookmark,
        mainActivated,
        writtenTime,        // 포멧팅 처리
        feedAttachmentURL,  // 일단 임시 이미지로 대체
    } = data;
    const itemMemberId = memberId;

    const [liked, setLiked] = useState(like);
    const [bookmarked, setBookmarked] = useState(bookmark);

    // 데이터 처리
    const writtenTimeReplace = data.writtenTime.replace('T', ' ');

    // 상세보기 페이지로 이동
    const navigate = useNavigate();
    const handleCardClick = () => {
        navigate('/feed/detail?feedId=' + feedId)
    }
    
    // 좋아요 추가 및 삭제
    const toggleLike = async () => {
        let url = ''
        if(!liked) {
            url = `/feed/addFeedLike/${feedId}/${itemMemberId}`;
        } else {
            url = `/feed/deleteFeedLike/${feedId}/${itemMemberId}`;
        }

        try {
            const response = await axios_api.post(url);
            console.log("좋아요 추가 및 취소 완료 : " + response + " like : " + !liked);
        } catch (e) {
            console.error(e);
        } 

        setLiked(!liked);
    };

    // 북마크 추가 및 삭제
    const toggleBookmark = async () => {
        let url = ''
        if(!bookmarked) {
            url = `/feed/addBookmark/${feedId}/${itemMemberId}`;
        } else {
            url = `/feed/deleteBookmark/${feedId}/${itemMemberId}`;
        }

        try {
            const response = await axios_api.post(url);
            console.log("북마크 추가 및 취소 완료 : " + response + " bookmark : " + !bookmarked);
        } catch (e) {
            console.error(e);
        } 

        setBookmarked(!bookmarked);
    };

    return (
        <div>
            <Card>
                <CardBody>
                    {/* Header */}
                    <div className="d-flex justify-content-between align-items-center">
                        <CardTitle tag="h2" onClick={handleCardClick} style={{ cursor: 'pointer' }}>
                            {title}
                        </CardTitle>
                        <div>
                            <span onClick={toggleLike} style={{ cursor: 'pointer', marginRight: '10px' }}>
                                {liked ? <FaHeart color="red" size='32'/> : <FaRegHeart size='32'/>}
                            </span>
                            <span onClick={toggleBookmark} style={{ cursor: 'pointer' }}>
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
                            {writerNickname} | {buildingName}
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
