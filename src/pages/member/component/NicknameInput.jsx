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
  mainPageUrl,
  handleKeyDown,
  handleNicknameUpdateChange,
  member,
}) => {
  const nicknameInput = useReadOnlyInput(member.nickname,isNicknameValid,member.memberId);

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
  );
};

export default NicknameInput;
