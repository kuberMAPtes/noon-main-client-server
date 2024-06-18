import React from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import {
  handleNicknameChange,
  handleMemberIdChange,
  handlePwdChange,
  redirectToPostcode,
  detailedAddressChangeHandler,
  addMemberSubmit,
} from "../function/AddUpdateMemberUtil";
import styles from "../../../assets/css/module/member/AddMember.module.css";

const MemberInfoView = ({
  nickname,
  setNickname,
  nicknameValidationMessage,
  setNicknameValidationMessage,
  isNicknameValid,
  memberId,
  setMemberId,
  memberIdValidationMessage,
  setMemberIdValidationMessage,
  isMemberIdValid,
  pwd,
  setPwd,
  pwdValidationMessage,
  setPwdValidationMessage,
  isPwdValid,
  address,
  zonecode,
  detailedAddress,
  setDetailedAddress,
  navigate,
  location,
  dispatch,
}) => {
  const fullAddress = address + " " + detailedAddress;
  const form = { nickname, memberId, pwd, fullAddress };

  return (
    <Container className="mt-5">
      <Row className="justify-content-center">
        <Col xs={12} md={8} lg={6}>
          <h1 className="mb-4 text-center">회원가입</h1>

          <Form>
            <Form.Group controlId="formNickname" className="mb-3">
              <Form.Label>닉네임</Form.Label>
              <Form.Control
                type="text"
                placeholder="닉네임을 입력하세요"
                name="nickname"
                value={nickname}
                maxLength={20}
                onChange={(e) =>
                  handleNicknameChange(
                    e,
                    setNickname,
                    setNicknameValidationMessage,
                    isNicknameValid
                  )
                }
                required
                isInvalid={!!nicknameValidationMessage}
              />
              <Form.Text className="text-danger">
                {nicknameValidationMessage && nicknameValidationMessage}
              </Form.Text>
            </Form.Group>

            <Form.Group controlId="formMemberId" className="mb-3">
              <Form.Label>계정</Form.Label>
              <Form.Control
                type="text"
                placeholder="계정을 입력하세요"
                name="memberId"
                value={memberId}
                maxLength={24}
                onChange={(e) =>
                  handleMemberIdChange(
                    e,
                    setMemberId,
                    setMemberIdValidationMessage,
                    isMemberIdValid
                  )
                }
                required
                isInvalid={!!memberIdValidationMessage}
              />
              {memberIdValidationMessage && (
                <Form.Text className="text-danger">
                  {memberIdValidationMessage}
                </Form.Text>
              )}
            </Form.Group>

            <Form.Group controlId="formPwd" className="mb-3">
              <Form.Label>비밀번호</Form.Label>
              <Form.Control
                type="password"
                placeholder="비밀번호를 입력하세요"
                name="pwd"
                maxLength={16}
                value={pwd}
                onChange={(e) =>
                  handlePwdChange(e, setPwd, setPwdValidationMessage, isPwdValid)
                }
                required
                isInvalid={!!pwdValidationMessage}
              />
              {pwdValidationMessage && (
                <Form.Text className="text-danger">
                  {pwdValidationMessage}
                </Form.Text>
              )}
            </Form.Group>

            <Form.Group controlId="formAddress" className="mb-3">
              <Form.Label>주소</Form.Label>
              <div className={styles.addressGroup}>
                <Form.Control
                  type="text"
                  placeholder="주소를 입력하세요"
                  name="address"
                  value={address}
                  required
                  readOnly
                  className={styles.addressInput}
                />
                <Form.Control
                  className={styles.zonecodeText}
                  disabled
                  value={zonecode}
                />
              </div>
              <Form.Control
                type="text"
                placeholder="상세주소를 입력하세요"
                value={detailedAddress}
                onChange={(e) =>
                  detailedAddressChangeHandler(e, setDetailedAddress)
                }
              />

              <Button
                type="button"
                onClick={() =>
                  redirectToPostcode(memberId, nickname, pwd, navigate, location)
                }
              >
                주소 찾기
              </Button>
            </Form.Group>

            <Button
              variant="primary"
              type="submit"
              className="w-100"
              disabled={!isNicknameValid || !isMemberIdValid || !isPwdValid}
              onClick={() => addMemberSubmit(form, dispatch, navigate)}
            >
              회원가입
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default MemberInfoView;
