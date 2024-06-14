import React, { useState } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import styles from '../../assets/css/module/member/AddPhoneNumberAuthentification.module.css';

const AddPhoneNumberAuthentification = () => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [authNumber, setAuthNumber] = useState('');
  const [timer, setTimer] = useState('03:00');
  const [resendDisabled, setResendDisabled] = useState(false);

  const handlePhoneNumberChange = (e) => {
    setPhoneNumber(e.target.value);
  };

  const handleAuthNumberChange = (e) => {
    setAuthNumber(e.target.value);
  };

  const handleSendClick = () => {
    // 여기에 전송 버튼 클릭 시 로직 추가
  };

  const handleResendClick = () => {
    // 여기에 재전송 버튼 클릭 시 로직 추가
  };

  return (
    <Container className="mt-5">
      <Row className="justify-content-center">
        <Col md={6}>
          <h2 className="mb-4">휴대폰 인증</h2>
          <Form>
            <Form.Group controlId="formPhoneNumber">
              <Form.Label className={styles.labelBold}>휴대폰 번호</Form.Label>
              <div className="d-flex">
                <input
                  type="text"
                  placeholder="010 1234 5678"
                  value={phoneNumber}
                  onChange={handlePhoneNumberChange}
                  className={styles.inputUnderline}
                />
                <Button variant="outline-secondary" onClick={handleSendClick}>
                  전송
                </Button>
              </div>
            </Form.Group>
            <Form.Group controlId="formAuthNumber" className="mt-4">
              <Form.Label className={styles.labelBold}>인증번호</Form.Label>
              <div className={`d-flex ${styles.timerText}`}>
                <input
                  type="text"
                  placeholder="1234"
                  value={authNumber}
                  onChange={handleAuthNumberChange}
                  className={styles.inputUnderline}
                />
                <span className="text-muted">{timer}</span>
              </div>
              <Form.Text className="text-muted">인증번호가 맞지 않습니다.</Form.Text>
            </Form.Group>
            <Button variant="link" onClick={handleResendClick} disabled={resendDisabled}>
              재전송
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default AddPhoneNumberAuthentification;
