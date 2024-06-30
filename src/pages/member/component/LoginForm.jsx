import React, { useEffect, useState, Suspense, lazy } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../../../redux/slices/authSlice";
import { validateLoginForm } from "../function/memberValidator";
import { renderLoginError } from "../function/memberFunc";
import { Form, Button, Container, Row, Col, Alert } from "react-bootstrap";
import SignUpButton from "./SignUpButton";
import styles from "../../../assets/css/module/member/LoginForm.module.css";
import styles2 from "../../../assets/css/module/member/base.module.css";
import { setFooterEnbaled } from "../../../redux/slices/footerEnabledSlice";
import NoonLogoRmBg from "../../../assets/css/NoonLogoRmBg";
import {motion,useAnimation} from "framer-motion";

const GetAuthMain = lazy(() => import("../GetAuthMain"));

const LoginForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const storeMemberId = useSelector((state) => state?.auth?.member?.memberId);
  const loginError = useSelector((state) => state?.auth?.loginError);
  console.log("로그인 에러값 확인:", JSON.stringify(loginError));
  const [memberId, setMemberId] = useState("");
  const [pwd, setPassword] = useState("");
  const [validationError, setValidationError] = useState("");
  const controls = useAnimation();
  const [isNavigating, setIsNavigating] = useState(false);

  const handleLoginClick = async (event) => {
    event.preventDefault();
    // setValidationError("");
    const loginData = {
      member: { memberId: memberId, pwd: pwd },
      loginWay: "normal",
    };

    const validationMessage = validateLoginForm(memberId, pwd);
    if(validationMessage === "로그인 시도 횟수 초과 30초간 잠금상태입니다.") {

      //타임아웃 스타트 로직 구현해야함.

    }
    if (validationMessage) {
      setValidationError(validationMessage);
      return;
    }

    try {
      console.log("로그인 하기 전 store.auth.member :: ", storeMemberId);
      const resultAction = await dispatch(login({ loginData, navigate, setIsNavigating }));
      // alert("resultAction"+JSON.stringify(resultAction));
      const message = resultAction.payload?.message;
      // alert("로그인 처리중입니다."+message);
      if(message){
        // alert(message);
        setValidationError(message);//이때 로그인에러값과 validation  error값이 같아진다.
        return;
      }else{
        setValidationError("");
        return;
      }
    } catch (error) {
      console.error("Failed to login:", error);
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      event.preventDefault(); // 엔터 키의 기본 동작(폼 제출)을 막음
      // 아무 동작도 하지 않음
    }
  };

  useEffect(() => {
    console.log("store.auth.member.memberId :: ", storeMemberId);
    if (storeMemberId) {
      const toId = storeMemberId;
      console.log("toId: ", toId);
    }
  }, [storeMemberId, navigate]);

  useEffect(() => {
    controls.start({
      background: [
        "linear-gradient(to right, #ffffff, #ffffff)",
        "linear-gradient(to right, #966ec1, #91a7ff)"
      ],
      transition: { duration: 0.7 }
    });
  }, [controls]);

  const handleLinkClick = async () => {
    setIsNavigating(true);
    navigate("/member/getAuthMain");
  };

  useEffect(() => {
    const preloadComponent = async () => {
      const component = await import("../GetAuthMain");
      return component;
    };
    preloadComponent();
  }, []);

  if (isNavigating) {
    return null; // 페이지 전환 시 현재 컴포넌트를 숨깁니다.
  }

  return (
    <Suspense fallback={<div>Loading...</div>}>
    <motion.div
    initial={{ background: "linear-gradient(to right, #ffffff, #ffffff)" }}
    animate={controls}
    className={styles.background}
  >
      <Container className={`${styles.container} ${styles.setting}`}>
        <Row className="justify-content-center">
          <Col xs={12} sm={10} md={8} lg={6}>
            <div className={`${styles.centeredContainer}`}><NoonLogoRmBg /></div>
            <h2 className="text-center">&nbsp;</h2>
            <Form>
              <Form.Group controlId="memberId">
                <Form.Label className={styles.formLabel}>아이디</Form.Label>
                <Form.Control
                  placeholder="아이디"
                  minLength={6}
                  maxLength={40}
                  type="text"
                  value={memberId}
                  onChange={(e) => setMemberId(e.target.value)}
                  onKeyDown={handleKeyDown}
                  required
                  className={styles.formControl}
                />
              </Form.Group>
              <Form.Group controlId="password">
                <Form.Label className={styles.formLabel}>비밀번호</Form.Label>
                <Form.Control
                  placeholder="비밀번호"
                  minLength={8}
                  maxLength={16}
                  type="password"
                  value={pwd}
                  onChange={(e) => setPassword(e.target.value)}
                  onKeyDown={handleKeyDown}
                  required
                  className={styles.formControl}
                />
              </Form.Group>
              <Button
                variant="primary"
                type="button"
                onClick={handleLoginClick}
                className={`mt-3 w-100 ${styles.btn} ${styles2.typicalButtonColor}`}
              >
                로그인
              </Button>
              {(validationError) && (
                <Alert variant="danger" className="mt-3">
                  {renderLoginError(validationError, loginError)}
                </Alert>
              )}
            </Form>
              <Button
                variant="secondary"
                className={`${styles.linkButton} me-2`}
                onClick={handleLinkClick}
              >
                메인으로..
              </Button>
          </Col>
        </Row>
      </Container>
      </motion.div>
    </Suspense>
  );
};

export default LoginForm;
