import React, { useEffect, useState } from 'react';
import axios from 'axios';
import axiosInstance from '../../../lib/axiosInstance';

import ClickableCard from "./ClickableCard"

// reactstrap components
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  CardTitle,
  Row,
  Col,
} from "reactstrap";

import "../css/customerSupport.css"


const Support = ({ isAdmin }) => {


  //회원 아이디(테스트용 임시데이터)
  const [memberId, setMemberId] = useState("member_1");
  const [role, setRole] = useState("member");

  //회원 아이디(실제 데이터. 리덕스 상태값)
  //const memberId = useSelector((state) => state.auth.memberId);




  
  //회원의 role 체크
  const getRole = async () =>{

    const response = await axiosInstance.post(`/member/getMember`, { 
      memberId: memberId   
    }); 

    console.log("role: "+response.data.role);
    setRole(response.data.role);
    
  }




  useEffect(() => {

      getRole();

  }, []); 





  return (
    <div className="support">
      <Row>

        { role === "admin" ? (
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

    </div>
  );
};

export default Support;
