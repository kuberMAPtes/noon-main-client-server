import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Row, Col, Form, Button, Card } from "react-bootstrap";
import { useSwipeable } from "react-swipeable";
import {
  termsOfService,
  privacyPolicy,
  agePolicy,
  locationPolicy,
} from "./function/terms"; // 약관 내용 파일 가져오기
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import styles from "../../assets/css/module/member/GetSignUpTermAgreement.module.css";
import ForegroundTemplate from "../../components/common/ForegroundTemplate";
import useFooterToggle from "../../components/hook/useFooterToggle";
import { useDispatch } from "react-redux";
import { setFooterEnbaled } from "../../redux/slices/footerEnabledSlice";
import Header from "../../components/common/Header";
import { TbArrowBigRight } from "react-icons/tb";
import NormalButtonTwo from "./component/NormalButtonTwo";
import NormalButton from "./component/NormalButton";
import { IoDocumentText } from "react-icons/io5";
const GetSignUpTermAgreement = () => {
  useFooterToggle();
  const [agreed, setAgreed] = useState(false);
  const [currentCard, setCurrentCard] = useState(0); //현재 페이지
  const navigate = useNavigate();
  const navigateUrl = `/member/AddPhoneNumberAuthentification/addMember`;
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setFooterEnbaled(false));
    return () => {
      dispatch(setFooterEnbaled(true));
    };
  });

  const terms = [
    { title: "이용 약관", content: termsOfService },
    { title: "개인정보 수집 동의", content: privacyPolicy },
    { title: "만 14세 이상 확인", content: agePolicy },
    { title: "위치기반 서비스 이용 동의", content: locationPolicy },
  ];

  const handleCheckboxChange = () => {
    setAgreed(!agreed);
  };

  const handleAgree = () => {
    if (agreed) {
      navigate(navigateUrl); // 다음 단계로 이동 (회원가입의 다음 단계 페이지 경로)
    } else {
      //alert('약관에 동의해야 합니다.');
    }
  };

  const handlers = useSwipeable({
    onSwipedLeft: () => {
      setCurrentCard((prev) => (prev < terms.length - 1 ? prev + 1 : prev));
    },
    onSwipedRight: () => {
      setCurrentCard((prev) => (prev > 0 ? prev - 1 : prev));
    },
    preventDefaultTouchmoveEvent: true,
    trackMouse: true,
  });

  return (
    <>
      <Header />
      <ForegroundTemplate>
        <Container
          className={styles["fullscreen-container"]}
          {...handlers}
          style={{ width: "100%", margin: "60px 0px 0px 0px", padding: "0px" }}
        >
          <Row className="justify-content-center" style={{margin:"0px", padding:"0px"}}>
            <Col md={8} style={{padding: "0px"}}>
              <Card style={{ position: "relative" }}>
                <Card.Body style={{ padding: "30px 0px 80px 0px",margin:"10px 0px 10px 0px" }}>
                  <h1 className="mb-4" style={{display:"inline-block",margin:"0px 15px 0px 15px"}}><IoDocumentText />회원가입 약관 동의</h1>

                  <Card style={{margin: "0px 15px 0px 15px"}}>
                    <Card.Body>
                      <Card.Title>{terms[currentCard].title}</Card.Title>
                      <Card.Text style={{ whiteSpace: "pre-wrap" }}>
                        {terms[currentCard].content}
                      </Card.Text>
                    </Card.Body>
                  </Card>
                  <div className="text-center mt-3">
                    {currentCard > 0 && (
                      <FaArrowLeft
                        size={30}
                        className="me-3"
                        onClick={() => setCurrentCard(currentCard - 1)}
                        style={{ cursor: "pointer" }}
                      />
                    )}
                    {currentCard < terms.length - 1 && (
                      <TbArrowBigRight
                        size={30}
                        onClick={() => setCurrentCard(currentCard + 1)}
                        style={{ cursor: "pointer" }}
                      />
                    )}
                    <div className="mt-2">
                      {currentCard + 1} / {terms.length}
                    </div>
                  </div>
                  {currentCard === terms.length - 1 && (
                    <Form className="mt-4">
                      <Form.Check
                        type="checkbox"
                        id="agree"
                        label="모든 약관에 동의합니다."
                        checked={agreed}
                        onChange={handleCheckboxChange}
                      />
                      <Button
                        variant="primary"
                        className="mt-3"
                        onClick={handleAgree}
                        disabled={!agreed}
                      >
                        동의하고 계속하기
                      </Button>
                    </Form>
                  )}
                  {currentCard === 0 && (
                    <Form className="mt-4">
                      <Form.Check
                        type="checkbox"
                        id="agree"
                        label="모든 약관에 동의합니다."
                        checked={agreed}
                        style={{display:"inline-block",margin:"0px 15px 0px 15px"}}
                        onChange={handleCheckboxChange}
                      />
                      <br/>
                      <br/>
                      <NormalButton
                        className="mt-3"
                        onClick={handleAgree}
                        disabled={!agreed}
                        style={{display:"inline-block",margin:"0px 15px 0px 15px",padding:"",opacity: agreed ? "1" : "0.6"}}
                      >
                        동의하고 계속하기
                      </NormalButton>
                    </Form>
                  )}
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </ForegroundTemplate>
    </>
  );
};

export default GetSignUpTermAgreement;
