import React, { useState } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useSearchParams } from "react-router-dom";
import UseProfileFetchFeeds from './UseProfileFetchFeeds';
import UseProfileInfiniteScroll from './UseProfileInfiniteScroll';
import ProfileFeedList from './ProfileFeedList';
import ProfileActions from './ProfileActions';
import ProfileStats from './ProfileStats';
import ProfileHeader from './ProfileHeader';

const ProfileView = () => {
    const [searchParams] = useSearchParams();
    const initialPage = searchParams.get('page') || 1;
    const toId = "member_1";
    const fetchUrl = 'http://localhost:8080/feed/getFeedListByMember';

    const { feeds, loading, hasMore, setPage } = UseProfileFetchFeeds(fetchUrl, toId, initialPage);
    const lastFeedElementRef = UseProfileInfiniteScroll(hasMore, setPage);
    const [showMenu, setShowMenu] = useState(false);

    const handleToggle = (e) => {
        e.preventDefault();
        setShowMenu(!showMenu);
    };

    return (
        <Container fluid className="vh-100 w-100 d-flex flex-column justify-content-start align-items-center" style={{ paddingTop: '50px', maxWidth:'100%'}}>
            <Row className="justify-content-center w-100">
                <Col xs={12} sm={8} md={6} lg={8}>
                    <ProfileHeader />
                    <ProfileStats />
                    <ProfileActions showMenu={showMenu} handleToggle={handleToggle} />
                    <Button variant="primary" className="mt-3">미정</Button>
                    <ProfileFeedList feeds={feeds} lastFeedElementRef={lastFeedElementRef} />
                </Col>
            </Row>
            {/* Footer Component */}
        </Container>
    );
}

export default ProfileView;
