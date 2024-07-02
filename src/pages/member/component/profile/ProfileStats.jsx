import React, { useEffect, useRef, useState } from "react";
import { Row, Col, Card } from "react-bootstrap";
import profile from "../../../../assets/css/module/member/GetMemberProfile.module.css";
import { useNavigate } from "react-router-dom";
import {
  decryptWithLv,
  decryptWithLvWithUri,
  encryptWithLvWithUri,
} from "../../../../util/crypto";
import useEncryptId from "../../hook/useEncryptId";
import { FaUserPlus } from "react-icons/fa";
import { BsBuildings } from "react-icons/bs";
import { MdDynamicFeed } from "react-icons/md";
import base from "../../../../assets/css/module/member/base.module.css";
import { Link as ScrollLink } from "react-scroll";
const ProfileStats = ({
  fromId,
  toId,
  feeds,
  buildingSubscriptionCount,
  followerCount,
  followingCount,
  feedSectionRef
}) => {
  const { encryptedData, ivData } = useEncryptId(toId); // 커스텀 훅 사용
  const feedCount = feeds.length;
  const navigate = useNavigate();

  const handleFollowerClick = () => {
    // alert("복호화가 안되나봐 :: " + decryptWithLvWithUri(encryptedData, ivData)+ " :: " + encryptedData + " :: " + ivData);

    const secretId = encryptedData;
    const secretIv = ivData;

    //페이지 0은 안줘도 됨
    navigate(
      `/member/getMemberRelationshipList/${secretId}/${secretIv}?relationshipType=follower`
    );
  };

  const handleFollowingClick = () => {
    const secretId = encryptedData;
    const secretIv = ivData;

    navigate(
      `/member/getMemberRelationshipList/${secretId}/${secretIv}?relationshipType=following`
    );
  };
  const handleFeedCountClick = () => {
    feedSectionRef.current.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <Row className="text-center d-flex align-items-center justify-content-center" style={{width:"100%", height:"100%", padding:"0px 5px 0px 5px"}}>

      <Col Col xs={3} sm={3} md={3} lg={3} style={{padding:"0%"}}>
      <ScrollLink to="feedSection" smooth={true} duration={500} className={profile.circle}>
          <div className={profile["circle-text"]}>{feedCount}</div>
      </ScrollLink>
        <div>
          <MdDynamicFeed />
          피드 수
        </div>
      </Col>

      <Col Col xs={3} sm={3} md={3} lg={3} style={{padding:"0%"}}>
        <div
          className={`${profile.circle} ${base.hoverStyle}`}
          onClick={fromId!==toId ? () => navigate(`/map/${toId}`) : ()=> navigate(`/map`)}
        >
          <div className={profile["circle-text"]}>
            {buildingSubscriptionCount}
          </div>
        </div>
        <div>
          <BsBuildings />
          구독건물
        </div>
      </Col>

      <Col Col xs={3} sm={3} md={3} lg={3} style={{padding:"0%"}}>
        <div className={profile.circle} onClick={handleFollowerClick}>
          <div className={profile["circle-text"]}>{followerCount}</div>
        </div>
        <div>
          <FaUserPlus />
          팔로워
        </div>
      </Col>

      <Col Col xs={3} sm={3} md={3} lg={3} style={{padding:"0%"}}>
        <div className={profile.circle} onClick={handleFollowingClick}>
          <div className={profile["circle-text"]}>{followingCount}</div>
        </div>
        <div>
          <FaUserPlus />
          팔로잉
        </div>
      </Col>
    </Row>
  );
};

export default ProfileStats;
