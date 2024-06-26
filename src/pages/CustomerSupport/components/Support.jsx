import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import ClickableCard from "./ClickableCard"
import { Link } from 'react-router-dom';
import BuildingChart from './BuildingChart';
import useMainPage from '../../member/component/common/useMainPage';
import {
  Row,
  Col,
  Container,
  Card
} from "reactstrap";

const Support = ({ isAdmin }) => {


  const memberId = useSelector((state) => state.auth.member.memberId);
  const mainPageUrl = useMainPage(memberId);

  const member = useSelector((state) => state.auth.member);
  const [role, setRole] = useState("MEMBER");
  const [activeCard, setActiveCard] = useState(null);

  useEffect(() => {
    setRole(member.memberRole);
    console.log('현재 회원의 역할은: ' + member.memberRole);
  }, [member.memberRole]);

  const handleCardClick = (path) => {
    setActiveCard(path);
  };

  return (
    <Container className="support-container" style={{ width:'100%', marginTop: '30px', height: '50vh' }}>


      <Row>
          <BuildingChart/>
      </Row>

        {role === "ADMIN" ? (
          <>

          <Row style={{ width: "100%", justifyContent: "center", textAlign: "center" , margin: '0 auto' }}>
          <Col >
              <ClickableCard
                path="./getNoticeList"
                iconClass="nc-icon nc-vector text-danger"
                category="공지 관리"
                title={<i className="fas fa-bell"></i>}
                onClick={handleCardClick}
                active={activeCard === "./getNoticeList"}
              />
            </Col>
            <Col>
              <ClickableCard
                path="./getReportList"
                iconClass="nc-icon nc-favourite-28 text-primary"
                category="신고 관리"
                title={<i className="fa-solid fa-ban"></i>}
                onClick={handleCardClick}
                active={activeCard === "./getReportList"}
              />
            </Col>
          </Row>

          <Row style={{ width: "100%", justifyContent: "center", textAlign: "center" , margin: '0 auto' }}>
          <Col >

            <ClickableCard
              path="./listImages"
              iconClass="nc-icon nc-favourite-28 text-primary"
              category="이미지 관리"
              title={<i className="fas fa-exclamation-triangle"></i>}
              onClick={handleCardClick}
              active={activeCard === "./listImages"}
            />
            </Col>
            <Col >


            <Link to={mainPageUrl}>
              <ClickableCard
                path="./listImages"
                iconClass="nc-icon nc-favourite-28 text-primary"
                category="프로필"
                title={<i class="fa-solid fa-user"></i>}
                onClick={handleCardClick}
                active={activeCard === "./listImages"}
              />
            </Link>
            </Col>
            </Row>

 
          </>
        ) : (
          <>
            <Row style={{ width: "100%", justifyContent: "center", textAlign: "center" , margin: '0 auto'  }}>
              <Col>
              <ClickableCard
                  path="./getNoticeList"
                  iconClass="nc-icon nc-globe text-warning"
                  category="공지사항 목록"
                  title={<i className="fas fa-bell"></i>}
                  onClick={handleCardClick}
                  active={activeCard === "./getNoticeList"}
                />
              </Col>
              <Col>
                <ClickableCard
                  path="./getChatbot"
                  iconClass="nc-icon nc-money-coins text-success"
                  category="NOON 챗봇"
                  title={<i className="fa-solid fa-headset"></i>}
                  onClick={handleCardClick}
                  active={activeCard === "./getChatbot"}
                />
              </Col>
            </Row>
          </>
        )}
      
    </Container>
    
  );
};

export default Support;
