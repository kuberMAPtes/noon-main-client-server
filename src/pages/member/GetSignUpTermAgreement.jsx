import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Row, Col, Form, Button, Card } from 'react-bootstrap';
import { useSwipeable } from 'react-swipeable';
import { termsOfService, privacyPolicy, agePolicy, locationPolicy } from './function/terms'; // 약관 내용 파일 가져오기
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';

const GetSignUpTermAgreement = () => {
  const [agreed, setAgreed] = useState(false);
  const [currentCard, setCurrentCard] = useState(0);//현재 페이지
  const navigate = useNavigate();
  const navigateUrl = `/member/AddPhoneNumberAuthentification`

  const terms = [
    { title: '이용 약관', content: termsOfService },
    { title: '개인정보 수집 동의', content: privacyPolicy },
    { title: '만 14세 이상 확인', content: agePolicy },
    { title: '위치기반 서비스 이용 동의', content: locationPolicy }
  ];

  const handleCheckboxChange = () => {
    setAgreed(!agreed);
  };

  const handleAgree = () => {
    if (agreed) {
      navigate(navigateUrl); // 다음 단계로 이동 (회원가입의 다음 단계 페이지 경로)
    } else {
      alert('약관에 동의해야 합니다.');
    }
  };

  const handleAgreeAll = () => {
    setAgreed(true);
    navigate(navigateUrl);
  };

  const handlers = useSwipeable({
    onSwipedLeft: () => setCurrentCard((prev) => (prev < terms.length - 1 ? prev + 1 : prev)),
    onSwipedRight: () => setCurrentCard((prev) => (prev > 0 ? prev - 1 : prev)),
    preventDefaultTouchmoveEvent: true,
    trackMouse: true
  });

  return (
    <Container className="mt-3" {...handlers}>
      <Row className="justify-content-center">
        <Col md={8}>
          <Card>
            <Card.Body>
              <h1 className="mb-4">회원가입 약관 동의</h1>
              <Card>
                <Card.Body>
                  <Card.Title>{terms[currentCard].title}</Card.Title>
                  <Card.Text style={{ whiteSpace: 'pre-wrap' }}>{terms[currentCard].content}</Card.Text>
                </Card.Body>
              </Card>
              <div className="text-center mt-3">
                {currentCard > 0 && (
                  <FaArrowLeft
                    size={30}
                    className="me-3"
                    onClick={() => setCurrentCard(currentCard - 1)}
                    style={{ cursor: 'pointer' }}
                  />
                )}
                {currentCard < terms.length - 1 && (
                  <FaArrowRight
                    size={30}
                    onClick={() => setCurrentCard(currentCard + 1)}
                    style={{ cursor: 'pointer' }}
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
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default GetSignUpTermAgreement;
