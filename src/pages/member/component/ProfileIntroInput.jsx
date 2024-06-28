import React from "react";
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

  return (
    <Form.Group controlId="formProfileIntro" className="mb-3">
      <Form.Label
        style={{
          border: isProfileIntroValid && "#91a7ff",
          color: isProfileIntroValid && "#91a7ff",
        }}
      ></Form.Label>
      <Form.Control
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
        }}
        onKeyDown={handleProfileIntroKeyDown}
        required
        isInvalid={!!profileIntroValidationMessage}
        readOnly={profileIntroInput.isReadOnly}
        onClick={profileIntroInput.handleClick}
        onBlur={profileIntroInput.handleBlur(profile.profileIntro)}
        ref={profileIntroInput.inputRef}
      />
      <Form.Text className="text-danger">
        {profileIntroValidationMessage && profileIntroValidationMessage}
      </Form.Text>
    </Form.Group>
  );
};

export default ProfileIntroInput;
