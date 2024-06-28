import React, { useState } from 'react';
import { Form } from 'react-bootstrap';
import { FaLock, FaCheck } from 'react-icons/fa';
import { handleKeyDown } from '../function/AddUpdateMemberUtil';

// PasswordInput Component
const PwdInput = ({
  pwd,
  setPwd,
  pwdConfirm,
  setPwdConfirm,
  isPwdValid,
  setIsPwdValid,
  isPwdConfirmValid,
  setIsPwdConfirmValid,
  pwdValidationMessage,
  setPwdValidationMessage,
  pwdConfirmValidationMessage,
  setPwdConfirmValidationMessage,
  handlePwdChangeFunction,
  handlePwdConfirmChangeFunction
}) => {

    const inputStyle = { opacity: 0.6, width: '100%' }; // Add width to make them same size

  return (
    <>
      <Form.Group controlId="formPwd" className="mb-3">
        <Form.Label
          style={{
            border: isPwdValid && "#91a7ff",
            color: isPwdValid && "#91a7ff",
          }}>
          <FaLock />&nbsp;비밀번호&nbsp;&nbsp;
          {isPwdValid && <FaCheck />}
        </Form.Label>
        <Form.Control
          type="password"
          placeholder="비밀번호를 입력하세요"
          name="pwd"
          maxLength={16}
          value={pwd}
          onChange={(e) => handlePwdChangeFunction(e, setPwd, setPwdValidationMessage, setIsPwdValid)}
          onKeyDown={handleKeyDown}
          required
          isInvalid={!!pwdValidationMessage}
          style={inputStyle}
        />
        {pwdValidationMessage && (
          <Form.Text className="text-danger">
            {pwdValidationMessage}
          </Form.Text>
        )}
      </Form.Group>

      <Form.Group controlId="formPwdConfirm" className="mb-3">
        <Form.Label          style={{
            border: isPwdConfirmValid && "#91a7ff",
            color: isPwdConfirmValid && "#91a7ff",
          }}><FaLock />&nbsp;비밀번호 재입력&nbsp;&nbsp;
          {isPwdConfirmValid && <FaCheck />}
          </Form.Label>
        <Form.Control
          type="password"
          placeholder="비밀번호를 다시 입력하세요"
          name="pwdConfirm"
          maxLength={16}
          value={pwdConfirm}
          onChange={(e) => handlePwdConfirmChangeFunction(e, pwd, setPwdConfirm, setPwdConfirmValidationMessage,setIsPwdConfirmValid )}
          onKeyDown={handleKeyDown}
          required
          isInvalid={!!pwdConfirmValidationMessage}
          style={inputStyle}
        />
        {pwdConfirmValidationMessage && (
          <Form.Text className="text-danger">
            {pwdConfirmValidationMessage}
          </Form.Text>
        )}
      </Form.Group>
    </>
  );
};

export default PwdInput;