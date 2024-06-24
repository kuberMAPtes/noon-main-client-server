import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';

const BackButton = () => {
  const navigate = useNavigate();

  return (
    <button onClick={() => navigate(-1)} style={styles.button}>
      <FaArrowLeft style={styles.icon} />
    </button>
  );
};

const styles = {
  button: {
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    padding: '10px',
    display: 'flex',
    alignItems: 'center',
  },
  icon: {
    fontSize: '20px',
  },
};

export default BackButton;
