import React from 'react';

const WantBuildingProfile = () => {
  return (
    <div style={styles.popupContainer}>
      <div style={styles.popupHeader}>
        <span role="img" aria-label="notification" style={styles.icon}>🔔</span>
        <h2>건물 프로필 등록 신청</h2>
        <button style={styles.closeButton}>&times;</button>
      </div>
      <p>이 건물에서 일어나는 일을 알고 싶나요? 프로필 등록을 신청해서 피드와 채팅을 받아보세요!</p>
      <div style={styles.buildingInfo}>
        <h3>삼오빌딩</h3>
        <p>서울특별시 강남구 역삼동 751-10</p>
      </div>
      <div style={styles.requestSection}>
        <button style={styles.requestButton}>+</button>
        <span style={styles.requestCount}>1</span>
        <button style={styles.requestButton}>-</button>
      </div>
      <button style={styles.submitButton}>Y</button>
    </div>
  );
};

const styles = {
  popupContainer: {
    padding: '20px',
    borderRadius: '10px',
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
    backgroundColor: 'white',
    width: '300px',
    margin: '0 auto',
    textAlign: 'center',
  },
  popupHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '10px',
  },
  icon: {
    fontSize: '24px',
  },
  closeButton: {
    background: 'none',
    border: 'none',
    fontSize: '24px',
    cursor: 'pointer',
  },
  buildingInfo: {
    marginBottom: '10px',
  },
  requestSection: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: '10px',
  },
  requestButton: {
    background: '#f0f0f0',
    border: 'none',
    borderRadius: '50%',
    width: '30px',
    height: '30px',
    fontSize: '20px',
    cursor: 'pointer',
  },
  requestCount: {
    margin: '0 10px',
    fontSize: '20px',
  },
  submitButton: {
    background: '#007bff',
    border: 'none',
    borderRadius: '50%',
    width: '50px',
    height: '50px',
    fontSize: '20px',
    color: 'white',
    cursor: 'pointer',
  },
};

export default WantBuildingProfile;
