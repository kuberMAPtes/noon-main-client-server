import React from 'react';
import { Row, Col } from 'react-bootstrap';
import profile from '../../../../assets/css/module/member/GetMemberProfile.module.css';

const ProfileStats = () => (
    <Row className="text-center">
        <Col>
            <div className={profile.circle}>
                <div className={profile["circle-text"]}>feedCount</div>
            </div>
            <div>피드 수</div>
        </Col>
        <Col>
            <div className={profile.circle}>
                <div className={profile["circle-text"]}>buildingSubscriptionCount</div>
            </div>
            <div>구독한 건물</div>
        </Col>
        <Col>
            <div className={profile.circle}>
                <div className={profile["circle-text"]}>followerCount</div>
            </div>
            <div>팔로워</div>
        </Col>
        <Col>
            <div className={profile.circle}>
                <div className={profile["circle-text"]}>followingCount</div>
            </div>
            <div>팔로잉</div>
        </Col>
    </Row>
);

export default ProfileStats;
