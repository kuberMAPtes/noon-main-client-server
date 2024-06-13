import React, { useState } from 'react';
import '../css/FeedDetail.css';

const FeedDetail = ({ data }) => {
    const {
        title,
        writerNickname,
        writtenTime,
        feedText,
        buildingName,
        attachments = [],
        tags = [],
        comments = [],
    } = data;

    const writtenTimeReplace = data.writtenTime.replace('T', ' ');

    const [newComment, setNewComment] = useState('');
    const [commentList, setCommentList] = useState(comments);

    const handleCommentChange = (e) => {
        setNewComment(e.target.value);
    };

    const handleCommentSubmit = (e) => {
        e.preventDefault();
        const newCommentEntity = {
            feedId: 10001,
            commentId: commentList.length + 1,
            memberId: 'empty_user',
            commentText: newComment,
            writtenTime: new Date().toISOString(),
            activated: true,
        };
        setCommentList([...commentList, newCommentEntity]);
        setNewComment('');
    };

    return (
        <div className="container">
            <div className="card">
                <div className="card-body">
                    <h2 className="card-title">{title}</h2>
                    <h6 className="card-subtitle text-muted">
                        {writerNickname} | {writtenTimeReplace} | {buildingName}
                    </h6>
                    <div className="tags">
                        {tags.map((tag) => (
                            <span key={tag.tagId} className="badge">
                                {tag.tagText}
                            </span>
                        ))}
                    </div>
                    <p className="card-text">{feedText}</p>
                </div>
            </div>

            <div className="card mt-3">
                <div className="card-body">
                    {attachments.map((attachment) => (
                        <div key={attachment.attachmentId} className="mb-3">
                            <img
                                src={attachment.fileUrl}
                                alt={`Attachment ${attachment.attachmentId}`}
                                className="attachment-img"
                            />
                        </div>
                    ))}
                </div>
            </div>

            <div className="card mt-3">
                <div className="card-header">Comments</div>
                <ul className="list-group">
                    {commentList.map((comment) => (
                        <li key={comment.commentId} className="list-group-item">
                            <strong>{comment.memberId}</strong>: {comment.commentText}
                        </li>
                    ))}
                </ul>
                <div className="card-body">
                    <form onSubmit={handleCommentSubmit}>
                        <input
                            type="text"
                            value={newComment}
                            onChange={handleCommentChange}
                            placeholder="Enter your comment"
                            className="form-control"
                        />
                        <button type="submit" className="btn btn-primary mt-2">
                            Add Comment
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default FeedDetail;