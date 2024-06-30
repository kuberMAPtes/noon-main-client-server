import React from 'react';
import '../css/FeedNotFound.css';
import navigate from "../util/Navigator";
import { FcAbout } from "react-icons/fc";

const NotFoundPage = () => {
  const { backHistory } = navigate();

  return (
    <div className="not-found-container">
      <h1 className='not-found-title'><FcAbout /> </h1>
      <h1 className="not-found-title">피드가 없습니다!</h1>
      <p className="not-found-message">새로운 일상을 공유해주세요 :D</p>
    </div>
  );
};

export default NotFoundPage;