import React, { useState } from 'react';
import { Row, Col } from 'react-bootstrap';
import profile from '../../../../assets/css/module/member/GetMemberProfile.module.css';
import { useNavigate } from 'react-router-dom';

const ProfileStats = ({feeds,buildingSubscriptionCount,followerCount,followingCount}) => {

    const feedCount = feeds.length;
    // const followerCount = memberRelationshipList.filter((relationship)=> relationship.relationshipType === "FOLLOWER").length;
    // const followingCount = memberRelationshipList.filter((relationship)=> relationship.relationshipType === "FOLLOWING").length;

    const navigate = useNavigate();

    const handleFollowerClick = () => {
        navigate(`/member/GetMemberRelationshipList?relationshipType=follower`);
    };

    const handleFollowingClick = () => {
        navigate(`/member/GetMemberRelationshipList?relationshipType=following`);
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
