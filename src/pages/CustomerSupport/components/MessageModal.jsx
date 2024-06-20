import React from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap';
import '../css/customerSupport.css';

const MessageModal = ({ isOpen, toggle, message }) => {
  return (
    <Modal isOpen={isOpen} toggle={toggle}>
      <ModalHeader toggle={toggle}><p>{message.title}</p></ModalHeader>
      <ModalBody>
        <p>{message.description}</p>
      </ModalBody>
      <ModalFooter>
        <Button color="primary" onClick={toggle}>확인</Button>
      </ModalFooter>
    </Modal>
  );
};

export default MessageModal;
