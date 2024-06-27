import React, { useEffect, useState, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
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
  handleNicknameUpdateChange,
} from "./function/AddUpdateMemberUtil";
import styles from "../../assets/css/module/member/AddMember.module.css";
import styles2 from "../../assets/css/module/member/base.module.css";
import { useDispatch, useSelector } from "react-redux";
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
import useReadOnlyInput from "./component/hook/useReadOnlyInput";
import NormalButton from "./component/NormalButton";
import { navigateMainPage } from "../../util/mainPageUri";
import useMainPage from "./component/hook/useMainPage";

const GetMember = () => {
  // 각 필드의 상태와 유효성 메시지, 유효성 플래그 관리
  const member = useSelector((state) => state.auth.member);
  const mainPageUrl = useMainPage(member.memberId);

  const [nickname, setNickname] = useState(member.nickname);
  const [memberId, setMemberId] = useState(member.memberId);
  const [pwd, setPwd] = useState(member.pwd);

  // const [address, setAddress] = useState(member.address);

  const [nicknameValidationMessage, setNicknameValidationMessage] =
    useState("");
  const [memberIdValidationMessage, setMemberIdValidationMessage] =
    useState("");
  const [pwdValidationMessage, setPwdValidationMessage] = useState("");

  const [isNicknameValid, setIsNicknameValid] = useState(false);
  const [isMemberIdValid, setIsMemberIdValid] = useState(false);
  const [isPwdValid, setIsPwdValid] = useState(false);

  const nicknameInput = useReadOnlyInput(member.nickname);
  const idInput = useReadOnlyInput(member.memberId);

  // const [zonecode, setZonecode] = useState("");
  // const [detailedAddress, setDetailedAddress] = useState("");

  const hasNavigated = useRef(false);

  // const fullAddress = address + " " + detailedAddress;
  // const form = { nickname, memberId, pwd, fullAddress };
  const form = { nickname, memberId, pwd };
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  // useEffect(() => {
  //   if (hasNavigated.current) return;

  //   const encryptedData = Cookies.get("addMemberKey");
  //   const ivData = Cookies.get("addMemberOtherKey");

  //   if (encryptedData && ivData && Cookies.get("user-data")) {
  //     const isVerified = decryptWithLv(encryptedData, ivData);
  //     if (isVerified !== "success") {
  //       hasNavigated.current = true;
  //       alert()
  //       navigate("/member/getAuthMain");
  //     }
  //   } else {
  //     hasNavigated.current = true;
  //     navigate("/member/getAuthMain");
  //   }
  // }, [navigate]);

  const handlePwdUpdateClick = () => {
    // alert("handleClick실행 :: "+isMemberIdValid);
    //휴대폰번호로 네비게이션
    if (member.memberId) {
      sessionStorage.setItem("w", memberId); // 세션 스토리지에 memberId 저장
      navigate("/member/addPhoneNumberAuthentification/" + "updatePwd");
    }
  };

  // useEffect(() => {
  //   if (location.state && location.state.zonecode && location.state.address) {
  //     if (Object.keys(location.state.nickname).length === 0) {
  //       location.state.nickname = "";
  //     }

  //     setZonecode(location.state.zonecode);
  //     setAddress(location.state.address);
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

  const handleClick = (memberId) => {
    if (memberId) {
      navigateMainPage(memberId, navigate);
    }
  };

  return (
    <Container
      className="mt-5"
      style={{
        marginTop: "auto",
        marginRight: "auto",
        marginBottom: "20%",
        marginLeft: "auto",
      }}
    >
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
            회원정보 보기
            <FaUser />
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
                <Link to={mainPageUrl}>
                  {/* <NormalButton style={{ width: "60px", height: "30px" }} onClick={()=>handleClick(member.memberId)}> */}
                  <NormalButton style={{ width: "60px", height: "30px" }}>
                    변경
                  </NormalButton>
                </Link>
              </Form.Label>
              <Form.Control
                type="text"
                placeholder={member.nickname}
                name="nickname"
                value={nickname}
                maxLength={20}
                onChange={(e) =>
                  handleNicknameUpdateChange(
                    e,
                    member.nickname,
                    setNickname,
                    setNicknameValidationMessage,
                    setIsNicknameValid
                  )
                }
                style={{ opacity: 0.6 }}
                onKeyDown={handleKeyDown}
                required
                isInvalid={!!nicknameValidationMessage}
                readOnly={nicknameInput.isReadOnly}
                onDoubleClick={nicknameInput.handleDoubleClick}
                onBlur={nicknameInput.handleBlur(member.nickname)}
                ref={nicknameInput.inputRef}
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
                name="memberId"
                value={member.memberId}
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
                <NormalButton
                  onClick={handlePwdUpdateClick}
                  style={{ width: "60px", height: "30px" }}
                >
                  변경
                </NormalButton>
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
                disabled
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
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default GetMember;
