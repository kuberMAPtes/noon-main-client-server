import React, { useEffect, useState } from 'react';
import { Row, Col } from 'react-bootstrap';
import profile from '../../../../assets/css/module/member/GetMemberProfile.module.css';
import { useNavigate } from 'react-router-dom';
import { encryptWithLvWithUri } from '../../../../util/crypto';
import useEncryptId from '../common/useEncryptId';

const ProfileStats = ({toId,feeds,buildingSubscriptionCount,followerCount,followingCount}) => {


    const { encryptedData, ivData } = useEncryptId(toId);  // 커스텀 훅 사용
    const feedCount = feeds.length;

    const navigate = useNavigate();

    const handleFollowerClick = () => {

      const secretId = encryptedData;
      const secretIv = ivData;

      //페이지 0은 안줘도 됨
      navigate(`/member/getMemberRelationshipList/${secretId}/${secretIv}?relationshipType=follower`);
    };

    const handleFollowingClick = () => {
      
      const secretId = encryptedData;
      const secretIv = ivData;

      navigate(`/member/getMemberRelationshipList/${secretId}/${secretIv}?relationshipType=following`);
    }

    return (
    <Row className="text-center">
        <Col>
            <div className={profile.circle}>
                <div className={profile["circle-text"]}>{feedCount}</div>
            </div>
            <div>피드 수</div>
        </Col>
        <Col>
            <div className={profile.circle}>
                <div className={profile["circle-text"]}>{buildingSubscriptionCount}</div>
            </div>
            <div>구독한 건물</div>
        </Col>
        <Col>
            <div className={profile.circle} onClick={handleFollowerClick}>
                <div className={profile["circle-text"]}>{followerCount}</div>
            </div>
            <div>팔로워</div>
        </Col>
        <Col>
            <div className={profile.circle} onClick={handleFollowingClick}>
                <div className={profile["circle-text"]}>{followingCount}</div>
            </div>
            <div>팔로잉</div>
        </Col>
    </Row>
    );
};

export default ProfileStats;
