import React, { useEffect, useState } from 'react';
import { Row, ListGroup, Badge } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import useNavigator from '../../util/Navigator';
import { useSearchParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import axios_api from '../../../../lib/axios_api';

const FeedPopularyRanking = ({buildingId}) => {
    const {goToMemberProfile, goToFeedDetail} = useNavigator();

    const [searchParams] = useSearchParams();
    const memberIdFromStore = useSelector((state) => state.auth.member.memberId);
    const memberIdFromURL = searchParams.get('memberId');
    const memberId = memberIdFromStore || memberIdFromURL;
    const [ranking, setRanking] = useState([]);

    // 건물 내 인기 피드 목록 가져오기
    const rankingData = async () => {
        let url = `/feed/FeedPopularity?buildingId=${buildingId}`;

        // axios 실행
        try {
            const response = await axios_api.get(url);
            if (response.data.length === 0) {
                setRanking([]);
            } else {
                setRanking((prevFeeds) => [...prevFeeds, ...response.data]); // 기존의 끝에 추가

                console.log(response.data);
            }
        } catch (e) {
            console.log(e);
        }    
    }

    // 처음에만 실행
    useEffect(() => {
        rankingData();
    }, []);
    
    return (
        <div>
            <Row className="justify-content-center my-4">
                <h2>인기 피드 랭킹</h2>
            </Row>
            <ListGroup as="ol">
                {ranking.map((feed, index) => (
                    <ListGroup.Item key={feed.feedId} as="li" className="d-flex justify-content-between align-items-center">
                        <div onClick={() => goToFeedDetail(memberId, feed.feedId)}>
                            <span className="me-3">{index + 1}위</span>
                            <span>{feed.title}</span>
                        </div>
                        <div>
                            <span className="me-3" onClick={() => goToMemberProfile(feed.writerId)}>작성자: {feed.nickname}</span>
                            <Badge bg="primary">인기도: {feed.popularity}</Badge>
                        </div>
                    </ListGroup.Item>
                ))}
            </ListGroup>
        </div>
    );
};

export default FeedPopularyRanking;