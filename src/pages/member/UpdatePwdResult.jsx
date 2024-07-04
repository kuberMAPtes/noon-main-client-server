import React, { useEffect } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import { Link, useNavigate, useParams } from "react-router-dom";
import "../../assets/css/module/member/base.module.css";
import {motion} from "framer-motion";
import styles from "../../assets/css/module/member/base.module.css";
import useFooterToggle from "../../components/hook/useFooterToggle";
import { useDispatch, useSelector } from "react-redux";
import { setFooterEnbaled } from "../../redux/slices/footerEnabledSlice";
const UpdatePwdResult = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setFooterEnbaled(false));
    return () => {
      dispatch(setFooterEnbaled(true));
    };
  });
  const { result } = useParams();
  const navigate = useNavigate();
  const member = useSelector((state)=>state.auth.member);

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
          {(!member || !member?.memberId) && (
              <div className="mt-4">
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: [0, 1, 0] }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                >
                  <Link to="/member/loginForm">
                    <Button className={styles.typicalButtonColor}>
                      <strong>로그인 하기</strong>
                    </Button>
                  </Link>
                </motion.div>
              </div>
          )}
          
        </Col>
      </Row>
    </Container>
  );
};

export default UpdatePwdResult;
