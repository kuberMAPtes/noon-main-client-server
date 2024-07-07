import React, { useEffect, useState } from "react";
import { Button, Container } from "react-bootstrap";
import PwdInput from "./component/PwdInput";
import {
  handlePwdChange,
  handlePwdConfirmChange,
} from "./function/AddUpdateMemberUtil";
import { updatePwd } from "./function/memberAxios";
import { useNavigate } from "react-router-dom";
import useFooterToggle from "../../components/hook/useFooterToggle";
import { useDispatch } from "react-redux";
import { setFooterEnbaled } from "../../redux/slices/footerEnabledSlice";
import Header from "../../components/common/Header";
import { decryptWithLv } from "../../util/crypto";

const UpdatePwd = () => {
  const [pwd, setPwd] = useState("");
  const [pwdConfirm, setPwdConfirm] = useState("");
  const [isPwdValid, setIsPwdValid] = useState(false);
  const [isPwdConfirmValid, setIsPwdConfirmValid] = useState(false);
  const [pwdValidationMessage, setPwdValidationMessage] = useState("");
  const [pwdConfirmValidationMessage, setPwdConfirmValidationMessage] =
    useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setFooterEnbaled(false));
    return () => {
      dispatch(setFooterEnbaled(true));
    };
  });
  const handleClick = async () => {
    if (isPwdValid && isPwdConfirmValid) {
      let result = "fail";
      //alert("세션스토리지확인"+sessionStorage.getItem("encryptedDataUpdate"));
      const encryptedData = sessionStorage.getItem("encryptedDataUpdate")
      const ivData = sessionStorage.getItem("ivDataUpdate")
      const memberId = decryptWithLv(encryptedData,ivData);
      // console.log("memberId",memberId+"pwd"+pwd+"encryptedData"+encryptedData+"ivData"+ivData);
      // alert("encryptedDataUpdate"+encryptedData+"ivData"+ivData+"memberId"+ memberId);
      const response = await updatePwd(memberId, pwd);

      if (response) {
        sessionStorage.removeItem("encryptedDataUpdate");
        sessionStorage.removeItem("ivDataUpdate");
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
    <>
    <Header title={"비밀번호 재설정"}/>
    <Container
      className="flex-column align-items-center justify-content-center"
      style={{
        minHeight: "100vh",
        maxWidth: "600px",
        margin: "0 auto",
        paddingTop: "40px",
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
        setIsPwdConfirmValid={setIsPwdConfirmValid}
        pwdValidationMessage={pwdValidationMessage}
        setPwdValidationMessage={setPwdValidationMessage}
        pwdConfirmValidationMessage={pwdConfirmValidationMessage}
        setConfirmValidationMessage={setPwdConfirmValidationMessage}
        handlePwdChangeFunction={(e) =>
          handlePwdChange(e, setPwd, setPwdValidationMessage, setIsPwdValid, pwd,
            pwdConfirm,
            setPwdConfirmValidationMessage,
            setIsPwdConfirmValid)
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
    </>
  );
};

export default UpdatePwd;
