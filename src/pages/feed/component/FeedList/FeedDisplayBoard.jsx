import React from 'react';
import '../../css/FeedDisplayBoard.css';

const Marquee = ({ text }) => {
  return (
    <div className="marquee-container">
      <div className="marquee">
        {text}
      </div>
    </div>
  );
};

export default Marquee;