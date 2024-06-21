import React from "react";
import { Container, Row, Col, Button, Card } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import UseProfileFetchFeeds from "./component/profile/UseProfileFetchFeeds";
import UseProfileInfiniteScroll from "./component/profile/UseProfileInfiniteScroll";
import ProfileFeedList from "./component/profile/ProfileFeedList";
import ProfileHeader from "./component/profile/ProfileHeader";
import ProfileBody from "./component/profile/ProfileBody";
import useFetchMemberRelationshipList from "./component/common/useFetchMemberRelationshipList";
import UseProfileBuildingSubscriptions from "./component/profile/UseProfileBuildingSubscriptions";
import UseProfile from "./component/profile/UseProfile";
import module from "../member/component/css/profile.module.css";

const GetMemberProfile = () => {
  const { profile, toId, fromId, initialPage, isDenied } = UseProfile();
  const { feeds, hasMore, setPage } = UseProfileFetchFeeds(
    profile.feedDtoList,
    toId,
    initialPage
  );
  const { buildingSubscriptionCount } = UseProfileBuildingSubscriptions({
    toId,
  });
  const { followerCount, followingCount } = useFetchMemberRelationshipList(
    fromId,
    toId
  );
  const lastFeedElementRef = UseProfileInfiniteScroll(hasMore, setPage);

  return (
    <Container
      fluid
      className={`${module.container} d-flex flex-column justify-content-start align-items-center pt-6`}
      style={{ paddingTop: "50px", maxWidth: "100%", display: "none" }}
    >
      <Row className="justify-content-center d-flex">
        <Col xs={12} sm={8} md={6} lg={8} className="d-flex justify-content-center">

            {isDenied ? (
              <div className="d-flex flex-column align-items-center">
                회원프로필을 볼 수 없습니다.
                <ProfileBody />
                <Button variant="primary" className="mt-3">
                  미정
                </Button>
                <ProfileFeedList lastFeedElementRef={lastFeedElementRef} />
              </div>
            ) : (
              <div className="d-flex flex-column" style={{ paddingBottom: "50px" }}>
                <ProfileBody
                  toId={toId}
                  fromId={fromId}
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

        </Col>
      </Row>
    </Container>
  );
};

export default GetMemberProfile;
