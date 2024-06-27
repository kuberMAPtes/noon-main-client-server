import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './Countdown.module.css';
import { chatroomDeleteTime } from '../pages/Chat/function/axios_api';

const Countdown = () => {
  const [timeLeft, setTimeLeft] = useState({});
  const [remainingTime, setRemainingTime] = useState(null);

  // api 서버에서 다음 스케쥴까지 남은 시간을 받아옴
  useEffect(() => {

    chatroomDeleteTime()
    .then((data)=>{
      setRemainingTime(data);
    })
  }, []);

  useEffect(() => {
    if (remainingTime === null) return;

    const calculateTimeLeft = () => {
      const difference = remainingTime;

      return {
        // 남은 시간을 day, hours, minutes, seconds 로 반환
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((difference % (1000 * 60)) / 1000),
      };
    };

    const timer = setInterval(() => {
      console.log("1초마다모하노 remaingTime 계속변하노 ", remainingTime);
      setRemainingTime(prev => {
        const newTime = prev - 1000;
        if (newTime <= 0) {
          clearInterval(timer);
          alert('Time is up! Refreshing the page...');
          window.location.reload();
        }
        return newTime;
      });
      setTimeLeft(calculateTimeLeft());
    }, 3000);

    return () => clearInterval(timer);
  }, [remainingTime]);

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
