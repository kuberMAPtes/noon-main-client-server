import React from 'react';
import { Container, Row, ListGroup } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const FeedPopularyRanking = ({feeds}) => {
    return (
        <Container>
            <Row className="justify-content-center my-4">
                <h2>인기 피드 목록</h2>
            </Row>
            <ListGroup as="ol" numbered>
                {feeds.map((feed, index) => (
                    <ListGroup.Item key={feed.feedId} as="li">{feed.title} / 작성자 : {feed.nickname} / 인기 : {feed.popularity}</ListGroup.Item>
                ))}
            </ListGroup>
        </Container>
    );
};

export default FeedPopularyRanking;