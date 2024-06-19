import React, { useState } from "react";
import { Button, Container } from "react-bootstrap";
import PwdInput from "./component/PwdInput";
import {
  handlePwdChange,
  handlePwdConfirmChange,
} from "./function/AddUpdateMemberUtil";
import { updatePwd } from "./function/memberAxios";
import { useNavigate } from "react-router-dom";

const UpdatePwd = () => {
  const [pwd, setPwd] = useState("");
  const [pwdConfirm, setPwdConfirm] = useState("");
  const [isPwdValid, setIsPwdValid] = useState(false);
  const [isPwdConfirmValid, setIsPwdConfirmValid] = useState(false);
  const [pwdValidationMessage, setPwdValidationMessage] = useState("");
  const [pwdConfirmValidationMessage, setPwdConfirmValidationMessage] =
    useState("");

  const navigate = useNavigate();

  const handleClick = async () => {
    if (isPwdValid && isPwdConfirmValid) {
      let result = "fail";
      //alert("세션스토리지확인"+sessionStorage.getItem("w"));
      const response = await updatePwd(sessionStorage.getItem("w"), pwd);

      if (response) {
        sessionStorage.removeItem("w");
        //alert("비밀번호 변경 성공");
        result = "success";
        navigate(`/member/updatePwdResult/${result}`);
      }

      navigate(`/member/updatePwdResult/${result}`);
    } else {
      //alert("비밀번호 변경 실패");
    }
  };

  return (
    <Container
      className="flex-column align-items-center justify-content-center"
      style={{
        minHeight: "100vh",
        maxWidth: "600px",
        margin: "0 auto",
        paddingTop: "100px",
      }}
    >
      <h2 className="mb-4">비밀번호 재설정</h2>

      <PwdInput
        pwd={pwd}
        setPwd={setPwd}
        pwdConfirm={pwdConfirm}
        setPwdConfirm={setPwdConfirm}
        isPwdValid={isPwdValid}
        setPwdValid={setIsPwdValid}
        isPwdConfirmValid={isPwdConfirmValid}
        setPwdConfirmValid={setIsPwdConfirmValid}
        pwdValidationMessage={pwdValidationMessage}
        setPwdValidationMessage={setPwdValidationMessage}
        pwdConfirmValidationMessage={pwdConfirmValidationMessage}
        setConfirmValidationMessage={setPwdConfirmValidationMessage}
        handlePwdChangeFunction={(e) =>
          handlePwdChange(e, setPwd, setPwdValidationMessage, setIsPwdValid)
        }
        handlePwdConfirmChangeFunction={(e) =>
          handlePwdConfirmChange(
            e,
            pwd,
            setPwdConfirm,
            setPwdConfirmValidationMessage,
            setIsPwdConfirmValid
          )
        }
      />
      <Button
        variant="info"
        type="button"
        className="w-100"
        disabled={!isPwdValid || !isPwdConfirmValid}
        onClick={() => handleClick()}
        style={{
          opacity: !isPwdValid || !isPwdConfirmValid ? 0.3 : 1,
          background: "#91a7ff",
          border: "#91a7ff",
          color: "white",
        }}
      >
        확인
      </Button>
    </Container>
  );
};

export default UpdatePwd;
