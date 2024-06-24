import React, { useState, useEffect } from 'react';
import styles from './Countdown.module.css';

const Countdown = () => {
const targetDate = new Date('2024-12-31T23:59:59'); // 타겟 날짜와 시간을 설정합니다.
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  function calculateTimeLeft() {
    const now = new Date();
    const difference = targetDate - now;

    return {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
      minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
      seconds: Math.floor((difference % (1000 * 60)) / 1000),
    };
  }

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  return (
    <div className={styles.countdownContainer}>
      <div className={styles.countdown}>
        <div>
          <span>{String(timeLeft.days).padStart(2, '0')}</span>
          <span>Days</span>
        </div>
        <div>
          <span>{String(timeLeft.hours).padStart(2, '0')}</span>
          <span>Hours</span>
        </div>
        <div>
          <span>{String(timeLeft.minutes).padStart(2, '0')}</span>
          <span>Minutes</span>
        </div>
        <div>
          <span>{String(timeLeft.seconds).padStart(2, '0')}</span>
          <span>Seconds</span>
        </div>
      </div>
    </div>
  );
};

export default Countdown;
