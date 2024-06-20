import React from 'react';
import '../../assets/css/BackgroundTemplate.css'

const BackgroundTemplate = ({ children }) => (
  <div className="background-wrapper">
    {children}
  </div>
);

export default BackgroundTemplate;
