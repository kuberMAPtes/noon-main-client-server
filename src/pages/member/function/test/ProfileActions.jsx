import React from 'react';
import { Row, Col } from 'react-bootstrap';
import { FaUserEdit, FaMapMarkedAlt } from "react-icons/fa";
import { MdMoreHoriz } from "react-icons/md";
import AnimatedDiv from '../../component/AnimatedDiv';
import profile from '../../../../assets/css/module/member/GetMemberProfile.module.css';
import { useNavigate } from "react-router-dom";

const ProfileActions = ({ showMenu, handleToggle }) => {
    const navigate = useNavigate();

    return (
        <Row className="text-center mt-3">
            <Col>
                <div className={profile.memberCircle} onClick={() => navigate('/member/updateMember')}>
                    <div className={profile["circle-profile-icon"]}><FaUserEdit /></div>
                </div>
            </Col>
            <Col>
                <div className={profile.circle} onClick={() => navigate('/map')}>
                    <div className={profile["circle-map-icon"]}><FaMapMarkedAlt /></div>
                </div>
            </Col>
            <Col>
                <Row>
                    <Col xs={8}>
                        <div className={profile["circle-icon"]} onClick={handleToggle}>
                            <MdMoreHoriz />
                        </div>
                    </Col>
                    {showMenu && (
                        <Col xs={4}>
                            <AnimatedDiv>
                                환경설정으로..
                            </AnimatedDiv>
                            <AnimatedDiv>
                                고객지원
                            </AnimatedDiv>
                            <AnimatedDiv>
                                차단하기
                            </AnimatedDiv>
                            <AnimatedDiv>
                                신고하기
                            </AnimatedDiv>
                            <AnimatedDiv>
                                연락처 등록하기
                            </AnimatedDiv>
                        </Col>
                    )}
                </Row>
            </Col>
        </Row>
    );
};

export default ProfileActions;
