import React, { useEffect, useRef } from "react";
import { Form } from "react-bootstrap";
import { FaCheck, FaUser } from "react-icons/fa";
import { Link } from "react-router-dom";
import useReadOnlyInput from "../hook/useReadOnlyInput";
import NormalButton from "./NormalButton";

const NicknameInput = ({
  nickname,
  setNickname,
  nicknameValidationMessage,
  setNicknameValidationMessage,
  isNicknameValid,
  setIsNicknameValid,
  handleNicknameUpdateChange,
  toId,
  profile,
  setProfile,
}) => {
  const nicknameInput = useReadOnlyInput(
    profile.nickname,
    isNicknameValid,
    toId,
    profile,
    setProfile,
    "nickname"
  );
  // 새로운 키 다운 핸들러 함수

  const handleNicknameKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault(); // 폼 제출 방지
      nicknameInput.handleBlur(profile.nickname)(e);
    }
  };

  const adjustTextareaHeight = () => {
    if (nicknameInput.inputRef.current) {
      nicknameInput.inputRef.current.style.height = "auto";
      nicknameInput.inputRef.current.style.height = `${nicknameInput.inputRef.current.scrollHeight}px`;
    }
  };

  useEffect(() => {
    adjustTextareaHeight();
  }, [nickname]);

  return (
    <Form.Group controlId="formNickname" className="mb-3">
      <Form.Label
        style={{
          border: isNicknameValid && "#91a7ff",
          color: isNicknameValid && "#91a7ff",
        }}
      ></Form.Label>
      <Form.Control
        as="textarea" // input 대신 textarea로 변환
        rows={1} // 초기 행 수 설정
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
          fontSize: "12px",
          fontWeight: "bold",
          textAlign: "center",
          opacity: "1",
          margin: "0px",
          padding: "0px",
          resize: "none", // 사용자에 의한 크기 조절 비활성화
          overflow: "hidden", // 스크롤 바 숨기기
          border: "none",
        }}
        onKeyDown={handleNicknameKeyDown}
        required
        isInvalid={!!nicknameValidationMessage}
        readOnly={nicknameInput.isReadOnly}
        onClick={nicknameInput.handleClick}
        onBlur={nicknameInput.handleBlur(profile.nickname)}
        ref={nicknameInput.inputRef}
      />
      <Form.Text className="text-danger" style={{fontSize:"8px", fontWeight:"900"}}>
        {nicknameValidationMessage && nicknameValidationMessage}
      </Form.Text>
    </Form.Group>
  );
};

export default NicknameInput;
