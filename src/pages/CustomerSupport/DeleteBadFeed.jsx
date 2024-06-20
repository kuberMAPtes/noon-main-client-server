import React, { useState } from 'react';

const DeleteBadFeed = ({ userId }) => {
  const [lockDays, setLockDays] = useState('1일');

  const handleLockDaysChange = (e) => {
    setLockDays(e.target.value);
  };

  const handleConfirm = () => {
    console.log(`${userId}에 대한 계정 잠금일수 연장: ${lockDays}`);
    // 계정 잠금일수 연장 로직 추가
  };

  return (
    <div style={styles.overlay}>
      <div style={styles.dialog}>
        <p>{`${userId}에 대한 계정 잠금일수 연장`}</p>
        <h3>계정 잠금일수 연장</h3>
        <select value={lockDays} onChange={handleLockDaysChange} style={styles.select}>
          <option>1일</option>
          <option>3일</option>
          <option>7일</option>
          <option>30일</option>
        </select>
        <button onClick={handleConfirm} style={styles.button}>확인</button>
      </div>
    </div>
  );
};

const styles = {
  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  dialog: {
    backgroundColor: '#666',
    padding: '20px',
    borderRadius: '10px',
    textAlign: 'center',
    color: '#fff',
  },
  select: {
    width: '100%',
    padding: '10px',
    margin: '10px 0',
    borderRadius: '5px',
    border: '1px solid #fff',
    backgroundColor: '#444',
    color: '#fff',
  },
  button: {
    backgroundColor: '#444',
    border: 'none',
    color: '#fff',
    padding: '10px 20px',
    borderRadius: '5px',
    cursor: 'pointer',
  },
};

export default DeleteBadFeed;
