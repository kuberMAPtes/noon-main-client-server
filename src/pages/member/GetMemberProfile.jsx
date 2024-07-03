import React, { useEffect, useRef, useState } from "react";
import { Container, Row, Col, Button, Card } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import UseProfileFetchFeeds from "./component/profile/UseProfileFetchFeeds";
import UseProfileInfiniteScroll from "./component/profile/UseProfileInfiniteScroll";
import ProfileFeedList from "./component/profile/ProfileFeedList";
import ProfileBody from "./component/profile/ProfileBody";
import useFetchMemberRelationshipList from "./hook/useFetchMemberRelationshipList";
import UseProfileBuildingSubscriptions from "./component/profile/UseProfileBuildingSubscriptions";
import UseProfile from "./component/profile/UseProfile";
import module from "../member/component/css/profile.module.css";
import FeedListPage from "../feed/FeedListPage";
import { useDispatch, useSelector } from "react-redux";
import { setFooterEnbaled } from "../../redux/slices/footerEnabledSlice";
import Header from "../../components/common/Header";
import { Element } from "react-scroll";

const GetMemberProfile = () => {
  const { profile, setProfile, toId, fromId, initialPage, isDenied,denialMessage } =
    UseProfile();

  const { feeds, setFeeds, hasMore, setPage } = UseProfileFetchFeeds(
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
  // const lastFeedElementRef = UseProfileInfiniteScroll(hasMore, setPage);
  const feedSectionRef = useRef(null);

  return (
    <>
    <Header title={fromId===toId ? "내 프로필" : `${profile.nickname}님의 프로필`}/>
    <Container
      fluid
      className={`${module.container} d-flex flex-column justify-content-start align-items-center pt-6`}
      style={{
        flexWrap: "no",
        paddingTop: "30px",
        margin: "0px",
        maxWidth: "100%",
        height: "85vh",
      }}
    >
      <Row
        className={`justify-content-center ${module.flexItem}`}
        style={{ width: "100%", height: "100%" }}
      >
        {isDenied ? (
          <>
          {denialMessage}
            <Col xs={12} sm={12} md={12} lg={12}>
              <ProfileBody
                toId={toId}
                fromId={fromId}
                profile={profile}
                setProfile={setProfile}
                feeds={feeds}
                buildingSubscriptionCount={buildingSubscriptionCount}
                followerCount={followerCount}
                followingCount={followingCount}
                feedSectionRef={feedSectionRef}
              />
            </Col>
            {/* <Col xs={12} sm={12} md={12} lg={12}>
              <ProfileFeedList
            toId={toId}
            feeds={feeds}
            lastFeedElementRef={lastFeedElementRef} />
              <FeedListPage toId={toId} feeds={feeds} setFeeds={setFeeds} />
            </Col> */}
          </>
        ) : (
          <>
            <Col xs={12} sm={12} md={12} lg={12}>
              <ProfileBody
                toId={toId}
                fromId={fromId}
                profile={profile}
                setProfile={setProfile}
                feeds={feeds}
                buildingSubscriptionCount={buildingSubscriptionCount}
                followerCount={followerCount}
                followingCount={followingCount}
                feedSectionRef={feedSectionRef}
              />
            </Col>
            <Col xs={12} sm={12} md={12} lg={12}>
              {/* <ProfileFeedList
            toId={toId}
            feeds={feeds}
            lastFeedElementRef={lastFeedElementRef} /> */}
              <Element name="feedSection">
                <FeedListPage toId={toId} feeds={feeds} setFeeds={setFeeds} />
              </Element>
            </Col>
          </>
        )}
      </Row>
    </Container>
    </>
  );
};

export default GetMemberProfile;
