import React, { useEffect, useState } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import styles from "../../assets/css/module/member/AddPhoneNumberAuthentification.module.css";
import {
  checkAuthNumber,
  formatPhoneNumber,
  formatTime,
  handleAuthNumberChange,
  handleNavigate,
  handlePhoneNumberChange,
  handleSendClick,
} from "./function/AddPhoneNumberAuthentificationUtil";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import ForegroundTemplate from "../../components/common/ForegroundTemplate";
import styles2 from "../../assets/css/module/member/base.module.css";
import useDecryptId from "./hook/useDecryptId";
import useDecrypteIdUrl from "./hook/useDecrypteIdUrl";
import useEncryptId from "./hook/useEncryptId";
import {
  checkPhoneNumber,
  checkPhoneNumberAndMemberId,
  getMemberIdByPhoneNumber,
  updatePhoneNumber,
} from "./function/memberAxios";
import { validatePhoneNumber } from "./function/memberValidator";
import { useSelector } from "react-redux";
const AddPhoneNumberAuthentification = () => {
  const [phoneNumber, setPhoneNumber] = useState(""); //휴대폰번호
  const [phoneNumberValidationMessage, setPhoneNumberValidationMessage] =
    useState(""); //번호 형식 검사 : 통과하면 "" 통과하지 못하면 메세지
  const [authNumber, setAuthNumber] = useState(""); //인증번호
  const [certificationRequested, setCertificationRequested] = useState(false); // 인증번호 전송 여부 초기화만 false 그 이후 true
  const [timeLeft, setTimeLeft] = useState(0); // 타이머 3분 = 180초
  const [isPhoneNumberValid, setIsPhoneNumberValid] = useState(false); //번호 유효성 검사
  const [failCount, setFailCount] = useState(0); /// 인증번호 확인 실패 횟수
  const [isRunning, setIsRunning] = useState(false); // 타이머가 동작중인지 여부
  const [verifiedState, setIsVerified] = useState("pending"); // 인증 상태 pending,success,fail

  const { toUrl } = useParams(); //addMember 또는 getMemberId 또는 updatePwd 또는 updatePhoneNumber
  const { toId } = useDecrypteIdUrl(); //URL파라미터에서 가져옴
  const { encryptedData, ivData } = useEncryptId(toId);
  const member = useSelector((state) => state.auth.member);

  //toUrl이 getMemberId면 getMemberId/toId로 바꿔져야함. 인증하면
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

  useEffect(() => {
    if (authNumber.length === 4) {
      checkAuthNumber(
        phoneNumber,
        authNumber,
        setIsVerified,
        setFailCount,
        toUrl
      );
    }
  }, [authNumber]);

  useEffect(() => {
    if (verifiedState === "success") {
      console.log("본인인증 성공");
    }
  }, [verifiedState]);

  const handleUpdatePhoneNumber = async (
    phoneNumber,
    toId,
    verifiedState,
    navigate,
    toUrl
  ) => {
    // alert("phoneNumber"+phoneNumber+"toId"+toId+"verifiedState"+verifiedState+"toUrl"+toUrl)
    console.log("verifiedState :: "+verifiedState + "toUrl :: "+toUrl + "toId :: "+toId);
    alert("verifiedState :: "+verifiedState + "toUrl :: "+toUrl + "toId :: "+toId);
    if (
      verifiedState === "success" &&
      toUrl === "updatePhoneNumber" &&
      toId
    ) {
      const memberId = toId;
      const response = await updatePhoneNumber({ phoneNumber, memberId });
      console.log(JSON.stringify(response));
      alert("response" + JSON.stringify(response));
      if (response === true) {
        const secretId = encryptedData;
        const secretIv = ivData;
        // alert("휴대폰 번호 등록에 성공했습니다.");
        //리로드 해야 전화번호 바뀐게 프로필에 제대로 반영이 된다.
        window.location.href = `/member/getMemberProfile/${secretId}/${secretIv}`;
      } else {
        // alert("휴대폰 번호 등록에 실패했습니다.");
      }
    }
  };

  const handlePhoneNumberChange2 = async (e) => {
    const input = e.target.value;
    const formattedPhoneNumber = formatPhoneNumber(input);
    setPhoneNumber(formattedPhoneNumber);

    if (formattedPhoneNumber.length === 13) {
      if (member) {
        const response = await checkPhoneNumber(formattedPhoneNumber);
        // const response = { info: true };

        if (!validatePhoneNumber(formattedPhoneNumber)) {
          setPhoneNumberValidationMessage("유효하지 않은 전화번호 형식입니다.");
          setIsPhoneNumberValid(false);
        } else if (response.info !== true) {
          console.log("response", response);
          // alert(response?.message);
          if(response.message === "이미 존재하는 전화번호입니다."){
            setPhoneNumberValidationMessage("이미 존재하는 전화번호입니다.");
          }else{
            const messageObject = JSON.parse(response.message);
            if (messageObject?.result?.error === "허용되지 않은 IP주소 입니다.") {
              setPhoneNumberValidationMessage("허용되지 않은 IP주소 입니다.");
            } else {
              console.log("response.message", response.message);
              setPhoneNumberValidationMessage("유효하지 않은 전화번호 입니다.");
            }
          }

          setIsPhoneNumberValid(false);
        } else {
          setPhoneNumberValidationMessage("");
          setIsPhoneNumberValid(true);
        }
      } else {
        setPhoneNumberValidationMessage(
          "휴대폰 번호를 등록하기 위해 회원가입을 진행해주세요."
        );
        setIsPhoneNumberValid(false);
      }
    } else {
      setPhoneNumberValidationMessage("");
      setIsPhoneNumberValid(false);
    }
  };

  return (
    <ForegroundTemplate>
      <Container
        className="mt-5"
        style={{ padding: "0px", margin: "0px 0px 0px 32px", width: "100%" }}
      >
        <Row
          className="justify-content-center"
          style={{ padding: "0px", width: "100%" }}
        >
          <Col md={6} style={{ padding: "0px", width: "100%" }}>
            <h2 className="mb-4">
              휴대폰 인증
              <span className="inline-text" style={{ fontSize: "15px" }}>
                {toUrl === "addMember" && "(회원가입)"}
                {toUrl === "getMemberId" && "(아이디 찾기)"}
                {toUrl === "updatePwd" && "(비밀번호 찾기)"}
                {toUrl === "updatePhoneNumber" && "(휴대폰 번호 등록 및 변경)"}
              </span>
            </h2>
            <Form style={{ width: "100%" }}>
              <Form.Group controlId="formPhoneNumber" style={{ width: "80%" }}>
                <Form.Label
                  className={styles.labelBold}
                  style={{ width: "80%" }}
                >
                  휴대폰 번호
                </Form.Label>
                <div className="d-flex" style={{ width: "100%" }}>
                  <input
                    type="text"
                    placeholder="010-1234-5678"
                    value={phoneNumber}
                    onChange={
                      toUrl !== "updatePhoneNumber"
                        ? (e) =>
                            handlePhoneNumberChange(
                              e,
                              setPhoneNumber,
                              setPhoneNumberValidationMessage,
                              setIsPhoneNumberValid,
                              toUrl
                            )
                        : handlePhoneNumberChange2
                    }
                    className={styles.inputUnderline}
                    maxLength={13} // 하이픈 포함 최대 13자
                    disabled={verifiedState === "success"}
                  />
                  &emsp;&emsp;&emsp;
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
                    style={{ width: "30%" }}
                    disabled={
                      !isPhoneNumberValid || verifiedState === "success"
                    }
                  >
                    {certificationRequested ? "재전송" : "전송"}
                  </Button>
                </div>
                {phoneNumberValidationMessage && (
                  <Form.Text className="text-danger">
                    {phoneNumberValidationMessage}
                  </Form.Text>
                )}
                {isPhoneNumberValid && (
                  <Form.Text className="text-success">
                    {toUrl === "addMember" &&
                      "회원가입을 하기 위해 메세지를 보냅니다."}
                    {toUrl === "getMemberId" &&
                      "아이디를 찾기 위해 메세지를 보냅니다."}
                    {toUrl === "updatePwd" &&
                      "비밀번호를 찾기 위해 메세지를 보냅니다."}
                    {toUrl === "updatePhoneNumber" &&
                      "휴대폰 번호를 등록하기 위해 메세지를 보냅니다."}
                  </Form.Text>
                )}
              </Form.Group>
              <Form.Group controlId="formAuthNumber" className="mt-4">
                <Form.Label className={styles.labelBold}>인증번호</Form.Label>
                {certificationRequested && (
                  <div
                    className={`d-flex ${styles.timerText}`}
                    style={{ width: "80%" }}
                  >
                    <input
                      style={{ width: "80%" }}
                      type="text"
                      placeholder="1234"
                      value={authNumber}
                      onChange={(e) => handleAuthNumberChange(e, setAuthNumber)}
                      className={styles.inputUnderline}
                      maxLength={4}
                      disabled={verifiedState === "success"}
                    />
                    &emsp;&emsp;
                    {timeLeft !== 0 ? (
                      <span className="text-muted">{formatTime(timeLeft)}</span>
                    ) : (
                      <span className="text-muted" style={{ width: "35%" }}>
                        인증번호 만료
                      </span>
                    )}
                  </div>
                )}
              </Form.Group>
            </Form>
            {verifiedState === "success" && toUrl === "addMember" && (
              <div>
                <h5>본인인증 완료</h5>
                <Button
                  variant="info"
                  type="button"
                  className={`${styles2.typicalButtonColor} ${styles2.miniFont}`}
                  onClick={() =>
                    handleNavigate(phoneNumber, verifiedState, navigate, toUrl)
                  }
                >
                  회원가입
                </Button>
              </div>
            )}
            {verifiedState === "success" && toUrl === "getMemberId" && (
              <div>
                <h5>본인인증 완료</h5>
                <Button
                  variant="info"
                  type="button"
                  className={`${styles2.typicalButtonColor} ${styles2.miniFont}`}
                  onClick={() =>
                    handleNavigate(phoneNumber, verifiedState, navigate, toUrl)
                  }
                >
                  아이디 찾기
                </Button>
              </div>
            )}
            {verifiedState === "success" && toUrl === "updatePwd" && (
              <div>
                <h5>본인인증 완료</h5>
                <Button
                  variant="info"
                  type="button"
                  className={`${styles2.typicalButtonColor} ${styles2.miniFont}`}
                  onClick={() =>
                    handleNavigate(phoneNumber, verifiedState, navigate, toUrl)
                  }
                >
                  비밀번호 재설정
                </Button>
              </div>
            )}
            {verifiedState === "success" && toUrl === "updatePhoneNumber" && (
              <div>
                <h5>본인인증 완료</h5>
                <Button
                  variant="info"
                  type="button"
                  className={`${styles2.typicalButtonColor} ${styles2.miniFont}`}
                  onClick={() =>
                    handleUpdatePhoneNumber(
                      phoneNumber,
                      toId,
                      verifiedState,
                      navigate,
                      toUrl
                    )
                  }
                >
                  전화번호 등록 및 변경하기
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
