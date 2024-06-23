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
    toId
  });;
  const { followerCount, followingCount } = useFetchMemberRelationshipList(
    fromId,
    toId
  );
  const lastFeedElementRef = UseProfileInfiniteScroll(hasMore, setPage);

  return (
    <Container
      fluid
      className={`${module.container} d-flex flex-column justify-content-start align-items-center pt-6`}
      style={{ paddingTop: "30px", margin:"0px", maxWidth: "100%" }}
    >
      <Row className="justify-content-center d-flex" style={{width:"100%"}}>
        {/* <Col xs={12} sm={12} md={12} lg={12}
        className="d-flex justify-content-center"
        style={{width:"100%"}}> */}

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
              <>
              <Col xs={12} sm={12} md={12} lg={12}
              className="d-flex flex-column"
              style={{width:"100%" }}>
                <ProfileBody
                  toId={toId}
                  fromId={fromId}
                  profile={profile}
                  feeds={feeds}
                  buildingSubscriptionCount={buildingSubscriptionCount}
                  followerCount={followerCount}
                  followingCount={followingCount}
                />
                </Col>
                <Col xs={12} sm={12} md={12} lg={12}>
                <ProfileFeedList
                  feeds={feeds}
                  lastFeedElementRef={lastFeedElementRef}
                />
                </Col>
                </>
            )}

        {/* </Col> */}
      </Row>
    </Container>
  );
};

export default GetMemberProfile;
