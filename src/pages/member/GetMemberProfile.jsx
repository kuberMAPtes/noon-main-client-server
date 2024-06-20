import React, { useState } from "react";
import { Container, Row, Col, Button, Card } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { useSearchParams } from "react-router-dom";
import useProfileFetchFeeds from "./component/profile/useProfileFetchFeeds";
import useProfileInfiniteScroll from "./component/profile/useProfileInfiniteScroll";
import ProfileFeedList from "./component/profile/ProfileFeedList";
import ProfileHeader from "./component/profile/ProfileHeader";
import ProfileBody from "./component/profile/ProfileBody";
import useFetchMemberRelationshipList from "./component/common/useFetchMemberRelationshipList";
import useProfileBuildingSubscriptions from "./component/profile/useProfileBuildingSubscriptions";
import useProfile from "./component/profile/useProfile";
const GetMemberProfile = () => {
  const { profile, toId, fromId, initialPage, isDenied } = useProfile();
  const { feeds, hasMore, setPage } = useProfileFetchFeeds(
    profile.feedDtoList,
    toId,
    initialPage
  );
  const { buildingSubscriptionCount } = useProfileBuildingSubscriptions({
    toId,
  });
  const { followerCount, followingCount } = useFetchMemberRelationshipList(
    fromId,
    toId
  );
  const lastFeedElementRef = useProfileInfiniteScroll(hasMore, setPage);

  return (
    <Container
      fluid
      className="vh-100 w-100 d-flex flex-column justify-content-start align-items-center"
      style={{ paddingTop: "50px", maxWidth: "100%" }}
    >
      <Row className="justify-content-center w-100">
        <Col xs={12} sm={8} md={6} lg={8}>
        
          <Card className="text-center mb-4">
          <ProfileHeader />
          {isDenied ? (
            <div>
              <ProfileBody />
              <Button variant="primary" className="mt-3">
                미정
              </Button>
              <ProfileFeedList lastFeedElementRef={lastFeedElementRef} />
            </div>
          ) : (
            <div>
              <ProfileBody
                toId={toId}
                profile={profile}
                feeds={feeds}
                buildingSubscriptionCount={buildingSubscriptionCount}
                followerCount={followerCount}
                followingCount={followingCount}
              />
              <ProfileFeedList
                feeds={feeds}
                lastFeedElementRef={lastFeedElementRef}
              />
            </div>
          )}
          </Card>
        </Col>
      </Row>
      {/* Footer Component */}
    </Container>
  );
};

export default GetMemberProfile;
