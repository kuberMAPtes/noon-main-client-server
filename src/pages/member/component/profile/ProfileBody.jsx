import React, { useEffect, useState } from "react";
import { Card, Row, Col, Image, ProgressBar } from "react-bootstrap";
import ProfileStats from "./ProfileStats";
import ProfileActions from "./ProfileActions";

//4가지 파라미터 다 WAS에서 받아야함
//> setProfile등등..필요
//> 상위컴포넌트의 커스텀 훅에서 하고 여기서는 받아쓰자.
const ProfileBody = ({
  toId,
  profile,
  feeds,
  buildingSubscriptionCount,
  followerCount,
  followingCount,
}) => {
  const [dajungTemperature, setDajungTemperature] = useState("");
  const defaultPhotoUrl = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSg3ya9qxUA7YtK-RHIkePuc-IhSgFlOf_7YA&s"

  useEffect(() => {
    if (profile.dajungScore >= 80) {
      setDajungTemperature("매우 따뜻함");
    } else if (profile.dajungScore >= 60) {
      setDajungTemperature("따뜻함");
    } else if (profile.dajungScore >= 40) {
      setDajungTemperature("보통");
    } else if (profile.dajungScore >= 20) {
      setDajungTemperature("차가움");
    } else {
      setDajungTemperature("매우 차가움");
    }
  }, [profile.dajungScore]);

  return (
    <Card.Body>
      <Row className="mb-3">
        <Col xs={4}>
          
          <Image src={profile.profilePhotoUrl || defaultPhotoUrl} roundedCircle className="mb-3" />

          <Card.Title>{profile.nickname}</Card.Title>
          <Card.Subtitle className="mb-2 text-muted"></Card.Subtitle>
        </Col>
        <Col xs={8}>
          <Row>
            <Col xs={3}>다정 온도 : {dajungTemperature}</Col>
            <Col xs={9}>
              <div className="d-flex flex-column align-items-center">
                <ProgressBar
                  now={profile.dajungScore}
                  style={{ width: "100%", height: "1rem" }}
                />
              </div>
            </Col>
          </Row>
          <Row>
            <Col xs={12}>
              <hr />
            </Col>
            <Col xs={12}>
              <br />
            </Col>
          </Row>
          <Row>
            <Col xs={12}>{profile.profileIntro}</Col>
          </Row>
        </Col>
      </Row>
      <ProfileStats
        toId={toId}
        feeds={feeds}
        buildingSubscriptionCount={buildingSubscriptionCount}
        followerCount={followerCount}
        followingCount={followingCount}
      />
      <ProfileActions />
    </Card.Body>
  );
};

export default ProfileBody;
