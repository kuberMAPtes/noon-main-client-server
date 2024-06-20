import React, { useState } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { useSearchParams } from "react-router-dom";
import UseProfileFetchFeeds from "./component/profile/UseProfileFetchFeeds";
import UseProfileInfiniteScroll from "./component/profile/UseProfileInfiniteScroll";
import ProfileFeedList from "./component/profile/ProfileFeedList";
import ProfileHeader from "./component/profile/ProfileHeader";
import ProfileBody from "./component/profile/ProfileBody";
import UseProfileMemberRelationshipList from "./component/profile/UseProfileMemberRelationshipList";
import UseProfileBuildingSubscriptions from "./component/profile/UseProfileBuildingSubscriptions";
import UseProfile from "./component/profile/UseProfile";
import LogoutForm from "./component/LogoutForm";
const GetMemberProfile = () => {
  const { profile, toId, fromId, initialPage, isDenied } = UseProfile();
  const { feeds, hasMore, setPage } = UseProfileFetchFeeds(profile.feedDtoList,toId, initialPage);
  const { buildingSubscriptionCount } = UseProfileBuildingSubscriptions({
    toId,
  });
  const { followerCount, followingCount } = UseProfileMemberRelationshipList(fromId, toId);
  const lastFeedElementRef = UseProfileInfiniteScroll(hasMore, setPage);

  return (
    <Container
      fluid
      className="vh-100 w-100 d-flex flex-column justify-content-start align-items-center"
      style={{ paddingTop: "50px", maxWidth: "100%" }}
    >
      <Row className="justify-content-center w-100">
        <Col xs={12} sm={8} md={6} lg={8}>
          <ProfileHeader />
          {isDenied ? (
            <div>
                isDenied가 true입니다.
              <ProfileBody />
              <Button variant="primary" className="mt-3">
                미정
              </Button>
              <ProfileFeedList lastFeedElementRef={lastFeedElementRef} />
            </div>
          ) : (
            <div>
                isDenied가 false입니다.
              <ProfileBody
                profile={profile}
                feeds={feeds}
                buildingSubscriptionCount={buildingSubscriptionCount}
                followerCount={followerCount}
                followingCount={followingCount}
              />
                <LogoutForm />
              <ProfileFeedList
                feeds={feeds}
                lastFeedElementRef={lastFeedElementRef}
              />
            </div>
          )}
        </Col>
      </Row>
      {/* Footer Component */}
    </Container>
  );
};

export default GetMemberProfile;
