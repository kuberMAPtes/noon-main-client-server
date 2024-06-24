import React, { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import { FaHome, FaComments, FaMap, FaSearch, FaUser } from "react-icons/fa";
import styles from "../../assets/css/module/Footer.module.css";
import useEncryptId from "../../pages/member/component/common/useEncryptId";
import { useSelector } from "react-redux";

const Footer = () => {
  const memberId = useSelector((state) => state.auth.member.memberId);
  const { encryptedData, ivData } = useEncryptId(memberId);
  const [secretId, setSecretId] = useState(encryptedData);
  const [secretIv, setSecretIv] = useState(ivData);

  useEffect(() => {
    setSecretId(encryptedData);
    setSecretIv(ivData);
  }, [encryptedData, ivData, memberId]);

  // useEffect(()=>{
  //    alert(`Footer에서 가져온 secretId: ${secretId} secretIv: ${secretIv}`);
  // }, [secretId, secretIv]);

  return (
    <footer className="bg-light fixed-bottom">
      <Container>
        <Row className={`text-center ${styles["row-no-link-style"]}`}>
          <Col>
            <Link to="/feed/main" style={isActive("/feed/main") ? footerStyles.activeLink : footerStyles.link}>
              <FaHome size={24} />
              <div style={footerStyles.linkText}>홈</div>
            </Link>
          </Col>
          <Col>
            <Link to="/chat/myChatroomList" style={isActive("/chat/myChatroomList") ? footerStyles.activeLink : footerStyles.link}>
              <FaComments size={24} />
              <div style={footerStyles.linkText}>채팅</div>
            </Link>
          </Col>
          <Col>
            <Link to="/map" style={isActive("/map") ? footerStyles.activeLink : footerStyles.link}>
              <FaMap size={24} />
              <div style={footerStyles.linkText}>지도</div>
            </Link>
          </Col>
          <Col>
            <Link to="/search" style={isActive("/search") ? footerStyles.activeLink : footerStyles.link}>
              <FaSearch size={24} />
              <div style={footerStyles.linkText}>검색</div>
            </Link>
          </Col>
          <Col>
            <Link to={`/member/getMemberProfile/${secretId}/${secretIv}`}>
              <FaUser size={24} />
              <div>프로필</div>
            </Link>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

const footerStyles = {
  footer: {
    backgroundColor: "#ffffff",
    borderTop: "2px solid #e0e0e0",
    paddingTop: "20px",
    paddingBottom: "10px",
    boxShadow: "0px -1px 5px rgba(0,0,0,0.1)",
    borderRadius: "20px 20px 0 0",
    position: "fixed",
    bottom: 0,
    width: "100%",
    left: 0, // 좌우를 고정
    right: 0, // 좌우를 고정
    zIndex: 1000,
  },
  link: {
    color: "#B7BEC4",
    textDecoration: "none",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    whiteSpace: "nowrap", // 줄바꿈 방지
  },
  activeLink: {
    color: "#030722",
    textDecoration: "none",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    whiteSpace: "nowrap", // 줄바꿈 방지
  },
  linkText: {
    fontSize: "15px", // 텍스트 크기 조정
    whiteSpace: "nowrap", // 줄바꿈 방지
  },
};

export default Footer;
