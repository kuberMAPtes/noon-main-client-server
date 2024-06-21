// UpdateUnlockTimeModal.js
import React, { useState } from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button, Input, Label } from 'reactstrap';
import '../css/customerSupport.css'

const UpdateUnlockTimeModal = ({ isOpen, toggle, onSubmit }) => {


  const [unlockDuration, setUnlockDuration] = useState('ONE_DAY');

  const handleDurationChange = (e) => {
    setUnlockDuration(e.target.value);
  };

  const handleSubmit = () => {
    onSubmit(unlockDuration);
    toggle(); // 모달 닫기
  };

  

  return (
    <Modal isOpen={isOpen} toggle={toggle}>
      <ModalHeader toggle={toggle}>계정 잠금일수 연장</ModalHeader>
      <ModalBody>
        <Label for="unlockDuration">작성자의 잠금 연장 기간을 선택하세요:</Label>
        <Input
          type="select"
          name="unlockDuration"
          id="unlockDuration"
          value={unlockDuration}
          onChange={handleDurationChange}
          className="custom-dropdown"
        >
          <option value="ONE_DAY">1일</option>
          <option value="THREE_DAYS">3일</option>
          <option value="SEVEN_DAYS">7일</option>
          <option value="THIRTY_DAYS">30일</option>
          <option value="ONE_HUNDRED_EIGHTY_DAYS">180일</option>
          <option value="THREE_HUNDRED_SIXTY_FIVE_DAYS">365일</option>
          <option value="PERMANENT">영구</option>
        </Input>
      </ModalBody>
      <ModalFooter>
        <Button color="primary" onClick={handleSubmit}>확인</Button>
        <Button color="secondary" onClick={toggle}>취소</Button>
      </ModalFooter>
    </Modal>
  );
};

export default UpdateUnlockTimeModal;
