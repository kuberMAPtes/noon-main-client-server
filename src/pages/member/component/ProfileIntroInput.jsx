import React, { useEffect } from "react";
import { Form } from "react-bootstrap";
import { FaCheck, FaUser } from "react-icons/fa";
import { Link } from "react-router-dom";
import useReadOnlyInput from "../hook/useReadOnlyInput";

const ProfileIntroInput = ({
  profileIntro,
  setProfileIntro,
  profileIntroValidationMessage,
  setProfileIntroValidationMessage,
  isProfileIntroValid,
  setIsProfileIntroValid,
  handleProfileIntroUpdateChange,
  toId,
  profile,
  setProfile,
}) => {
  const profileIntroInput = useReadOnlyInput(
    profile.profileIntro,
    isProfileIntroValid,
    toId,
    profile,
    setProfile,
    "profileIntro"
  );

  // 새로운 키 다운 핸들러 함수
  const handleProfileIntroKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault(); // 폼 제출 방지
      profileIntroInput.handleBlur(profile.profileIntro)(e);
    }
  };

  const adjustTextareaHeight = () => {
    if (profileIntroInput.inputRef.current) {
      profileIntroInput.inputRef.current.style.height = "auto";
      profileIntroInput.inputRef.current.style.height = `${profileIntroInput.inputRef.current.scrollHeight}px`;
    }
  };

  useEffect(() => {
    adjustTextareaHeight();
  }, [profileIntro]);

  return (
    <Form.Group controlId="formProfileIntro" className="mb-3">
      <Form.Label
        style={{
          border: isProfileIntroValid && "#91a7ff",
          color: isProfileIntroValid && "#91a7ff",
        }}
      ></Form.Label>
      <Form.Control
        as="textarea" // input 대신 textarea로 변환
        rows={1} // 초기 행 수 설정
        type="text"
        placeholder={profile.profileIntro}
        name="profileIntro"
        value={profileIntro}
        maxLength={150}
        onChange={(e) =>
          handleProfileIntroUpdateChange(
            e,
            profile.profileIntro,
            setProfileIntro,
            setProfileIntroValidationMessage,
            setIsProfileIntroValid
          )
        }
        style={{
          fontSize: "13px",
          fontWeight: "bold",
          textAlign: "center",
          opacity: "1",
          resize: "none", // 사용자에 의한 크기 조절 비활성화
          overflow: "hidden", // 스크롤 바 숨기기
          border: "none",
        }}
        onKeyDown={handleProfileIntroKeyDown}
        required
        isInvalid={!!profileIntroValidationMessage}
        readOnly={profileIntroInput.isReadOnly}
        onClick={profileIntroInput.handleClick}
        onBlur={profileIntroInput.handleBlur(profile.profileIntro)}
        ref={profileIntroInput.inputRef}
      />
      <Form.Text className="text-danger" style={{fontSize:"8px", fontWeight:"900"}}>
        {profileIntroValidationMessage && profileIntroValidationMessage}
      </Form.Text>
    </Form.Group>
  );
};

export default ProfileIntroInput;
