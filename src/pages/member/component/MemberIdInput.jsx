import React from "react";
import { Form } from "react-bootstrap";
import { FaIdCard, FaCheck } from "react-icons/fa";

const MemberIdInput = ({
  isShowed,
  isMemberIdValid,
  memberId,
  handleMemberIdChangeFunction,
  memberIdValidationMessage,
  setMemberId,
  setMemberIdValidationMessage,
  setIsMemberIdValid,
  placeholder,
}) => {
  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      event.preventDefault(); // 엔터 키의 기본 동작(폼 제출)을 막음
      // 아무 동작도 하지 않음
    }
  };

  return (
    <Form.Group controlId="formMemberId" className="mb-3">
      <Form.Label
        style={{
          border: isMemberIdValid && isShowed ? "1px solid #91a7ff" : "none",
          color: isMemberIdValid && isShowed ? "#91a7ff" : "inherit",
        }}
      >
        <FaIdCard />
        &nbsp;계정&nbsp;&nbsp;
        {isMemberIdValid && isShowed && <FaCheck />}
      </Form.Label>
      <Form.Control
        type="text"
        placeholder={placeholder}
        name="memberId"
        value={memberId}
        maxLength={24}
        onChange={handleMemberIdChangeFunction}
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
  );
};

export default MemberIdInput;
