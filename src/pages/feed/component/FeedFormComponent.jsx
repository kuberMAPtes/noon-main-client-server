import React, { useState, useEffect } from 'react';
import "../css/FeedForm.css";

const FeedForm = ({ existingFeed, onSave }) => {
    const [feedData, setFeedData] = useState({
        title: '',
        feedText: '',
        tags: [],
        category: '',
        publicRange: '',
        attachments: []
    });

    useEffect(() => {
        if (existingFeed) {
            setFeedData({
                title: existingFeed.title,
                feedText: existingFeed.feedText,
                tags: existingFeed.tags || [],
                category: existingFeed.category,
                publicRange: existingFeed.publicRange,
                attachments: existingFeed.attachments || []
            });
        } else {
            setFeedData({
                title: '',
                feedText: '',
                tags: [],
                category: '',
                publicRange: '',
                attachments: []
            });
        }


    }, [existingFeed]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFeedData({
            ...feedData,
            [name]: value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const updatedFeed = {
            ...existingFeed,
            ...feedData,
            tags: feedData.tags
        };
        onSave(updatedFeed);
    };

    const handleCancel = () => {
        setFeedData({
            title: '',
            feedText: '',
            tags: [],
            category: '',
            publicRange: '',
            attachments: []
        });
    };

    const handleFileChange = (e) => {
        const files = Array.from(e.target.files);
        setFeedData(prevState => ({
            ...prevState,
            attachments: [...prevState.attachments, ...files]
        }));
    };

    const handleFileRemove = (fileName) => {
        const updatedFiles = feedData.attachments.filter((file) => file.name !== fileName);
        setFeedData({ ...feedData, attachments: updatedFiles });
    };

    return (
            <div className="feed-form">
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="feedTitle">제목</label>
                    <input
                        type="text"
                        id="feedTitle"
                        name="title"
                        value={feedData.title}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="feedText">내용</label>
                    <textarea
                        id="feedText"
                        name="feedText"
                        rows={3}
                        value={feedData.feedText}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="attachments">첨부 파일</label>
                    <input
                        type="file"
                        id="feedFile"
                        name="attachments"
                        multiple
                        onChange={handleFileChange}
                    />
                    <ul className="file-list">
                        {feedData.attachments.map((file, index) => (
                            <li key={index}>
                                {file.name}
                                <button type="Button" name="attachment" onClick={() => handleFileRemove(file.name)}>
                                    삭제
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>

                <div className="form-group">
                    <label htmlFor="feedTags">태그</label>
                    <div className="oneline">
                        <input
                            type="text"
                            id="feedTags"
                            name="tags"
                            value={feedData.tags}
                            onChange={handleChange}
                        />
                        <button name="accept">추가</button>
                    </div>

                </div>

                <div className="form-group">
                    <label htmlFor="feedCategory">카테고리</label>
                    <select
                        id="feedCategory"
                        name="category"
                        value={feedData.category}
                        onChange={handleChange}
                        required
                    >
                        <option value="GENERAL">일반</option>
                        <option value="COMPLIMENT">칭찬하기</option>
                        <option value="QUESTION">Q&A</option>
                        <option value="EVENT">이벤트</option>
                        <option value="POLL">투표</option>
                        <option value="SHARE">나눔</option>
                        <option value="HELP_REQUEST">도움 요청</option>
                        <option value="MEGAPHONE">확성기</option>
                        <option value="NOTICE">공지사항</option>
                    </select>
                </div>

                <div className="form-group">
                    <label htmlFor="publicRange">공개 범위</label>
                    <select
                        id="publicRange"
                        name="publicRange"
                        value={feedData.publicRange}
                        onChange={handleChange}
                        required
                    >
                        <option value="PUBLIC">전체 공개</option>
                        <option value="PRIVATE">비공개</option>
                        <option value="FOLLOWER_ONLY">팔로워 공개</option>
                        <option value="MUTUAL_ONLY">맞팔 공개</option>
                    </select>
                </div>

                <div className="form-buttons">
                    <button type="submit" name="accept">저장</button>
                    <button type="button" name="attachment" onClick={handleCancel}>취소</button>
                </div>
            </form>
        </div>

    );
};

export default FeedForm;
