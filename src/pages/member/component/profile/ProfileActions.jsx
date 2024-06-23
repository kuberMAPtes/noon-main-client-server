import React from "react";
import { Row, Col } from "react-bootstrap";
import { FaUserEdit, FaMapMarkedAlt } from "react-icons/fa";
import { MdMoreHoriz } from "react-icons/md";
import AnimatedDiv from "../AnimatedDiv";
import profile from "../../../../assets/css/module/member/GetMemberProfile.module.css";
import { useNavigate } from "react-router-dom";
import base from "../../../../assets/css/module/member/base.module.css";

const ProfileActions = ({toId,fromId}) => {
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

  return (
    <>
    <Row className="text-center mt-3">
      <Row style={{padding:"0px",margin:"0px"}}>
        <Col xs={4}>
          <div
            className={`${profile.memberCircle} ${base.hoverStyle}`}
            onClick={() => navigate("/member/updateMember")}
          >
            <div className={profile["circle-profile-icon"]}>
              <FaUserEdit />
            </div>
          </div>
        </Col>
        <Col xs={4}>
          <div
            className={`${profile.circle} ${base.hoverStyle}`}
            onClick={() => navigate("/map")}
          >
            <div className={profile["circle-map-icon"]}>
              <FaMapMarkedAlt />
            </div>
          </div>
        </Col>
        <Col xs={4}>
          <div className={`${profile.circle} ${base.hoverStyle}`} onClick={handleToggle}>
            <MdMoreHoriz size="2em"/>
          </div>
        </Col>
      </Row>
    </Row>
    <Row>
      {showMenu && (
    <Row style={{ margin:"0px",padding:"0px" }}>
      <AnimatedDiv onClick={() => navigate("/setting")}>
        환경설정으로..
      </AnimatedDiv>
      <AnimatedDiv onClick={() => navigate("/customerSupport")}>
        고객지원
      </AnimatedDiv>
      
        {fromId !== toId && 
        (<>
        <AnimatedDiv onClick={() => navigate(`report/addReport/${fromId}/${toId}`)}>신고하기</AnimatedDiv>
        <AnimatedDiv onClick={handleBlock}>차단하기</AnimatedDiv>
        </>)
        }
    </Row>
  )}
    </Row>
    </>
  );
};

export default ProfileActions;
