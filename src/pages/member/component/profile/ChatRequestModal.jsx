import React, { useState } from 'react';
import { Button, Modal, Form } from 'react-bootstrap';

const ChatRequestModal = ({ show, handleClose, handleSubmit, fromId, toId }) => {
  const [applyMessage, setApplyMessage] = useState('');

  const onSubmit = () => {
    handleSubmit(fromId, toId, applyMessage);
    setApplyMessage(''); // 제출 후 입력 필드 초기화
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>채팅 신청</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form.Group>
          <Form.Label>신청 메시지</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            value={applyMessage}
            onChange={(e) => setApplyMessage(e.target.value)}
            placeholder="채팅 신청 메시지를 입력해주세요."
          />
        </Form.Group>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          취소
        </Button>
        <Button variant="primary" onClick={onSubmit}>
          신청하기
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ChatRequestModal;