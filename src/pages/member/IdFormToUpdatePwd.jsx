import React, { useState } from "react";
import { Button, Container, Form } from "react-bootstrap";
import MemberIdInput from "./component/MemberIdInput";
import { handleMemberIdChangeExisted } from "./function/AddUpdateMemberUtil";
import { TbUserSearch } from "react-icons/tb";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import styles from "../../assets/css/module/member/color.module.css";
const IdFormToUpdatePwd = () => {
  const [memberId, setMemberId] = useState("");
  const [isMemberIdValid, setIsMemberIdValid] = useState(false);
  //얘는 뷰에 보여주지 않아 확인을 눌렀을때 얘의 값이 true이면 휴대폰번호로 네비게이션
  const [memberIdValidationMessage, setMemberIdValidationMessage] =
    useState("");

  const navigate = useNavigate();

  const handleClick = (e) => {
    if (isMemberIdValid) {
      //휴대폰번호로 네비게이션
      sessionStorage.setItem("w", memberId); // 세션 스토리지에 memberId 저장
      navigate("/member/addPhoneNumberAuthentification/" + "updatePwd");
    } else {
      //alert("입력하신 아이디를 찾을 수 없습니다.");
    }
  };

  return (
    <Container>
      <strong style={{ fontSize: "24px" }}>
        <TbUserSearch />
        &nbsp;&nbsp;&nbsp;비밀번호 재설정
      </strong>
      <br />
      <br />
      <br />
      <Form>
        <MemberIdInput
          isShowed={false}
          isMemberIdValid={isMemberIdValid}
          memberId={memberId}
          handleMemberIdChangeFunction={(e) =>
            handleMemberIdChangeExisted(
              e,
              setMemberId,
              setMemberIdValidationMessage,
              setIsMemberIdValid
            )
          }
          memberIdValidationMessage={memberIdValidationMessage}
          setMemberId={setMemberId}
          setMemberIdValidationMessage={setMemberIdValidationMessage}
          setIsMemberIdValid={setIsMemberIdValid}
          placeholder={"찾으시고 싶은 계정을 입력하세요"}
        />
        <Button
          variant="info"
          type="button"
          className={styles.typicalButtonColor}
          onClick={(e) => handleClick(e)}
        >
          확인
        </Button>
      </Form>
    </Container>
  );
};

export default IdFormToUpdatePwd;