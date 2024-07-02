import React, { useState } from "react";
import { Row, Col } from "react-bootstrap";
import {
  FaUserEdit,
  FaMapMarkedAlt,
  FaUser,
  FaUserCheck,
} from "react-icons/fa";
import { MdMoreHoriz } from "react-icons/md";
import AnimatedDiv from "../AnimatedDiv";
import profile from "../../../../assets/css/module/member/GetMemberProfile.module.css";
import { Link, useNavigate } from "react-router-dom";
import base from "../../../../assets/css/module/member/base.module.css";
import NormalButton from "../NormalButton";
import { useSelector } from "react-redux";
import useEncryptId from "../../hook/useEncryptId";
import BlockMemberRelationshipButton from "../memberRelationshipList/BlockMemberRelationshipButton";
import MemberRelationshipButton from "../memberRelationshipList/MemberRelationshipButton";
import { BsFillChatDotsFill } from "react-icons/bs";
import { IoSettingsOutline } from "react-icons/io5";
import { RiCustomerServiceLine } from "react-icons/ri";
import { AiFillAlert } from "react-icons/ai";
import {chatRequest} from "../../../Chat/function/axios_api";
import ChatRequestModal from "./ChatRequestModal";
const ProfileActions = ({ toId, fromId }) => {
  const [showMenu, setShowMenu] = React.useState(false);
  const member = useSelector((state) => state.auth.member);
  const { encryptedData, ivData } = useEncryptId(member?.memberId);

  const [showChatModal, setShowChatModal] = useState(false);
  const handleChatModalShow = () => setShowChatModal(true);
  const handleChatModalClose = () => setShowChatModal(false);
  const handleChatModalSubmit = async (fromId, toId, applyMessage) => {
    const response = await chatRequest({
      fromId: fromId,
      toId: toId,
      applyMessage: applyMessage
    });
    console.log("response :: " + response);
    // alert("response :: " + response);
    handleChatModalClose();
  };

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
  const handleUpdatePhoneNumber = () => {
    // alert("휴대폰 번호를 등록합니다.");
    navigate(
      `/member/AddPhoneNumberAuthentification/updatePhoneNumber?secretId=${encryptedData}&secretIv=${ivData}`
    );
  };

  return (
    <>
      <Row className="text-center mt-3">
        <Row style={{ padding: "0px", margin: "0px" }}>
          <Col xs={6}>
            <div
              className={`${profile.memberCircle} ${base.hoverStyle}`}
              onClick={() => navigate("/member/getMember")}
            >
              <div className={profile["circle-profile-icon"]}>
                <FaUserCheck />
              </div>
            </div>
            <div>
              <FaUserCheck />
              개인정보
            </div>
          </Col>
          {/* <Col xs={4}>
            <div
              className={`${profile.circle} ${base.hoverStyle}`}
              onClick={() => navigate("/map")}
            >
              <div className={profile["circle-map-icon"]}>
                <FaMapMarkedAlt />
              </div>
            </div>
            <div>
              <FaMapMarkedAlt />
              지도
            </div>
          </Col> */}
          <Col xs={6}>
            <div
              className={`${profile.circle} ${base.hoverStyle}`}
              
              onClick={handleToggle}
            >
              <MdMoreHoriz size="2em" />
            </div>
            <div>
              <IoSettingsOutline />
              환경설정
            </div>
          </Col>

          {(toId!==fromId && showMenu) && (
              <Row className={`${profile.absoluteRow}`} style={{width:"28%"}}>
                <AnimatedDiv 
                style={{ width: "100%" }}
                onClick={() => navigate("/setting")}>
                  <IoSettingsOutline />
                  <span style={{ padding: "0px 5px 0px 2px" }}></span>환경설정
                  <span style={{ padding: "0px 5px 0px 2px" }}></span>
                </AnimatedDiv>
                <AnimatedDiv
                style={{ width: "100%" }}
                onClick={() => navigate("/customerSupport")}>
                  <RiCustomerServiceLine />
                  <span style={{ padding: "0px 5px 0px 2px" }}></span>고객지원
                  <span style={{ padding: "0px 5px 0px 2px" }}></span>
                </AnimatedDiv>

                {fromId !== toId && (
                  <>
                    <AnimatedDiv
                      style={{ width: "100%" }}
                      onClick={() =>
                        navigate(`/customerSupport/addReport/${toId}`)
                      }
                    >
                      <AiFillAlert />
                      <span style={{ padding: "0px 5px 0px 2px" }}></span>신고하기
                      <span style={{ padding: "0px 5px 0px 2px" }}></span>
                    </AnimatedDiv>
                  </>
                )}
              </Row>
          )}
          {(toId===fromId && showMenu) && (
              <Row className={`${profile.myAbsoluteRow}`} style={{width:"28%"}}>
                <AnimatedDiv 
                style={{ width: "100%" }}
                onClick={() => navigate("/setting")}>
                  <IoSettingsOutline />
                  <span style={{ padding: "0px 5px 0px 2px" }}></span>환경설정
                  <span style={{ padding: "0px 5px 0px 2px" }}></span>
                </AnimatedDiv>
                <AnimatedDiv
                style={{ width: "100%" }}
                onClick={() => navigate("/customerSupport")}>
                  <RiCustomerServiceLine />
                  <span style={{ padding: "0px 5px 0px 2px" }}></span>고객지원
                  <span style={{ padding: "0px 5px 0px 2px" }}></span>
                </AnimatedDiv>

                {fromId !== toId && (
                  <>
                    <AnimatedDiv
                      style={{ width: "100%" }}
                      onClick={() =>
                        navigate(`/customerSupport/addReport/${toId}`)
                      }
                    >
                      <AiFillAlert />
                      <span style={{ padding: "0px 5px 0px 2px" }}></span>신고하기
                      <span style={{ padding: "0px 5px 0px 2px" }}></span>
                    </AnimatedDiv>
                  </>
                )}
              </Row>
          )}
        </Row>
      </Row>
      <Row style={{ margin: "0px", padding: "0px", width: "80%" }}>
        {toId !== fromId && (
          <Row style={{ margin: "0px", padding: "0px" }}>
            <Col xs={12} style={{ margin: "0px", padding: "0px" }}>
              <NormalButton
                size="sm"
                style={{
                  width: "100%",
                  margin: "10px 0px 10px 0px",
                  padding: "0px",
                  textAlign: "left",
                }}
                onClick={handleChatModalShow}
              >
                <span style={{ paddingRight: "20%" }}></span>
                <BsFillChatDotsFill />
                <span style={{ paddingLeft: "11%" }}>1대1채팅방 신청</span>
              </NormalButton>
              <ChatRequestModal
                show={showChatModal}
                handleClose={handleChatModalClose}
                handleSubmit={handleChatModalSubmit}
                fromId={fromId}
                toId={toId}
              />
            </Col>
          </Row>
        )}
        {toId === fromId &&
          member.phoneNumber &&
          member.phoneNumber.endsWith("X") && (
            <Row>
              <Col xs={12}>
                <NormalButton
                  style={{
                    width: "100%",
                    margin: "10px 0px 10px 0px",
                    padding: "0px",
                  }}
                  onClick={handleUpdatePhoneNumber}
                >
                  휴대폰 번호 등록
                </NormalButton>
                <span style={{ fontSize: "13px" }}>
                  💥하나의 휴대폰 번호는 하나의 계정만을 가집니다.
                </span>
              </Col>
            </Row>
          )}
        {toId !== fromId && (
          <Row style={{ margin: "0px", padding: "0px" }}>
            <Col xs={12} style={{ margin: "0px", padding: "0px" }}>
              <BlockMemberRelationshipButton fromId={fromId} toId={toId} />
            </Col>
          </Row>
        )}
        {toId !== fromId && (
          <Row style={{ margin: "0px", padding: "0px" }}>
            <Col xs={12} style={{ margin: "0px", padding: "0px" }}>
              <MemberRelationshipButton fromId={fromId} toId={toId} />
            </Col>
          </Row>
        )}
      </Row>
    </>
  );
};

export default ProfileActions;
