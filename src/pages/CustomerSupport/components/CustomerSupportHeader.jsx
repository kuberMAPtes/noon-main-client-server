import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/Header.css';

const CustomerSupportHeader = ({ title }) => {

  const navigate = useNavigate();

    const goBack = () => {
        navigate(-1);
    };

    return (
        <div className="header">
            <button className="back-button" onClick={goBack}>
              🔙
            </button>
            <div className="header-title">
                {title}
            </div>
        </div>
    );

};

export default CustomerSupportHeader;
