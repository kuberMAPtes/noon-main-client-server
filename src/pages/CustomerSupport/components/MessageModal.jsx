import React from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap';
import { useNavigate } from 'react-router-dom';
import '../css/customerSupport.css';

const MessageModal = ({ isOpen, toggle, message }) => {
  const navigate = useNavigate();

  const handleConfirm = () => {
    toggle();
    navigate(-1); 
  };

  return (
    <Modal isOpen={isOpen} toggle={toggle}>
      <ModalHeader toggle={toggle}><p>{message.title}</p></ModalHeader>
      <ModalBody>
        <p>{message.description}</p>
      </ModalBody>
      <ModalFooter>
        <Button color="primary" onClick={handleConfirm}>확인</Button>
        <Button color="primary" onClick={toggle}>확인</Button>
      </ModalFooter>
    </Modal>
  );
};

export default MessageModal;
