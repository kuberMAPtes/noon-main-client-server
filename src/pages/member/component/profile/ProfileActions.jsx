import React from "react";
import { Row, Col } from "react-bootstrap";
import { FaUserEdit, FaMapMarkedAlt } from "react-icons/fa";
import { MdMoreHoriz } from "react-icons/md";
import AnimatedDiv from "../AnimatedDiv";
import profile from "../../../../assets/css/module/member/GetMemberProfile.module.css";
import { useNavigate } from "react-router-dom";
import base from "../../../../assets/css/module/member/base.module.css";

const ProfileActions = () => {
  const [showMenu, setShowMenu] = React.useState(false);

  const navigate = useNavigate();

  const handleToggle = (e) => {
    e.preventDefault();
    setShowMenu(!showMenu);
  };

  const handleBlock = (e) => {
    e.preventDefault();
    // alert("유저를 차단합니다.");
  };

  const handleReport = (e) => {
    e.preventDefault();
    // alert("유저를 신고합니다.");
  };

  const handleUpdatePhoneNumber = (e) => {
    e.preventDefault();
    // alert("연락처를 등록합니다.");
  };

  return (
    <Row className="text-center mt-3">
      <Col>
        <div
          className={`${profile.memberCircle} ${base.hoverStyle}`}
          onClick={() => navigate("/member/updateMember")}
        >
          <div className={profile["circle-profile-icon"]}>
            <FaUserEdit />
          </div>
        </div>
      </Col>
      <Col>
        <div
          className={`${profile.circle} ${base.hoverStyle}`}
          onClick={() => navigate("/map")}
        >
          <div className={profile["circle-map-icon"]}>
            <FaMapMarkedAlt />
          </div>
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
              <AnimatedDiv onClick={() => navigate("/setting")}>
                환경설정으로..
              </AnimatedDiv>
              <AnimatedDiv onClick={() => navigate("/customerSupport")}>
                고객지원
              </AnimatedDiv>
              <AnimatedDiv onClick={handleBlock}>차단하기</AnimatedDiv>
              <AnimatedDiv onClick={handleReport}>신고하기</AnimatedDiv>
              <AnimatedDiv onClick={handleUpdatePhoneNumber}>
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
