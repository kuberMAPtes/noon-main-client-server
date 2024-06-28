import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { handleKakaoLogin } from "../function/kakaoLogin";
import { handleGoogleLogin } from "../function/googleLogin";
import SignUpButton from "./SignUpButton";
import styles from "../../../assets/css/module/member/LoginButtons.module.css";
import { Container, Row, Col, Button, Spinner } from "react-bootstrap";
import { FaArrowLeft } from "react-icons/fa";
import GoogleLogo from "./GoogleLogo"; // SVG 컴포넌트 임포트
import KakaoLogo from "./KakaoLogo";
import NoonLogo from "../../../assets/css/NoonLogo";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { MdCelebration } from "react-icons/md";
const LoginButtons = ({ onLoginClick,onGoogleLoginClick }) => {
  const dispatch = useDispatch();
  const loginStatus = useSelector((state) => state.auth.loginStatus);
  //   const authorization = useSelector((state) => state.auth.authorization);

  const variants = {
    myAnime: {
      opacity: [0, 1, 0],
      color: ["#91A9FF", "#91A9FF", "#91A9FF"],
      transition: {
        duration: 1.5,
        repeat: Infinity,
        ease: "linear",
      },
    },
  };

  return (
    <Container className={styles.loginButtons} style={{width:"100%",height:"100%",margin:"0px", padding:"0px"}}>
      <Row className="justify-content-center" style={{width:"100%",height:"100%",margin:"0px", padding:"0px"}}>
        <Col xs={12} md={8} lg={6} className="text-center">
          <div className={styles.logo}>
            <NoonLogo />
          </div>
          <Button
            variant="warning"
            className={styles.loginButton}
            onClick={handleKakaoLogin}
          >
            <KakaoLogo className="me-2" /> 카카오로 시작하기
          </Button>
          <hr />
          <Button
            variant="light"
            className={styles.loginButton}
            onClick={onGoogleLoginClick}
          >
          <GoogleLogo className="me-2" />
            Google로 시작하기
          </Button>
          <hr />
          <Button
            variant="success"
            className={`d-flex align-items-center justify-content-center ${styles.loginButton} ${styles.customButton}`}
            onClick={onLoginClick}
          >
            계정 ID로 시작하기
          </Button>
          <hr />
          <SignUpButton />
          <hr />
          <Link
            to="/member/addPhoneNumberAuthentification/getMemberId"
            style={{ fontSize: "0.6rem" }}
          >
            아이디 찾기
          </Link>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <Link to="/member/IdFormToUpdatePwd" style={{ fontSize: "0.6rem" }}>
            비밀번호 재설정
          </Link>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col xs={12} md={8} lg={6} className="text-center">
          <div className={styles.welcomeBanner}>
            <motion.div
              initial={{ opacity: 0 }}
              animate="myAnime"
              variants={variants}
              style={{ display: "inline-block" }}
            >
              <MdCelebration />
              국내 최초 건물 기반 SNS
              <MdCelebration />
            </motion.div>
          </div>
        </Col>
      </Row>
      {loginStatus === "loading" && <Spinner animation="border" />}
    </Container>
  );
};

export default LoginButtons;
