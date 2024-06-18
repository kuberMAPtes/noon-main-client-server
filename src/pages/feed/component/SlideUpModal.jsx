import React from 'react';
import '../css/SlideUpModal.css';

const SlideUpModal = ({ show, handleClose, children }) => {
    return (
        <div className={`slide-up-modal ${show ? 'show' : ''}`}>
            <div className="slide-up-content">
                <span className="close" onClick={handleClose}>&times;</span>
                {children}
            </div>
        </div>
    );
};

export default SlideUpModal;