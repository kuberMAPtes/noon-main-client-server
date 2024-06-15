import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import styles from '../../assets/css/module/member/AddPhoneNumberAuthentification.module.css';
import { sendAuthentificationNumber } from './function/memberAxios';
import { validatePhoneNumber } from './function/memberValidator';
import { checkAuthNumber, formatTime,handleAuthNumberChange, handleNavigate, handlePhoneNumberChange, handleSendClick } from './function/AddPhoneNumberAuthentificationUtil';
import { useNavigate } from 'react-router-dom';

const AddPhoneNumberAuthentification = () => {
    const [phoneNumber, setPhoneNumber] = useState('');//휴대폰번호
    const [phoneNumberError, setPhoneNumberError] = useState('');//번호 형식 검사
    const [resendDisabled, setResendDisabled] = useState(false);//전송 버튼 활성화 여부
    const [authNumber, setAuthNumber] = useState('');//인증번호
    const [certificationRequested, setCertificationRequested] = useState(false); // 인증번호 전송 여부 초기화만 false 그 이후 true
    const [timeLeft, setTimeLeft] = useState(0); // 타이머 3분 = 180초
    const [isPhoneNumberValid, setIsPhoneNumberValid] = useState(false);//번호 유효성 검사
    const [failCount, setFailCount] = useState(0); /// 인증번호 확인 실패 횟수
    const [isRunning, setIsRunning] = useState(false);// 타이머가 동작중인지 여부
    const [isVerified, setIsVerified] = useState("pending"); // 인증 상태 pending,success,fail
    
    const navigate = useNavigate();

    useEffect(() => {
        if (timeLeft === 0) return; // 타이머가 0이 되면 감소X
        if (!isRunning) return; // 타이머가 동작중이 아니면 감소X

        const intervalId = setInterval(() => {
        setTimeLeft(timeLeft - 1);
        }, 1000); // 1초마다 타이머를 1씩 감소시킴

        return () => clearInterval(intervalId); // 컴포넌트가 언마운트될 때 인터벌 정리
    }, [timeLeft]);

    useEffect( ()=> {
        if(authNumber.length === 4){
            checkAuthNumber(phoneNumber, authNumber, setIsVerified, setFailCount);
        }
    },[authNumber])

    useEffect(()=> {
        if(isVerified === "success"){
            console.log("본인인증 성공");
            setResendDisabled(true);
        }
    }, [isVerified]);

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
                        placeholder="010-1234-5678"
                        value={phoneNumber}
                        onChange={(e) =>
                            handlePhoneNumberChange(
                            e,
                            setPhoneNumber,
                            setPhoneNumberError,
                            setIsPhoneNumberValid
                            )
                        }
                        className={styles.inputUnderline}
                        maxLength={13} // 하이픈 포함 최대 13자
                        />
                        <Button
                        variant="outline-secondary"
                        onClick={() =>
                            handleSendClick(
                            phoneNumber,
                            setPhoneNumberError,
                            setCertificationRequested,
                            setTimeLeft,
                            setIsRunning
                            )
                        }
                        disabled={!isPhoneNumberValid}
                        >
                        {certificationRequested ? '재전송' : '전송'}
                        </Button>
                    </div>
                    {phoneNumberError && (
                        <Form.Text className="text-danger">
                        {phoneNumberError}
                        </Form.Text>
                    )}
                    </Form.Group>
                    <Form.Group controlId="formAuthNumber" className="mt-4">
                    <Form.Label className={styles.labelBold}>인증번호</Form.Label>
                    {certificationRequested && (
                        <div className={`d-flex ${styles.timerText}`}>
                        <input
                            type="text"
                            placeholder="1234"
                            value={authNumber}
                            onChange={(e) => handleAuthNumberChange(e, setAuthNumber)}
                            className={styles.inputUnderline}
                            maxLength={4}
                        />
                        {timeLeft !== 0 ? (
                            <span className="text-muted">{formatTime(timeLeft)}</span>
                        ) : (
                            <span className="text-muted">인증번호 만료</span>
                        )}
                        </div>
                    )}
                    <Form.Text className="text-muted">
                        인증번호가 맞지 않습니다.
                    </Form.Text>
                    </Form.Group>
                </Form>
                {isVerified === "success" && (
                    <div>
                    <h2>본인인증 완료</h2>
                    <Button variant="primary" onClick={()=>handleNavigate(navigate)}>
                        회원가입
                    </Button>
                    </div>
                )}
                {isVerified === "fail" && (
                    <div>
                    <h2>본인인증 실패</h2>
                    <h2>실패 횟수 {failCount}</h2>
                    </div>
                )}
                </Col>
            </Row>
        </Container>
  );
};

export default AddPhoneNumberAuthentification;
