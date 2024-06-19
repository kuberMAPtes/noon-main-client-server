import Footer from "../../components/common/Footer";
import FeedForm from "./component/FeedForm"
import { useState } from 'react';
import "./css/FeedForm.css";
import SlideUpModal from "./component/SlideUpModal";

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
    };

    const handleEdit = (feed) => {
        setSelectedFeed(feed);
    };

    const openModal = () => {
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
        setSelectedFeed(null); // 모달 닫을 때 선택된 피드 초기화
    };

    return (
        <div className="container">
            <h1>피드 작성</h1>

            <button onClick={openModal}>특별한 게시판</button>
            <SlideUpModal show={showModal} handleClose={closeModal}>
                테스트 확인 {/*버튼 추가*/}
            </SlideUpModal>

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
            {/* <Footer /> */}
            </div>
            
        </div>
    );
};

export default FeedFormPage;