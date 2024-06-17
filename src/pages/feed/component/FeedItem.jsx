import React from 'react';
import '../css/FeedItem.css';

import {Card, CardBody, CardImg, CardText, CardTitle} from 'reactstrap';

const FeedItem = ({ data }) => {
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
    const handleCardClick = () => {
        navigator('/feed/detail?feedId=' + feedId)
    }

    return (
        <div>
            <Card>
                <CardBody>
                    <CardTitle tag="h2" onClick={handleCardClick}>
                            {title}
                    </CardTitle>
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
                    bottom
                    src={feedAttachmentURL}
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
