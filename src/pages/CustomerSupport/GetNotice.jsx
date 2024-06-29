import axiosInstance from '../../lib/axiosInstance';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Footer from '../../components/common/Footer';
import MessageModal from './components/MessageModal';
import messages from './metadata/messages';
import { useSelector } from 'react-redux';
import { Button, Card, CardHeader, CardBody, CardFooter, Row } from "reactstrap";
import Header from '../../components/common/Header';

const GetNotice = () => {
  const member = useSelector((state) => state.auth.member);
  const [role, setRole] = useState("MEMBER");

  const { noticeId } = useParams();
  const [notice, setNotice] = useState(null);


  // 공지 상세 정보 가져오기
  const getNotice = async () => {
    try {
      const response = await axiosInstance.get(`/customersupport/getNoticeByNoticeId`, {
        params: { noticeId }
      });
      setNotice(response.data);
      console.log("공지 상세 정보: " + JSON.stringify(response.data));
    } catch (error) {
      console.error("Error fetching notice details:", error);
    }
  };

  // 공지 삭제하기
  const [deleteNoticeModalOpen, setDeleteNoticeModalOpen] = useState(false);

  const deleteNotice = async () => {
    try {
      const response = await axiosInstance.post(`/customersupport/deleteNotice`, {
        feedId: noticeId,
      });
      console.log("공지 삭제 정보: " + JSON.stringify(response.data));
      toggleDeleteNoticeModal();
    } catch (error) {
      console.error("Error fetching deleteNotice details:", error);
    }
  };

  const toggleDeleteNoticeModal = () => {
    setDeleteNoticeModalOpen(!deleteNoticeModalOpen);
  };

  useEffect(() => {
    setRole(member.memberRole);
    console.log("현재 회원의 역할은: " + member.memberRole);
  }, [member.memberRole]);

  useEffect(() => {
    getNotice();
    console.log(role);
  }, []);

  if (!notice) {
    return <p>Loading...</p>;
  }

    // 날짜 형식을 YYYY-MM-DD로 변환
    const formatDate = (dateString) => {
      const date = new Date(dateString);
      if (!isNaN(date.getTime())) {
        return date.toISOString().split('T')[0];
      }
      return 'Invalid Date';
    };

  return (
    <div style={styles.container}>
      <Header title="공지 상세보기" />

      <div style={{ padding: '20px' }}>
        <div style={{ color: 'gray', fontSize: '14px' }}>
          👀{notice.viewCnt}
        </div>

        <h1 style={{ margin: '10px 0', fontSize: '24px', fontWeight: 'bold' }}>
          {notice.title}
        </h1>

        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
          <span style={{ color: 'gray', marginRight: '10px' }}>{notice.writerId}</span>
          <span style={{ color: 'gray' }}>{formatDate(notice.writtenTime)}</span>
        </div>
        <Row className="row-margin-bottom feed-content">
        <div style={{ marginTop: '20px', lineHeight: '1.6' }} className="feed-content">
          <div dangerouslySetInnerHTML={{ __html: notice.feedText }} />
        </div>
      </Row>
      </div>

      {role === 'ADMIN' && (
        <div style={{ padding: '20px' }}>
          <Button 
            color="" 
            style={{ backgroundColor: '#030722', marginBottom: '80px', width: "100%", borderRadius: '50px', color: 'white' }} 
            onClick={() => deleteNotice()}>
            삭제
          </Button>          
          <MessageModal isOpen={deleteNoticeModalOpen} toggle={toggleDeleteNoticeModal} message={messages.deleteNotice} />
        </div>
      )}

      <Footer />
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
  },
  content: {
    flex: 1,
    paddingBottom: '100px', 
  },
  buttonContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    marginTop: '20px',
  }, feedContent: {
    marginTop: '20px',
    lineHeight: '1.6',
    maxWidth: '100%',
    minWidth: '100%',
    height: 'auto',
    objectFit: 'contain',
  },
};

export default GetNotice;
