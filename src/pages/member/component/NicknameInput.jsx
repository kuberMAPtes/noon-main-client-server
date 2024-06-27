import React from "react";
import { Form } from "react-bootstrap";
import { FaCheck, FaUser } from "react-icons/fa";
import { Link } from "react-router-dom";
import useReadOnlyInput from "./common/useReadOnlyInput";
import NormalButton from "./NormalButton";

const NicknameInput = ({
  nickname,
  setNickname,
  nicknameValidationMessage,
  setNicknameValidationMessage,
  isNicknameValid,
  setIsNicknameValid,
  handleKeyDown,
  handleNicknameUpdateChange,
  toId,
  profile,
  setProfile,
}) => {
  const nicknameInput = useReadOnlyInput(profile.nickname,isNicknameValid,toId,profile,setProfile);
  // 새로운 키 다운 핸들러 함수

  const handleNicknameKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault(); // 폼 제출 방지
      nicknameInput.handleBlur(profile.nickname)();
    }
    // 기존의 handleKeyDown 함수가 있다면 여기서 호출
    if (handleKeyDown) {
      handleKeyDown(e);
    }
  };

  return (
    <Form.Group controlId="formNickname" className="mb-3">
      <Form.Label
        style={{
          border: isNicknameValid && "#91a7ff",
          color: isNicknameValid && "#91a7ff",
        }}
      >

      </Form.Label>
      <Form.Control
        type="text"
        placeholder={profile.nickname}
        name="nickname"
        value={nickname}
        maxLength={20}
        onChange={(e) =>
          handleNicknameUpdateChange(
            e,
            profile.nickname,
            setNickname,
            setNicknameValidationMessage,
            setIsNicknameValid
          )
        }
        style={{
          fontSize: "13px",
          fontWeight: "bold",
          textAlign: "center",
          opacity: "0.6"
        }}
        onKeyDown={handleNicknameKeyDown}
        required
        isInvalid={!!nicknameValidationMessage}
        readOnly={nicknameInput.isReadOnly}
        onClick={nicknameInput.handleClick}
        onBlur={nicknameInput.handleBlur(profile.nickname)}
        ref={nicknameInput.inputRef}
      />
      <Form.Text className="text-danger">
        {nicknameValidationMessage && nicknameValidationMessage}
      </Form.Text>
    </Form.Group>
  );
};

export default NicknameInput;
