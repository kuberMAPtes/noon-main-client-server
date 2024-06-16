import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login } from "../../../redux/slices/authSlice";
import { validateLoginForm } from "../function/memberValidator";
import { renderLoginError } from "../function/memberFunc";
import { Form, Button, Container, Row, Col, Alert } from 'react-bootstrap';
import SignUpButton from "./SignUpButton";
import styles from '../../../assets/css/module/member/LoginForm.module.css';

const LoginForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const storeMemberId = useSelector((state) => state.auth.member.memberId);
  const loginError = useSelector((state) => state.auth.loginError);
  console.log("로그인 에러:", JSON.stringify(loginError));
  const [memberId, setMemberId] = useState("");
  const [pwd, setPassword] = useState("");
  const [validationError, setValidationError] = useState("");

  const handleLoginSubmit = async (event) => {
    event.preventDefault();
    setValidationError("");
    const loginData = { memberId, pwd, loginWay: "normal" };

    const validationMessage = validateLoginForm(memberId, pwd);
    if (validationMessage) {
      setValidationError(validationMessage);
      return;
    }

    try {
      console.log("로그인 하기 전 store.auth.member :: ", memberId);
      const { member } = await dispatch(login(loginData)).unwrap();
      console.log("멤버 :: ", member);
      console.log("로그인 한 후 store.auth.member :: ", member);
    } catch (error) {
      console.error("Failed to login:", error);
    }
  };

  useEffect(() => {
    console.log("store.auth.member.memberId :: ", storeMemberId);
    if (storeMemberId) {
      const toId = storeMemberId;
      console.log("toId: ", toId);
      const navigateUri = `/member/getMemberProfile/${toId}`;
      navigate(navigateUri);
    }
  }, [storeMemberId, navigate]);

  return (
    <Container className={`mt-5 ${styles.container}`}>
      <Row className="justify-content-center">
        <Col xs={12} sm={10} md={8} lg={6}>
          <h2 className="text-center">로그인</h2>
          <Form onSubmit={handleLoginSubmit}>
            <Form.Group controlId="memberId">
              <Form.Label>Member ID</Form.Label>
              <Form.Control
                type="text"
                value={memberId}
                onChange={(e) => setMemberId(e.target.value)}
                required
                className={styles.formControl}
              />
            </Form.Group>
            <Form.Group controlId="password">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                value={pwd}
                onChange={(e) => setPassword(e.target.value)}
                required
                className={styles.formControl}
              />
            </Form.Group>
            <Button variant="primary" type="submit" className={`mt-3 w-100 ${styles.btn}`}>
              로그인
            </Button>
            {validationError && (
              <Alert variant="danger" className="mt-3">
                {validationError}
              </Alert>
            )}
            {!validationError && loginError && (
              <Alert variant="danger" className="mt-3">
                {renderLoginError(validationError, loginError)}
              </Alert>
            )}
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default LoginForm;
