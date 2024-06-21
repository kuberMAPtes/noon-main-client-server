import Footer from "../../components/common/Footer";
import FeedForm from "./component/FeedForm/FeedForm"
import { useState } from 'react';
import SlideUpModal from "./component/FeedForm/SlideUpModal";
import BasicNavbar from "../../components/common/BasicNavbar";
import { Button } from "react-bootstrap";
import { useSearchParams } from "react-router-dom";
import { useSelector } from "react-redux";

/**
 * 피드를 추가 및 수정한다.
 * @returns 
 */
const FeedFormPage = () => {
    const [feeds, setFeeds] = useState([]);
    const [selectedFeed, setSelectedFeed] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [searchParams] = useSearchParams();
    // 1. memberId
    const memberIdFromStore = useSelector((state) => state.auth.member.memberId);
    const memberIdFromURL = searchParams.get('memberId');
    const writerId = memberIdFromStore || memberIdFromURL;

    // 2. buildingId
    const buildingId = searchParams.get('buildingId');

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

            <FeedForm existingFeed={selectedFeed} onSave={handleSave} inputWriterId={writerId} inputBuildingId = {buildingId}/>
            
            <div>
            <Footer />
            </div>
            <br/><br/><br/><br/>
        </div>
    );
};

export default FeedFormPage;