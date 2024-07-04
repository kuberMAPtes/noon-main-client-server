import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';

const Header = ({ title,setIsSafeNavigation }) => {
  const navigate = useNavigate();
  const goBack = () => {
    
    if (typeof setIsSafeNavigation === 'function') {
      setIsSafeNavigation(true);
    }

    navigate(-1);
  };

  return (
    <div style={styles.header}>
      <div style={styles.backButton} className="back-button" onClick={goBack}>
        <i className="fa fa-chevron-left"></i>
      </div>
      <div style={styles.title}>
       { title }
      </div>
      <div>
        <img src={`${process.env.PUBLIC_URL}/image/noon-mini-logo-removebg.png`} alt="NOON" style={styles.icon} />
      </div>
    </div>
  );
};

const styles = {
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '10px 20px',
    backgroundColor: '#f8f9fa',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)'
  },
  backButton: {
    marginLeft: '10px',
    fontSize: '20px',
    cursor: 'pointer',
    color: '#9BAAF8'
  },
  title: {
    marginLeft: '20px',
    display: 'flex',
    alignItems: 'center',
    fontSize: '15px',
    color: '#6c757d'
  },
  icon: {
    marginRight: '0px',
    width: '75px',
    height: '50px'
  }
};

export default Header;
