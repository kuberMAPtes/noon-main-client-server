import React from 'react';
import styles from './css/ProgressBar.module.css';

const ProgressBar = ({ currentStep }) => {
  const steps = [
    { number: 1, label: '약관동의' },
    { number: 2, label: '휴대폰 인증' },
    { number: 3, label: '개인정보 입력' }
  ];

  return (
    <div className={styles.progressContainer} style={{ padding: "0px 0px 0px 0px",margin:"30px 0px 20px 0px",width:"100%" }}>
      {steps.map((step, index) => (
        <React.Fragment key={index}>
          <div className={`${styles.step} ${currentStep === step.number ? styles.active : ''} ${currentStep > step.number ? styles.completed : ''}`}>
            <div className={styles.stepNumber}>{step.number}</div>
            <div className={styles.stepLabel}>{step.label}</div>
          </div>
          {index < steps.length - 1 && (
            <div
            className={`${styles.progressLine}`}
            style={{
              backgroundColor: currentStep > step.number ? '#91a7ff' : '#e0e0e0',
            }}
            />
          )}
        </React.Fragment>
      ))}
    </div>
  );
};

export default ProgressBar;