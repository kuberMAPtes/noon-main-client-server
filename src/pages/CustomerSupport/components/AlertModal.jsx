import React, { useEffect, useState } from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap';
import '../css/customerSupport.css';

const AlertModal = ({ isOpen, toggle, message }) => {
  const [internalIsOpen, setInternalIsOpen] = useState(isOpen);

  useEffect(() => {
    setInternalIsOpen(isOpen);
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isOpen]);

  const handleConfirm = () => {
    console.log("???");
    setInternalIsOpen(false);
    toggle();
  };

  const handleToggle = () => {
    setInternalIsOpen(!internalIsOpen);
    toggle();
  };

  return (
    <Modal isOpen={internalIsOpen} toggle={handleToggle}>
      <ModalHeader toggle={handleToggle}><p>{message.title}</p></ModalHeader>
      <ModalBody>
        <p>{message.description}</p>
      </ModalBody>
      <ModalFooter>
        <Button color="primary" onClick={handleConfirm}>확인</Button>
      </ModalFooter>
    </Modal>
  );
};

export default AlertModal;
