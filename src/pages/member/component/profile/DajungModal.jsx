import React from 'react';
import { Button, Modal } from 'react-bootstrap';

const DajungModal = ({ show, handleClose, handleYes }) => (
  <Modal show={show} onHide={handleClose}>
    <Modal.Header closeButton>
      <Modal.Title>다정온도 상승</Modal.Title>
    </Modal.Header>
    <Modal.Body>이 회원의 다정온도를 올리시는 거죠?</Modal.Body>
    <Modal.Footer>
      <Button variant="secondary" onClick={handleClose}>
        아니오
      </Button>
      <Button variant="primary" onClick={handleYes}>
        예
      </Button>
    </Modal.Footer>
  </Modal>
);

export default DajungModal;
