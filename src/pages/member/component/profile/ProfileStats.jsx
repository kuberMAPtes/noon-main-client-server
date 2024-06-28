import React, { useEffect, useState } from "react";
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
const ProfileStats = ({
  toId,
  feeds,
  buildingSubscriptionCount,
  followerCount,
  followingCount,
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

  return (
    <Row className="text-center">
      <Col>
        <div className={profile.circle}>
          <div className={profile["circle-text"]}>{feedCount}</div>
        </div>
        <div>
          <MdDynamicFeed />
          피드 수
        </div>
      </Col>
      <Col>
        <div
          className={`${profile.circle} ${base.hoverStyle}`}
          onClick={() => navigate(`/map/${toId}}`)}
        >
          <div className={profile["circle-text"]}>
            {buildingSubscriptionCount}
          </div>
        </div>
        <div>
          <BsBuildings />
          구독한 건물
        </div>
      </Col>
      <Col>
        <div className={profile.circle} onClick={handleFollowerClick}>
          <div className={profile["circle-text"]}>{followerCount}</div>
        </div>
        <div>
          <FaUserPlus />
          팔로워
        </div>
      </Col>
      <Col>
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
