import React from 'react';
import { Modal, Spinner } from 'react-bootstrap';

const LoadingModal = ({ show }) => {
  

  return (
    <Modal show={show} centered backdrop="static" keyboard={false}>
      <Modal.Body style={styles.modalContent} className="d-flex flex-column justify-content-center align-items-center">
        <Spinner animation="grow" variant="primary" style={styles.spinner} />
        <span style={styles.loadingText}>처리중...</span>
      </Modal.Body>
    </Modal>
  );
};


const styles = {
    modalContent: {
      backgroundColor: 'rgba(0, 0, 0, 0.75)',
      border: 'none',
      borderRadius: '10px',
      color: '#fff',
      textAlign: 'center',
    },
    spinner: {
      marginBottom: '15px',
    },
    loadingText: {
      fontSize: '1.2em',
      color: '#9BAAF8',
    },
  };

export default LoadingModal;
