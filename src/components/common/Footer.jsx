import React, { useEffect, useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FaHome, FaComments, FaMap, FaSearch, FaUser } from 'react-icons/fa';
import styles from '../../assets/css/module/Footer.module.css';
import useEncryptId from '../../pages/member/component/common/useEncryptId';
import { useSelector } from 'react-redux';

const Footer = () => {

  const memberId = useSelector((state) => state.auth.member.memberId);
  const {encryptedData, ivData} = useEncryptId(memberId);
  const [secretId,setSecretId] = useState(encryptedData);
  const [secretIv,setSecretIv] = useState(ivData);

  useEffect(()=> {
    setSecretId(encryptedData);
    setSecretIv(ivData);
  }, [encryptedData, ivData,memberId]);

  // useEffect(()=>{
  //    alert(`Footer에서 가져온 secretId: ${secretId} secretIv: ${secretIv}`);
  // }, [secretId, secretIv]);

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
            <Link to="/chat/myChatroomList">
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
            <Link to="/search">
              <FaSearch size={24} />
              <div>검색</div>
            </Link>
          </Col>
          <Col>
            <Link to={`/member/getMemberProfile/${secretId}/${secretIv}`}>
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
