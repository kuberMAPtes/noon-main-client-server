import React from 'react';
import { Container, Row, ListGroup, Badge } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import useNavigator from '../../util/Navigator';
import { useSearchParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

const FeedPopularyRanking = ({feeds}) => {
    const {goToMemberProfile, goToFeedDetail} = useNavigator();

    const [searchParams] = useSearchParams();
    const memberIdFromStore = useSelector((state) => state.auth.member.memberId);
    const memberIdFromURL = searchParams.get('memberId');
    const memberId = memberIdFromStore || memberIdFromURL;

    console.log(feeds);

    return (
        <Container>
            <Row className="justify-content-center my-4">
                <h2>인기 피드 랭킹</h2>
            </Row>
            <ListGroup as="ol">
                {feeds.map((feed, index) => (
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
        </Container>
    );
};

export default FeedPopularyRanking;