import Footer from "../../components/common/Footer";
import FeedForm from "./component/FeedForm"
import { useState } from 'react';
import SlideUpModal from "./component/SlideUpModal";
import BasicNavbar from "../../components/common/BasicNavbar";
import { Button } from "react-bootstrap";

/**
 * 피드를 추가 및 수정한다.
 * @returns 
 */
const FeedFormPage = () => {
    const [feeds, setFeeds] = useState([]);
    const [selectedFeed, setSelectedFeed] = useState(null);
    const [showModal, setShowModal] = useState(false);

    const handleSave = (feed) => {
        if (selectedFeed) {
            // 피드 수정
            setFeeds(feeds.map(f => (f.id === feed.id ? feed : f)));
        } else {
            // 피드 추가
            setFeeds([...feeds, { ...feed, id: feeds.length + 1 }]);
        }
        setSelectedFeed(null);
        setShowModal(false);
    };

    const handleEdit = (feed) => {
        setSelectedFeed(feed);
        setShowModal(true);
    };

    return (
        <div>
            <BasicNavbar />
            <div className="container">
                <Button variant="primary" onClick={() => setShowModal(true)}>
                    추가 피드
                </Button>
                <SlideUpModal show={showModal} onHide={() => setShowModal(false)} />
            </div>

            <FeedForm existingFeed={selectedFeed} onSave={handleSave} />

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
            <div>
            <Footer />
            </div>
            <br/><br/><br/><br/>
        </div>
    );
};

export default FeedFormPage;