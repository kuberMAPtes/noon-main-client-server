import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import CustomerSupportHeader from './components/CustomerSupportHeader';
import Footer from '../../components/common/Footer';
import axiosInstance from '../../lib/axiosInstance';

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

const GetReport = () => {
  const { reportId } = useParams();
  const [report, setReport] = useState(null);

  const [dajungScoreReduction, setDajungScoreReduction] = useState(null);
  const [lockDuration, setLockDuration] = useState('ONE_DAY');
  const [reportStatus, setReportStatus] = useState('PEND');
  const [processingText, setProcessingText] = useState('');

  const navigate = useNavigate();


  //신고 상세 정보 가져오기
  const getReport = async () => {
    try {
      const response = await axiosInstance.get(`/customersupport/getReportByReportId`, {
        params: { reportId }
      });
      setReport(response.data);
      console.log("신고 상세 정보: "+JSON.stringify(response.data));
    } catch (error) {
      console.error("Error fetching report details:", error);
    }
  };







  //신고 처리하기(신고정보update)

  const [reportProcessingModalOpen, setReportProcessingModalOpen] = useState(false);

  const updateReport = async () => {

    try {
      const response = await axiosInstance.post(`/customersupport/updateReport`, {
        reportId : reportId,
        reportStatus : reportStatus,
        processingText : processingText,
        unlockDuration : lockDuration,
        dajungScoreReduction : dajungScoreReduction,
      });
      setReport(response.data);
      console.log("신고 상세 정보: "+JSON.stringify(response.data));
      toggleReportProcessingModal();
    } catch (error) {
      console.error("Error fetching getReport details:", error);
    }

  };

  const toggleReportProcessingModal = () => {
    setReportProcessingModalOpen(!reportProcessingModalOpen);
  };







  //다정수치 감소 제한 및 값 저장
  const [dajungReductionModalOpen, setDajungReductionModalOpen] = useState(false);

  const handleDajungScoreChange = (e) => {
    const value = parseInt(e.target.value, 10);
    if (!isNaN(value) && value >= 0) {
      if(value >= 100){
        toggleDajungReductionModal();
        setDajungScoreReduction(99);
      }else{
        setDajungScoreReduction(value);
      }
    } else {
      setDajungScoreReduction('');
    }
  };

  const toggleDajungReductionModal = () => {
    setDajungReductionModalOpen(!dajungReductionModalOpen);
  };





  useEffect(() => {
    getReport();
  }, []);

  if (!report) {
    return <p>Loading...</p>;
  }






  return (
    <div style={styles.container}>
      <CustomerSupportHeader title="신고 상세 보기" />
      <div style={styles.content}>
        <Row>
          <Col md="12">
            <Card>
              <CardHeader>정보</CardHeader>
              <CardBody>
                <Table responsive>
                  <thead className="text-primary">
                    <tr>
                      <th className="text-right">신고자</th>
                      <th className="text-right">피신고자</th>
                      <th className="text-right">신고일자</th>
                      <th className="text-right">상태</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>{report.reporterId}</td>
                      <td>{report.reporteeId}</td>
                      <td>{report.reportedTime}</td>
                      <td>{report.reportStatus}</td>
                    </tr>
                  </tbody>
                </Table>
              </CardBody>
            </Card>

            <Card>
              <CardHeader>내용</CardHeader>
              <CardBody>
                <div>
                  {report.reportText}
                </div>
              </CardBody>
            </Card>

            <Card>
              <CardHeader>처리 옵션</CardHeader>
              <CardBody>
                <Table>
                  <thead>
                    <tr>
                      <th>다정 수치 감소량</th>
                      <th>계정 잠금</th>
                      <th>신고 상태</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>
                        <Input type="number" placeholder="감소량 숫자 입력" value={dajungScoreReduction} onChange={handleDajungScoreChange}/>
                        <MessageModal isOpen={dajungReductionModalOpen} toggle={toggleDajungReductionModal} message={messages.limitDajungScoreReduction}/>
                      </td>
                      <td>
                        <Input type="select" value={lockDuration} onChange={(e) => setLockDuration(e.target.value)}>
                          <option value="ONE_DAY">1일</option>
                          <option value="THREE_DAYS">3일</option>
                          <option value="SEVEN_DAYS">7일</option>
                          <option value="THIRTY_DAYS">30일</option>
                          <option value="ONE_HUNDRED_EIGHTY_DAYS">180일</option>
                          <option value="THREE_HUNDRED_SIXTY_FIVE_DAYS">365일</option>
                          <option value="PERMANENT">영구</option>
                        </Input>
                      </td>
                      <td>
                        <Input type="select" value={reportStatus} onChange={(e) => setReportStatus(e.target.value)}>
                          <option value="PEND">대기</option>
                          <option value="ACCEPT">승인</option>
                          <option value="REJECT">반려</option>
                        </Input>
                      </td>
                    </tr>
                  </tbody>
                </Table>
              </CardBody>
            </Card>

            <Card>
              <CardHeader>처리 안내문</CardHeader>
              <CardBody>
                <FormGroup>
                  <Input type="textarea" name="text" id="exampleText" placeholder="승인/반려 사유 작성..."  onChange={(e) => setProcessingText(e.target.value)}/>
                </FormGroup>
              </CardBody>
            </Card>

            <div style={styles.buttonContainer}>
              <Button color="secondary" onClick={() => navigate(-1)}>뒤로</Button>
              <Button color="primary" onClick={()=>updateReport()}>처리</Button>
              <MessageModal isOpen={reportProcessingModalOpen} toggle={toggleReportProcessingModal} message={messages.reportProcessing}/>
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

export default GetReport;
