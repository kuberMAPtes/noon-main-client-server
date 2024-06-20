import React from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import { Link, useNavigate, useParams } from "react-router-dom";
import "../../assets/css/module/member/base.module.css";
const UpdatePwdResult = () => {
  const { result } = useParams();
  const navigate = useNavigate();

  return (
    <Container
      fluid
      className="flex-column align-items-center justify-content-center text-center"
      style={{ minHeight: "100vh", padding: "20px", marginTop: "200px" }}
    >
      <Row className="justify-content-center">
        <Col xs={12} sm={8} md={6} lg={4}>
          {result === "success" && (
            <h4 className="mb-4">비밀번호 변경에 성공하셨습니다.</h4>
          )}
          {result === "fail" && (
            <h1 className="mb-4">비밀번호 변경에 실패하셨습니다.</h1>
          )}
          <Button
            variant="info"
            type="button"
            className="typicalButtonColor w-50"
            onClick={() => {
              navigate("/member/loginForm");
            }}
          >
            로그인 하러 가기
          </Button>
        </Col>
      </Row>
    </Container>
  );
};

export default UpdatePwdResult;
