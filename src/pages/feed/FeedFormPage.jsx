import Footer from "../../components/common/Footer";

import { useEffect, useState } from 'react';
import { Button } from "react-bootstrap";
import { useParams, useSearchParams } from "react-router-dom";
import { useSelector } from "react-redux";

import FeedForm from "./component/FeedForm/FeedForm"
import SlideUpModal from "./component/FeedForm/SlideUpModal";
import BasicNavbar from "../../components/common/BasicNavbar";
import axios_api from "../../lib/axios_api";

/**
 * 피드를 새롭게 추가한다.
 * @returns 
 */
const FeedFormPage = () => {
    const [selectedFeed, setSelectedFeed] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [searchParams] = useSearchParams();

    // 1. memberId
    const memberIdFromStore = useSelector((state) => state.auth.member.memberId);
    const memberIdFromURL = searchParams.get('memberId');
    const writerId = memberIdFromStore || memberIdFromURL;

    // 2. buildingId
    const buildingId = searchParams.get('buildingId');

    console.log("FeedFormPage writerId : " + writerId, "buildingId : " + buildingId);

    // 3. feedid
    const params = useParams()
    const feedId = params.feedId || null;

    useEffect(() => {
        if (feedId) {
            const fetchFeed = async () => {
                try {
                    const response = await axios_api.get(`/feed/detail?feedId=${feedId}`);
                    setSelectedFeed(response.data);
                } catch (error) {
                    console.error('피드 데이터를 가져오는 중 오류 발생:', error);
                }
            };
            fetchFeed();
        } else {
            setSelectedFeed(null);
        }
    }, [feedId]);

    return (
        <div>
            {/* <BasicNavbar /> */}
            {/* 피드를 새로 추가할 때만 생성 */}
            {feedId ? '' : (
                <div className="container">
                    <Button variant="primary" onClick={() => setShowModal(true)}>
                        피드 종류
                    </Button>
                    <SlideUpModal 
                        show={showModal} 
                        onHide={() => setShowModal(false)} 
                    />
                </div>
            )}

            <FeedForm
                existingFeed={selectedFeed}
                inputWriterId={writerId}
                inputBuildingId={buildingId}
                inputFeedId={feedId}
            />

            <div>
            <Footer />
            </div>
            <br/><br/><br/><br/>
        </div>
    );
};

export default FeedFormPage;