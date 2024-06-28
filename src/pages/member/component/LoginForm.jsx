import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../../../redux/slices/authSlice";
import { validateLoginForm } from "../function/memberValidator";
import { renderLoginError } from "../function/memberFunc";
import { Form, Button, Container, Row, Col, Alert } from "react-bootstrap";
import SignUpButton from "./SignUpButton";
import styles from "../../../assets/css/module/member/LoginForm.module.css";
import styles2 from "../../../assets/css/module/member/base.module.css";

const LoginForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const storeMemberId = useSelector((state) => state?.auth?.member?.memberId);
  const loginError = useSelector((state) => state?.auth?.loginError);
  console.log("로그인 에러값 확인:", JSON.stringify(loginError));
  const [memberId, setMemberId] = useState("");
  const [pwd, setPassword] = useState("");
  const [validationError, setValidationError] = useState("");

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
      const resultAction = await dispatch(login({ loginData, navigate }));
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

  return (
    <Container className={`mt-5 ${styles.container}`}>
      <Row className="justify-content-center">
        <Col xs={12} sm={10} md={8} lg={6}>
          <h2 className="text-center">로그인</h2>
          <Form>
            <Form.Group controlId="memberId">
              <Form.Label>Member ID</Form.Label>
              <Form.Control
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
              <Form.Label>Password</Form.Label>
              <Form.Control
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
          <Link to="/member/getAuthMain">
            <Button
              variant="primary"
              className={`${styles2.typicalButtonColor} me-2`}
            >
              메인으로..
            </Button>
          </Link>
        </Col>
      </Row>
    </Container>
  );
};

export default LoginForm;
