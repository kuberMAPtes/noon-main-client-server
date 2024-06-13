import React, { useState, useEffect } from 'react';
import Footer from '../../../components/common/Footer';
import "../css/FeedForm.css";

const FeedForm = ({ existingFeed, onSave }) => {
    const [feedData, setFeedData] = useState({
        title: '',
        feedText: '',
        tags: '',
        category: '',
        publicRange: '',
    });

    useEffect(() => {
        if (existingFeed) {
            setFeedData({
                title: existingFeed.title,
                feedText: existingFeed.feedText,
                tags: existingFeed.tags.map(tag => tag.tagText).join(', '),
                category: existingFeed.category,
                publicRange: existingFeed.publicRange,
            });
        } else {
            setFeedData({
                title: '',
                feedText: '',
                tags: '',
                category: '',
                publicRange: '',
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
            tags: feedData.tags.split(',').map(tag => ({ tagText: tag.trim() })),
        };
        onSave(updatedFeed);
    };

    const handleCancel = () => {
        setFeedData({
            title: '',
            feedText: '',
            tags: '',
            category: '',
            publicRange: '',
        });
    };

    return (
        <div className="feed-form">
        <form onSubmit={handleSubmit}>
            <div className="form-group">
                <label htmlFor="feedTitle">Title</label>
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
                <label htmlFor="feedText">Feed Text</label>
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
                <label htmlFor="feedTags">Tags (comma separated)</label>
                <input
                    type="text"
                    id="feedTags"
                    name="tags"
                    value={feedData.tags}
                    onChange={handleChange}
                />
            </div>

            <div className="form-group">
                <label htmlFor="feedCategory">Category</label>
                <select
                    id="feedCategory"
                    name="category"
                    value={feedData.category}
                    onChange={handleChange}
                    required
                >
                    <option value="">Select Category</option>
                    <option value="News">News</option>
                    <option value="Update">Update</option>
                    <option value="Announcement">Announcement</option>
                </select>
            </div>

            <div className="form-group">
                <label htmlFor="publicRange">Public Range</label>
                <select
                    id="publicRange"
                    name="publicRange"
                    value={feedData.publicRange}
                    onChange={handleChange}
                    required
                >
                    <option value="">Select Range</option>
                    <option value="Public">Public</option>
                    <option value="Private">Private</option>
                    <option value="Friends">Friends</option>
                </select>
            </div>

            <div className="form-buttons">
                <button type="submit">Save</button>
                <button type="button" onClick={handleCancel}>Cancel</button>
            </div>
        </form>
        <Footer/>
    </div>
    );
};

export default FeedForm;
