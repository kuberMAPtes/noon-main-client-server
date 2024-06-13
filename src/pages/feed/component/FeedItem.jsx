import React from 'react';
import '../css/FeedItem.css';

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

    return (
        <div className="card">
            <div className="card-body">
                <h2 className="card-title">{title}</h2>
                <h6 className="card-subtitle text-muted">
                    {writerNickname} | {writtenTimeReplace} | {buildingName}
                </h6>
                <p className="card-text">{feedText}</p>
            </div>
            <div className="card-footer">
                <img
                    src={feedAttachmentURL}
                    alt={`Attachment ${feedAttachmentURL}`}
                    className="attachment-img"
                />
            </div>
        </div>
    );
};

export default FeedItem;
