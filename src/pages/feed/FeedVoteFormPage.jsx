import Footer from "../../components/common/Footer";

import { useEffect, useState } from 'react';
import { useParams, useSearchParams } from "react-router-dom";
import { useSelector } from "react-redux";

import FeedVoteForm from "./component/FeedForm/FeedVoteForm";
import FloatingButtons from "./component/FeedForm/FloatingButtons";
import axios_api from "../../lib/axios_api";
import Header from "../../components/common/Header";

/**
 * 투표 피드를 새롭게 추가한다.
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
            <Header title="투표 피드 만들기" />
            <FeedVoteForm
                existingFeed={selectedFeed}
                inputWriterId={writerId}
                inputBuildingId={buildingId}
                inputFeedId={feedId}
            />
            <div>
            {!feedId && <FloatingButtons />}
            {/* <Footer /> */}
            </div>
            <br/><br/><br/><br/>
        </div>
    );
};

export default FeedFormPage;