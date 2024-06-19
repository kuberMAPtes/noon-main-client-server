import React, { useState } from 'react';

import {Card, CardBody, CardImg, CardText, CardTitle} from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const FeedItemByMember = ({ data }) => {

    const {
        feedId,
        title,
        feedText,
        buildingName,
        writerNickname,
        writtenTime,
        feedAttachmentURL,
    } = data;

    // 데이터 처리
    const writtenTimeReplace = data.writtenTime.replace('T', ' ');

    // 상세보기 페이지로 이동
    const navigate = useNavigate();
    const handleCardClick = () => {
        navigate('/feed/detail?feedId=' + feedId)
    }

    return (
            <Card>
                <Card.Header>
                    <div tag="h2" onClick={handleCardClick}>
                        {title}
                    </div>
                    <small className="text-muted">
                        {writtenTimeReplace}
                    </small>
                    &nbsp;&nbsp;&nbsp;
                    <small className="text-muted">
                        {writerNickname}
                    </small>
                    
                </Card.Header>
                <CardBody>
                    <CardText>{feedText}</CardText>
                    <CardText>

                    </CardText>
                    <CardText>
                        <small className="text-muted">
                             | {buildingName}
                        </small>
                    </CardText>
                </CardBody>
                <CardImg
                    alt={feedId}
                    bottom
                    src={feedAttachmentURL}
                    style={{
                        height: 300
                    }}
                    width="100%"
                />
                {feedAttachmentURL === undefined && "없음"}
            </Card>
    );
};

export default FeedItemByMember;
