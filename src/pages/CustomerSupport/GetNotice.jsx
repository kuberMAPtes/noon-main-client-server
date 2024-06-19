import axiosInstance from '../../lib/axiosInstance';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import CustomerSupportHeader from './components/CustomerSupportHeader';
import Footer from '../../components/common/Footer';

import MessageModal from './components/MessageModal';
import messages from './metadata/messages';

import {
  Button,
  Card,
  CardHeader,
  CardBody,
  Input,
  Row,
  Col,
  Table,
  FormGroup,
} from "reactstrap";

const GetNotice = () => {


  //회원 role(테스트용 임시데이터)
  const [role, setRole] = useState("admin");

  //회원 아이디(실제 데이터. 리덕스 상태값)
  //const memberId = useSelector((state) => state.auth.memberId);

  const { noticeId } = useParams();
  const[notice, setNotice] = useState();

  const navigate = useNavigate();


    //공지 상세 정보 가져오기
    const getNotice = async () => {
      try {
        const response = await axiosInstance.get(`/customersupport/getNoticeByNoticeId`, {
          params: { noticeId }
        });
        setNotice(response.data);
        console.log("공지 상세 정보: "+JSON.stringify(response.data));
      } catch (error) {
        console.error("Error fetching notice details:", error);
      }
    };




  //공지 삭제하기
  const [deleteNoticeModalOpen, setDeleteNoticeModalOpen] = useState(false);

  const deleteNotice = async () => {

    try {
      const response = await axiosInstance.post(`/customersupport/deleteNotice`, {
        feedId : noticeId,
      });
      console.log("공지 삭제 정보: "+JSON.stringify(response.data));
      toggleDeleteNoticeModal();
    } catch (error) {
      console.error("Error fetching deleteNotice details:", error);
    }

  };

  const toggleDeleteNoticeModal = () => {
    setDeleteNoticeModalOpen(!deleteNoticeModalOpen);
  };


  
  useEffect(() => {
    getNotice();
  }, []);

  if (!notice) {
    return <p>Loading...</p>;
  }
  


  return (
    <div style={styles.container}>

      <CustomerSupportHeader title="공지 상세보기" />

        <div style={styles.content}>
          <Row>
            <Col md="12">
              <Card>
                <CardHeader>공지제목: {notice.title}</CardHeader>
                <CardBody>
                  <Table responsive>
                    <thead className="text-primary">
                      <tr>
                        <th className="text-right">등록 일자</th>
                        <th className="text-right">조회수</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>{notice.writtenTime}</td>
                        <td>{notice.viewCnt}</td>
                      </tr>
                    </tbody>
                  </Table>
                </CardBody>
              </Card>

              <Card>
                <CardHeader>내용</CardHeader>
                <CardBody>
                  <div>
                    {notice.feedText}
                  </div>
                </CardBody>
              </Card>


              <div style={styles.buttonContainer}>
                <Button color="secondary" onClick={() => navigate(-1)}>뒤로</Button>
                {role==='admin' && <Button color="primary" onClick={()=>deleteNotice()}>삭제</Button>}
                <MessageModal isOpen={deleteNoticeModalOpen} toggle={toggleDeleteNoticeModal} message={messages.deleteNotice}/>
              </div>

            </Col>
          </Row>
        </div>

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
  },
};


export default GetNotice;
