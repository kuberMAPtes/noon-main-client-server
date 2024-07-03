import React, { useEffect, useState, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { decryptWithLv } from "../../util/crypto";
import Cookies from "js-cookie";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import {
  handleNicknameChange,
  handleMemberIdChange,
  handlePwdChange,
  redirectToPostcode,
  detailedAddressChangeHandler,
  addMemberSubmit,
  handleKeyDown,
} from "./function/AddUpdateMemberUtil";
import styles from "../../assets/css/module/member/AddMember.module.css";
import styles2 from "../../assets/css/module/member/base.module.css";
import { useDispatch } from "react-redux";
import BackgroundTemplate from "../../components/common/BackgroundTemplate";
import {
  FaArrowRight,
  FaCheck,
  Facheck,
  FaIdCard,
  FaLock,
  FaMapMarkerAlt,
  FaUser,
  FaUserPlus,
} from "react-icons/fa";
import useFooterToggle from "../../components/hook/useFooterToggle";
import Header from "../../components/common/Header";
import ProgressBar from "./component/ProgressBar";

const AddMember = () => {
  useFooterToggle();
  // 각 필드의 상태와 유효성 메시지, 유효성 플래그 관리
  const [nickname, setNickname] = useState("");
  const [memberId, setMemberId] = useState("");
  const [pwd, setPwd] = useState("");
  // const [address, setAddress] = useState("");

  const [nicknameValidationMessage, setNicknameValidationMessage] =
    useState("");
  const [memberIdValidationMessage, setMemberIdValidationMessage] =
    useState("");
  const [pwdValidationMessage, setPwdValidationMessage] = useState("");

  const [isNicknameValid, setIsNicknameValid] = useState(false);
  const [isMemberIdValid, setIsMemberIdValid] = useState(false);
  const [isPwdValid, setIsPwdValid] = useState(false);

  // const [zonecode, setZonecode] = useState("");
  // const [detailedAddress, setDetailedAddress] = useState("");

  const hasNavigated = useRef(false);

  // const fullAddress = address + " " + detailedAddress;
  // const form = { nickname, memberId, pwd, fullAddress };
  const form = { nickname, memberId, pwd};
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  useEffect(() => {
    // 쿠키에서 인증 정보를 읽고, 휴대폰 본인인증을 완료했는지 확인
    if (hasNavigated) return;

    const encryptedData = Cookies.get("addMemberKey");
    const ivData = Cookies.get("addMemberOtherKey");
    console.log("당신은 휴대폰인증을 했습니다 encryptedData:", encryptedData);
    console.log("당신은 휴대폰인증을 했습니다 ivData:", ivData);

    if (encryptedData && ivData && Cookies.get("user-data")) {
      const isVerified = decryptWithLv(encryptedData, ivData);
      if (isVerified !== "success") {
        //alert('본인인증을 완료해야 회원가입을 할 수 있습니다.');
        hasNavigated = true;
        navigate("/member/getAuthMain");
      }
    } else {
      //alert('본인인증을 완료해야 회원가입을 할 수 있습니다.');
      hasNavigated = true;
      navigate("/member/getAuthMain");
    }
  }, [navigate]);

  // useEffect(() => {
  //   if (location.state && location.state.zonecode && location.state.address) {
  //     if (Object.keys(location.state.nickname).length === 0) {
  //       location.state.nickname = "";
  //     }

  //      setZonecode(location.state.zonecode);
  //      setAddress(location.state.address);
  //     setMemberId(location.state.memberId);

  //     setNickname(location.state.nickname);

  //     setPwd(location.state.pwd);

  //     handleNicknameChange(
  //       { target: { value: location.state.nickname } },
  //       setNickname,
  //       setNicknameValidationMessage,
  //       setIsNicknameValid
  //     );
  //     handleMemberIdChange(
  //       { target: { value: location.state.memberId } },
  //       setMemberId,
  //       setMemberIdValidationMessage,
  //       setIsMemberIdValid
  //     );
  //     handlePwdChange(
  //       { target: { value: location.state.pwd } },
  //       setPwd,
  //       setPwdValidationMessage,
  //       setIsPwdValid
  //     );
  //   }
  // }, [location.state]);

  return (
    <>
    <Header title={"개인정보 입력"}/>
      <ProgressBar currentStep={3}/>
    <Container className="mt-2">
      <Row className="justify-content-center">
        <Col xs={12} md={8} lg={6}>
          <h1
            className="mb-4 text-center"
            style={{
              opacity: 0.8,
              border:
                isNicknameValid && isMemberIdValid && isPwdValid && "#91a7ff",
              color:
                isNicknameValid && isMemberIdValid && isPwdValid && "#91a7ff",
            }}
          >
            회원가입
            <FaUserPlus />
          </h1>

          <Form>
            <Form.Group controlId="formNickname" className="mb-3">
              <Form.Label
                style={{
                  border: isNicknameValid && "#91a7ff",
                  color: isNicknameValid && "#91a7ff",
                }}
              >
                <FaUser />
                &nbsp;닉네임&nbsp;&nbsp;
                {isNicknameValid && <FaCheck />}
              </Form.Label>
              <Form.Control
                type="text"
                placeholder="닉네임을 입력하세요"
                name="nickname"
                value={nickname}
                maxLength={20}
                onChange={(e) =>
                  handleNicknameChange(
                    e,
                    setNickname,
                    setNicknameValidationMessage,
                    setIsNicknameValid
                  )
                }
                onKeyDown={handleKeyDown}
                required
                isInvalid={!!nicknameValidationMessage}
                style={{ opacity: 0.6 }}
              />
              <Form.Text className="text-danger">
                {nicknameValidationMessage && nicknameValidationMessage}
              </Form.Text>
            </Form.Group>

            <Form.Group controlId="formMemberId" className="mb-3">
              <Form.Label
                style={{
                  border: isMemberIdValid && "#91a7ff",
                  color: isMemberIdValid && "#91a7ff",
                }}
              >
                <FaIdCard />
                &nbsp;계정&nbsp;&nbsp;
                {isMemberIdValid && <FaCheck />}
              </Form.Label>
              <Form.Control
                type="text"
                placeholder="계정을 입력하세요"
                name="memberId"
                value={memberId}
                maxLength={24}
                onChange={(e) =>
                  handleMemberIdChange(
                    e,
                    setMemberId,
                    setMemberIdValidationMessage,
                    setIsMemberIdValid
                  )
                }
                onKeyDown={handleKeyDown}
                required
                isInvalid={!!memberIdValidationMessage}
                style={{ opacity: 0.6 }}
              />
              {memberIdValidationMessage && (
                <Form.Text className="text-danger">
                  {memberIdValidationMessage}
                </Form.Text>
              )}
            </Form.Group>

            <Form.Group controlId="formPwd" className="mb-3">
              <Form.Label
                style={{
                  border: isPwdValid && "#91a7ff",
                  color: isPwdValid && "#91a7ff",
                }}
              >
                <FaLock />
                &nbsp;비밀번호&nbsp;&nbsp;
                {isPwdValid && <FaCheck />}
              </Form.Label>
              <Form.Control
                type="password"
                placeholder="비밀번호를 입력하세요"
                name="pwd"
                maxLength={16}
                value={pwd}
                onChange={(e) =>
                  handlePwdChange(
                    e,
                    setPwd,
                    setPwdValidationMessage,
                    setIsPwdValid
                  )
                }
                onKeyDown={handleKeyDown}
                required
                isInvalid={!!pwdValidationMessage}
                style={{ opacity: 0.6 }}
              />
              {pwdValidationMessage && (
                <Form.Text className="text-danger">
                  {pwdValidationMessage}
                </Form.Text>
              )}
            </Form.Group>

            {/* <Form.Group controlId="formAddress" className="mb-3">
              <Form.Label
                style={{
                  border: !!address && !!detailedAddress && "#91a7ff",
                  color: !!address && !!detailedAddress && "#91a7ff",
                }}
              >
                <FaMapMarkerAlt />
                &nbsp;주소&nbsp;&nbsp;
                {!!address && !!detailedAddress && <FaCheck />}
              </Form.Label>
              <div className={styles.addressGroup}>
                <Form.Control
                  type="text"
                  placeholder="주소를 입력하세요"
                  onKeyDown={handleKeyDown}
                  name="address"
                  value={address}
                  required
                  readOnly
                  className={styles.addressInput}
                  style={{ opacity: 0.6 }}
                />
                <Form.Control
                  className={styles.zonecodeText}
                  disabled
                  onKeyDown={handleKeyDown}
                  value={zonecode}
                  style={{ opacity: 0.6 }}
                />
              </div>
              <Form.Control
                type="text"
                placeholder="상세주소를 입력하세요"
                value={detailedAddress}
                onChange={(e) =>
                  detailedAddressChangeHandler(e, setDetailedAddress)
                }
                onKeyDown={handleKeyDown}
                style={{ opacity: 0.6 }}
              />

              <Button
                variant="info"
                type="button"
                onClick={() =>
                  redirectToPostcode(
                    memberId,
                    nickname,
                    pwd,
                    navigate,
                    location
                  )
                }
                className={`${styles2.typicalButtonColor}`}
              >
                주소 찾기
              </Button>
            </Form.Group> */}

            <Button
              variant="info"
              type="button"
              className="w-100"
              disabled={!isNicknameValid || !isMemberIdValid || !isPwdValid}
              onClick={() =>
                addMemberSubmit(form, hasNavigated, dispatch, navigate)
              }
              style={{
                opacity:
                  !isNicknameValid || !isMemberIdValid || !isPwdValid ? 0.3 : 1,
                background: "#91a7ff",
                border: "#91a7ff",
                color: "white",
              }}
            >
              회원가입
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
    </>
  );
};

export default AddMember;
