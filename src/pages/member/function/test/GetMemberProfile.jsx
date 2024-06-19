import React, { useState } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { useSearchParams } from "react-router-dom";
import UseProfileFetchFeeds from "./UseProfileFetchFeeds";
import UseProfileInfiniteScroll from "./UseProfileInfiniteScroll";
import ProfileFeedList from "./ProfileFeedList";
import ProfileHeader from "./ProfileHeader";
import ProfileBody from "./ProfileBody";
import UseProfileMemberRelationshipList from "./UseProfileMemberRelationshipList";
import UseProfileBuildingSubscriptions from "./UseProfileBuildingSubscriptions";
import UseProfile from "./UseProfile";
const GetMemberProfile = () => {
  
  const {profile,toId,initialPage, isDenied} = UseProfile();
  const { feeds, hasMore, setPage } = UseProfileFetchFeeds(
    toId,
    initialPage
  );
  const { buildingSubscriptionCount } = UseProfileBuildingSubscriptions({toId});
  const { followerCount, followingCount } = UseProfileMemberRelationshipList();
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
            <ProfileBody/>
            <Button variant="primary" className="mt-3">
                    미정
                </Button>
                <ProfileFeedList
                    lastFeedElementRef={lastFeedElementRef}
                />
            </div>
            ) : (
            <div>
                <ProfileBody
                    profile={profile}
                    feeds={feeds}
                    buildingSubscriptionCount={buildingSubscriptionCount}
                    followerCount={followerCount}
                    followingCount={followingCount}
                />

                <Button variant="primary" className="mt-3">
                    미정
                </Button>
                <ProfileFeedList
                    feeds={feeds}
                    lastFeedElementRef={lastFeedElementRef}
                />
          </div>
            )
          }
        </Col>
      </Row>
      {/* Footer Component */}
    </Container>
  );
};

export default GetMemberProfile;
