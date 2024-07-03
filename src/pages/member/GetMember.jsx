import React, { useEffect, useState, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
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
import { useDispatch, useSelector } from "react-redux";
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
import useReadOnlyInput from "./hook/useReadOnlyInput";
import NormalButton from "./component/NormalButton";
import { navigateMainPage } from "../../util/mainPageUri";
import useMainPage from "./hook/useMainPage";
import Header from "../../components/common/Header";

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

  const hasNavigated = useRef(false);

  const form = { nickname, memberId, pwd };
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  const handlePwdUpdateClick = () => {
    // alert("handleClick실행 :: "+isMemberIdValid);
    //휴대폰번호로 네비게이션
    if (member.memberId) {
      sessionStorage.setItem("w", memberId); // 세션 스토리지에 memberId 저장
      navigate("/member/addPhoneNumberAuthentification/" + "updatePwd");
    }
  };

  const handleClick = (memberId) => {
    if (memberId) {
      navigateMainPage(memberId, navigate);
    }
  };
  const handlePwdNoUpdateClick = (e) => {
    e.preventDefault();
  }

  return (
    <>
    <Header title={"개인정보 보기"}/>
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
                  {/* <NormalButton style={{ width: "60px", height: "30px" }}>
                    변경
                  </NormalButton> */}
                </Link>
              </Form.Label>
              <Form.Control
                type="text"
                placeholder={member.nickname}
                name="nickname"
                value={nickname}
                maxLength={20}
                readOnly
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
                readOnly
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
                {!member.phoneNumber.includes('X') ?
                
                <NormalButton
                  onClick={handlePwdUpdateClick}
                  style={{ width: "90px", height: "30px" }}
                >
                  재설정
                </NormalButton> : <NormalButton onClick={handlePwdNoUpdateClick}>전화번호 미등록</NormalButton>}


              </Form.Label>
              <Form.Control
                type="password"
                placeholder="비밀번호를 입력하세요"
                name="pwd"
                maxLength={16}
                value={pwd}
                required
                readOnly
              />
              {pwdValidationMessage && (
                <Form.Text className="text-danger">
                  {pwdValidationMessage}
                </Form.Text>
              )}
              <Form.Text>
                비밀번호는 회원님의 개인정보 보호를 위해<br/> 확인하실 수 없고, 재설정만 가능합니다.
              </Form.Text>
            </Form.Group>
            <Form.Group>
            <Form.Label
                style={{
                  border: isPwdValid && "#91a7ff",
                  color: isPwdValid && "#91a7ff",
                }}
              >
                <FaLock />
                &nbsp;전화번호&nbsp;&nbsp;
              </Form.Label>
              <Form.Control
                type="text"
                placeholder="전화번호"
                name="pwd"
                maxLength={16}
                value={member.phoneNumber.includes('X')
                  ? "회원프로필에서 전화번호를 등록하세요"
                  : member.phoneNumber}
                required
                readOnly
              />
            </Form.Group>
          </Form>
        </Col>
      </Row>
    </Container>
  </>
  );
};

export default GetMember;
