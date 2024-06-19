import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FaHome, FaComments, FaMap, FaSearch, FaUser } from 'react-icons/fa';
import styles from '../../assets/css/module/Footer.module.css';

const Footer = () => {
  return (
    <footer className="bg-light fixed-bottom">
      <Container>
        <Row className={`text-center ${styles['row-no-link-style']}`}>
          <Col>
            <Link to="/feed/main">
              <FaHome size={24} />
              <div>홈</div>
            </Link>
          </Col>
          <Col>
            <Link to="/Footer2">
              <FaComments size={24} />
              <div>채팅</div>
            </Link>
          </Col>
          <Col>
            <Link to="/map">
              <FaMap size={24} />
              <div>지도</div>
            </Link>
          </Col>
          <Col>
            <Link to="/Footer4">
              <FaSearch size={24} />
              <div>검색</div>
            </Link>
          </Col>
          <Col>
            <Link to="/member/getMemberProfile">
              <FaUser size={24} />
              <div>프로필</div>
            </Link>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
