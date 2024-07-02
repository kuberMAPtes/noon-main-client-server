import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import ClickableCard from "./ClickableCard";
import { Link } from "react-router-dom";
import BuildingChart from "./BuildingChart";
import useMainPage from "../../member/hook/useMainPage";
import { Row, Col, Container, Card } from "reactstrap";

const Support = ({ isAdmin }) => {
  const memberId = useSelector((state) => state.auth.member.memberId);
  const mainPageUrl = useMainPage(memberId);

  const member = useSelector((state) => state.auth.member);
  const [role, setRole] = useState("MEMBER");
  const [activeCard, setActiveCard] = useState(null);

  useEffect(() => {
    setRole(member.memberRole);
    console.log("현재 회원의 역할은: " + member.memberRole);
  }, [member.memberRole]);

  const handleCardClick = (path) => {
    setActiveCard(path);
  };

  return (
    <Container
      className="support-container"
      style={{ width: "100%", marginBottom:"25%", marginTop: "5%"}}
    >

      <div style={{width:'83%',margin: "0 auto", marginTop:'20px'}}>
      {role === "ADMIN" ? (
        <>

        <div style={{marginBottom:'15px'}}>
          <ClickableCard
              path="./getNoticeList"
              iconClass="nc-icon nc-vector text-danger"
              category="공지 관리"
              title={<i className="fas fa-bell"></i>}
              onClick={handleCardClick}
              active={activeCard === "./getNoticeList"}
            />
        </div>

        <div style={{marginBottom:'15px'}}>
          <ClickableCard
            path="./getReportList"
            iconClass="nc-icon nc-favourite-28 text-primary"
            category="신고 관리"
            title={<i className="fa-solid fa-ban"></i>}
            onClick={handleCardClick}
            active={activeCard === "./getReportList"}
          />
        </div>

        <div style={{marginBottom:'15px'}}>
          <ClickableCard
            path="./listImages"
            iconClass="nc-icon nc-favourite-28 text-primary"
            category="이미지 관리"
            title={<i className="fas fa-exclamation-triangle"></i>}
            onClick={handleCardClick}
            active={activeCard === "./listImages"}
          />
          </div>

          <div style={{marginBottom:'15px'}}>
            <ClickableCard
              path="./getChatbot"
              iconClass="nc-icon nc-money-coins text-success"
              category="NOON 챗봇"
              title={<i className="fa-solid fa-headset"></i>}
              onClick={handleCardClick}
              active={activeCard === "./getChatbot"}
            />
          </div>

          <div style={{marginBottom:'15px'}}>
            <Link to={mainPageUrl} style={{textDecoration: 'none'}}>
              <ClickableCard
                path="./listImages"
                iconClass="nc-icon nc-favourite-28 text-primary"
                category="관리자 프로필"
                title={<i class="fa-solid fa-user"></i>}
                onClick={handleCardClick}
                active={activeCard === "./listImages"}
              />
            </Link>
          </div>

        </>

      ) : (

        <>

        <div style={{marginBottom:'15px'}}>
         <ClickableCard
            path="./getNoticeList"
            iconClass="nc-icon nc-globe text-warning"
            category="공지사항 목록"
            title={<i className="fas fa-bell"></i>}
            onClick={handleCardClick}
            active={activeCard === "./getNoticeList"}
          />
          </div>

          <div style={{marginBottom:'15px'}}>
            <ClickableCard
              path="./getChatbot"
              iconClass="nc-icon nc-money-coins text-success"
              category="NOON 챗봇"
              title={<i className="fa-solid fa-headset"></i>}
              onClick={handleCardClick}
              active={activeCard === "./getChatbot"}
            />
          </div>

        </>
      )}
      </div>

    </Container>
  );
};

export default Support;
