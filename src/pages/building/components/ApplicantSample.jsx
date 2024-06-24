import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import WantBuildingProfile from '../components/WantBuildingProfile'

const ApplicantSample = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const applicationData = {
    buildingName: '삼오빌딩',
    roadAddr: '123 Sample Street, Sample City, Sample Country',
    longitude: 127.03642,
    latitude: 37.50124,
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div style={styles.page}>
      <h1>Sample Page</h1>
      <button style={styles.openModalButton} onClick={openModal}>
        Open Modal
      </button>
      <WantBuildingProfile
        isOpen={isModalOpen}
        onClose={closeModal}
        applicationData={applicationData}
      />
    </div>
  );
};

const styles = {
  page: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
    backgroundColor: '#f5f5f5',
  },
  openModalButton: {
    padding: '10px 20px',
    fontSize: '16px',
    cursor: 'pointer',
  },
};

export default ApplicantSample;
