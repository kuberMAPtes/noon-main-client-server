import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './Countdown.module.css';
import { chatroomDeleteTime } from '../pages/Chat/function/axios_api';

const Countdown = () => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });
  const [remainingTime, setRemainingTime] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

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
        // days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((difference % (1000 * 60)) / 1000),
      };
    };

    // 1초마다 남은시간에서 1초를 빼며 remaingTime 을 갱신 (시간이 지나면 timer 를 초기화)
    const timer = setInterval(() => {
      setRemainingTime(prev => {
        const newTime = prev - 1000;
        if (newTime <= 0) {
          clearInterval(timer); // 인터벌 중지
          alert('Time is up! Refreshing the page...');
          window.location.reload();
        }
        return newTime;
      });
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, [remainingTime]);

  return (
    <div className={styles.countdownContainer}>
      <h1 className={styles.title}>그룹채팅방 남은 폭파시간까지..</h1>
      <div className={styles.countdown}>
        {/* <div>
          <span>{String(timeLeft.days).padStart(2, '0')}</span>
          <span>Days</span>
        </div> */}
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
