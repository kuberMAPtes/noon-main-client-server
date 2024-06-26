import React from 'react';
import '../css/FeedNotFound.css';
import navigate from "../util/Navigator";
import { FcAbout } from "react-icons/fc";

const NotFoundPage = () => {
  const { backHistory } = navigate();

  return (
    <div className="not-found-container">
      <h1 className="not-found-title"><FcAbout /> 현재 피드가 존재하지 않습니다!</h1>
      <p className="not-found-message">여기에 새로운 일상을 공유해주세요 :D</p>
      <div style={{color: "#0000ff"}} onClick={() => backHistory()}>뒤로 가기</div>
    </div>
  );
};

export default NotFoundPage;