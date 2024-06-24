import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import ClickableCard from "./ClickableCard"
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  CardTitle,
  Row,
  Col,
  Container
} from "reactstrap";

const Support = ({ isAdmin }) => {

  const member = useSelector((state) => state.auth.member);
  const [role, setRole] = useState("MEMBER");

  useEffect(() => {
    setRole(member.memberRole);
    console.log('현재 회원의 역할은: ' + member.memberRole);
  }, [member.memberRole]);

  return (
    <Container className="support-container" style={{ marginTop:'50px', height: '50vh' }}>
      <Row style={{ width: '110%', height: '100%' }} className="justify-content-center align-items-center">
        {role === "ADMIN" ? (
          <>
            <ClickableCard
              path="./getNoticeList"
              iconClass="nc-icon nc-vector text-danger"
              category="공지사항 관리"
              title={<i className="fas fa-bell"></i>}
            />
            <ClickableCard
              path="./getReportList"
              iconClass="nc-icon nc-favourite-28 text-primary"
              category="신고 관리"
              title={<i className="fa-solid fa-ban"></i>}
            />
            <ClickableCard
              path="./listImages"
              iconClass="nc-icon nc-favourite-28 text-primary"
              category="유해 피드 관리"
              title={<i className="fas fa-exclamation-triangle"></i>}
            />
          </>
        ) : (
          <>
            <ClickableCard
              path="./getNoticeList"
              iconClass="nc-icon nc-globe text-warning"
              category="공지사항 목록"
              title={<i className="fas fa-bell"></i>}
            />
            <ClickableCard
              path="./getChatbot"
              iconClass="nc-icon nc-money-coins text-success"
              category="NOON 챗봇"
              title={<i className="fa-solid fa-headset"></i>}
            />
          </>
        )}
      </Row>
    </Container>
  );
};

export default Support;
