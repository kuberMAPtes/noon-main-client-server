import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Footer from '../../components/common/Footer';
import Header from '../../components/common/Header';
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
import { CardFooter } from 'react-bootstrap';

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


  // 날짜 형식을 YYYY-MM-DD로 변환
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    if (!isNaN(date.getTime())) {
      return date.toISOString().split('T')[0];
    }
    return 'Invalid Date';
  };


  useEffect(() => {
    getReport();
  }, []);

  if (!report) {
    return <p>Loading...</p>;
  }



  




  return (
    <div style={styles.container}>
      <Header title="신고 상세 보기" />



      <Card style={{ marginTop: '40px', margin:'10px' ,  border: '3px solid #B8C6E3'}}>

        <CardHeader style={{margin:'10px'}}>
          <div style={{ padding: '10px', borderBottom: '1px solid #ddd', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>

              <div style={{ fontWeight: 'bold', whiteSpace: 'nowrap'}}>

                    <span style={{
                      color: 'white',
                      backgroundColor: '#5c7cfa ',
                      borderRadius: '5px',
                      padding: '2px 6px',
                      fontSize: '12px',
                      fontWeight: 'bold',
                      whiteSpace: 'nowrap'
                    }}>신고자</span>

                    &emsp;{report.reporterId}

                </div>

                <div style={{ fontWeight: 'bold', whiteSpace: 'nowrap'}}>
                  
                    <span style={{
                      color: 'white',
                      backgroundColor: '#fa5252',
                      borderRadius: '5px',
                      padding: '2px 6px',
                      fontSize: '12px',
                      fontWeight: 'bold',
                      whiteSpace: 'nowrap'
                    }}>피신고자</span>

                    &nbsp;{report.reporteeId}
                </div>
            </div>

            <div style={{ marginLeft: 'auto', color: '#adb5bd', fontSize: '20px', textAlign:'right'}}>
              {formatDate(report.reportedTime)}&emsp;{report.reportStatus}&emsp;
            </div>  

          </div>
        </CardHeader>

        <CardBody>
          <div>
            {report.reportText}
          </div>
        </CardBody>
      </Card>


      <div style={styles.content}>
        <Row>
          <Col md="12">

            <Card style={{margin:'30px' }}>
              <CardHeader>처리 옵션</CardHeader>
              <CardBody>
                <Table style={{textAlign:'center'}}>
                  <thead>
                    <tr>
                      <th style={{width:'35%',whiteSpace: 'nowrap'}}>다정 수치 감소량</th>
                      <th>계정 잠금</th>
                      <th style={{width:'30%'}}>신고 상태</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>
                        <Input type="number" placeholder="감소량 입력" value={dajungScoreReduction} onChange={handleDajungScoreChange}/>
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



<Card style={{margin:'30px' }}>
  <CardHeader >
    처리 안내문
  </CardHeader>

  <CardBody>
    <FormGroup>
      <Input style={{height:'200px'}} type="textarea" name="text" id="exampleText" placeholder="승인/반려 사유 작성..."  onChange={(e) => setProcessingText(e.target.value)}/>
    </FormGroup>
  </CardBody>

  <CardFooter>
    <Button 
      color="" 
      style={{ backgroundColor: '#030722', width: "100%", borderRadius: '50px', color: 'white' }} 
      onClick={()=>updateReport()}>
      처리
    </Button>  


{/**    알림으로 수정            <MessageModal isOpen={reportProcessingModalOpen} toggle={toggleReportProcessingModal} message={messages.reportProcessing}/> */}
    
  </CardFooter>
</Card>



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
