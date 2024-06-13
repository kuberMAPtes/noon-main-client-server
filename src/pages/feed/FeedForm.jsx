import Footer from "../../components/common/Footer";
import FeedFormComponent from "./component/FeedFormComponent"
import { useState } from 'react';

const FeedForm = () => {
    const [feeds, setFeeds] = useState([]);
    const [selectedFeed, setSelectedFeed] = useState(null);

    const handleSave = (feed) => {
        if (selectedFeed) {
            // 피드 수정
            setFeeds(feeds.map(f => (f.id === feed.id ? feed : f)));
        } else {
            // 피드 추가
            setFeeds([...feeds, { ...feed, id: feeds.length + 1 }]);
        }
        setSelectedFeed(null);
    };

    const handleEdit = (feed) => {
        setSelectedFeed(feed);
    };

    return (
        <div className="container">
            <h1>Feed Manager</h1>
            <FeedFormComponent existingFeed={selectedFeed} onSave={handleSave} />
            <div className="feed-list">
                {feeds.map(feed => (
                    <div key={feed.id} className="feed-item">
                        <div className="feed-info">
                            <span>{feed.title} - {feed.writerNickname}</span>
                            <button onClick={() => handleEdit(feed)}>Edit</button>
                        </div>
                    </div>
                ))}
            </div>
            <Footer />
        </div>
    );
};

export default FeedForm;