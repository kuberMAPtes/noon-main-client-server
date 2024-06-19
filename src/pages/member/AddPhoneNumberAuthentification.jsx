import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import styles from '../../assets/css/module/member/AddPhoneNumberAuthentification.module.css';
import { checkAuthNumber, formatTime,handleAuthNumberChange, handleNavigate, handlePhoneNumberChange, handleSendClick } from './function/AddPhoneNumberAuthentificationUtil';
import { useNavigate, useParams } from 'react-router-dom';
import ForegroundTemplate from '../../components/common/ForegroundTemplate';
import styles2 from '../../assets/css/module/member/color.module.css';
const AddPhoneNumberAuthentification = () => {
    const [phoneNumber, setPhoneNumber] = useState('');//휴대폰번호
    const [phoneNumberValidationMessage, setPhoneNumberValidationMessage] = useState('');//번호 형식 검사 : 통과하면 "" 통과하지 못하면 메세지
    const [authNumber, setAuthNumber] = useState('');//인증번호
    const [certificationRequested, setCertificationRequested] = useState(false); // 인증번호 전송 여부 초기화만 false 그 이후 true
    const [timeLeft, setTimeLeft] = useState(0); // 타이머 3분 = 180초
    const [isPhoneNumberValid, setIsPhoneNumberValid] = useState(false);//번호 유효성 검사
    const [failCount, setFailCount] = useState(0); /// 인증번호 확인 실패 횟수
    const [isRunning, setIsRunning] = useState(false);// 타이머가 동작중인지 여부
    const [verifiedState, setIsVerified] = useState("pending"); // 인증 상태 pending,success,fail
    
    const {toUrl} = useParams();//addMember 또는 getMemberId

    //toUrl이 getMemberId면 getMemberId/memberId로 바꿔져야함. 인증하면
    const navigate = useNavigate();

    useEffect(() => {
        if (timeLeft === 0) return; // 타이머가 0이 되면 감소X
        if (!isRunning) return; // 타이머가 동작중이 아니면 감소X
        if (verifiedState === `success`) return; // 인증 성공시 감소X
        const intervalId = setInterval(() => {
        setTimeLeft(timeLeft - 1);
        }, 1000); // 1초마다 타이머를 1씩 감소시킴

        return () => clearInterval(intervalId); // 컴포넌트가 언마운트될 때 인터벌 정리
    }, [timeLeft]);

    useEffect( ()=> {
        if(authNumber.length === 4){
            checkAuthNumber(phoneNumber, authNumber, setIsVerified, setFailCount,toUrl);
        }
    },[authNumber])

    useEffect(()=> {
        if(verifiedState === "success"){
            console.log("본인인증 성공");
        }
    }, [verifiedState]);

    return (
        <ForegroundTemplate>
            <Container className="mt-5">
                <Row className="justify-content-center">
                    <Col md={6}>
                        <h2 className="mb-4">휴대폰 인증
                                <span className="inline-text" style={{fontSize:"15px"}}>(
                                {toUrl === "addMember" && "회원가입"}
                                {toUrl === "getMemberId" && "아이디 찾기"}
                                {toUrl === "updatePwd" && "비밀번호 찾기"})
                            </span>
                        </h2>                    
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
                                setPhoneNumberValidationMessage,
                                setIsPhoneNumberValid,
                                toUrl
                                )
                            }
                            className={styles.inputUnderline}
                            maxLength={13} // 하이픈 포함 최대 13자
                            disabled={verifiedState === "success"}
                            />
                            <Button
                            variant="outline-secondary"
                            onClick={() =>
                                handleSendClick(
                                phoneNumber,
                                setPhoneNumberValidationMessage,
                                setCertificationRequested,
                                setTimeLeft,
                                setIsRunning
                                )
                            }
                            disabled={!isPhoneNumberValid || verifiedState === "success"}
                            >
                            {certificationRequested ? '재전송' : '전송'}
                            </Button>
                        </div>
                        {phoneNumberValidationMessage && (
                            <Form.Text className="text-danger">
                            {phoneNumberValidationMessage}
                            </Form.Text>
                        )}
                        {isPhoneNumberValid && (
                            <Form.Text className="text-success">
                            {toUrl==="addMember" &&  "유효한 전화번호 형식입니다."}
                            {toUrl==="getMemberId" && "아이디를 찾기 위해 메세지를 보냅니다."}
                            {toUrl==="updatePwd" && "비밀번호를 찾기 위해 메세지를 보냅니다."}
                            
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
                                disabled={verifiedState === "success"}
                            />
                            {timeLeft !== 0 ? (
                                <span className="text-muted">{formatTime(timeLeft)}</span>
                            ) : (
                                <span className="text-muted">인증번호 만료</span>
                            )}
                            </div>
                        )}
                        </Form.Group>
                    </Form>
                    {(verifiedState === "success" && toUrl === "addMember") && (
                        <div>
                        <h5>본인인증 완료</h5>
                        <Button
                        variant="info"
                        type="button"
                        className={`${styles2.typicalButtonColor} ${styles2.miniFont}`}
                        onClick={()=>handleNavigate(phoneNumber,verifiedState,navigate,toUrl)}>
                            회원가입
                        </Button>
                        </div>
                    )}
                    {(verifiedState === "success" && toUrl === "getMemberId") && (
                        <div>
                        <h5>본인인증 완료</h5>
                        <Button
                        variant="info"
                        type="button"
                        className={`${styles2.typicalButtonColor} ${styles2.miniFont}`}
                        onClick={()=>handleNavigate(phoneNumber,verifiedState,navigate,toUrl)}>
                            아이디 찾기
                        </Button>
                        </div>
                    )}
                    {(verifiedState === "success" && toUrl === "updatePwd") && (
                        <div>
                        <h5>본인인증 완료</h5>
                        <Button
                        variant="info"
                        type="button"
                        className={`${styles2.typicalButtonColor} ${styles2.miniFont}`}
                        onClick={()=>handleNavigate(phoneNumber,verifiedState,navigate,toUrl)}>
                            비밀번호 재설정
                        </Button>
                        </div>
                    )}
                    {verifiedState === "fail" && (
                        <div>
                        <h6>본인인증 실패</h6>
                        <h5>실패 횟수 {failCount}</h5>
                        <span>20회 이상 실패 할 시 재전송을 하셔야합니다.</span>
                        </div>
                    )}
                    </Col>
                </Row>
            </Container>
        </ForegroundTemplate>
  );
};

export default AddPhoneNumberAuthentification;
