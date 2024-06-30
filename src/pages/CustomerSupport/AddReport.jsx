import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axiosInstance from '../../lib/axiosInstance';
import Header from '../../components/common/Header'
import Footer from '../../components/common/Footer';
import MessageModal from './components/MessageModal';
import messages from './metadata/messages';
import { useSelector } from 'react-redux';
import AlertModal from './components/AlertModal';
import { CardHeader, CardTitle, Card, CardBody,Button } from 'reactstrap';
import { CardFooter } from 'react-bootstrap';

const AddReport = () => {

  const member = useSelector((state) => state.auth.member);
  const { reporteeId } = useParams();
  const [reportText, setReportText] = useState('');
  const navigate = useNavigate();


  const handleReportTextChange = (e) => {
    setReportText(e.target.value);
  };


  //신고 등록하기
  const [reportModalOpen, setReportModalOpen] = useState(false);
  const addReport = async () => {

    if(reportText==="" || null){
      toggleNothingToAddModal();
      return;
    }

    try {
      const response = await axiosInstance.post(`/customersupport/addReport`, {
        reporterId : member.memberId,
        reporteeId : reporteeId,
        reportText : reportText,
        reportStatus : 'PEND'
      });
      console.log("등록한 신고 정보: "+JSON.stringify(response.data));
      toggleReportModal();
    } catch (error) {
      console.error("Error fetching addReport details:", error);
    }

  };

  const toggleReportModal = () => {
    setReportModalOpen(!reportModalOpen);
  };


  //신고내용 미입력
  const [nothingToAddModalOpen, setNothingToAddModalOpen] = useState(false);
  const toggleNothingToAddModal = () => {
    setNothingToAddModalOpen(!reportModalOpen);
  };





  return (



    <div>

      <Header title="신고하기" />


      <Card style={{margin:'10px'}}>
        <CardHeader>
          <label htmlFor="reportedId">{reporteeId}를 신고합니다.</label>
        </CardHeader>
        <CardBody>
          <div>
              <textarea
                id="reportText"
                value={reportText}
                onChange={handleReportTextChange}
                placeholder="신고 사유를 상세히 작성..."
                rows="10"
                cols="50"
              />
          </div>
        </CardBody>
        <CardFooter>      
          <Button 
            color="" 
            style={{ backgroundColor: '#030722', marginBottom: '0px', width: "100%", borderRadius: '50px', color: 'white' }} 
            onClick={addReport}>
            신고하기
          </Button>  
            <MessageModal isOpen={reportModalOpen} toggle={toggleReportModal} message={messages.addReport}/>
            <AlertModal isOpen={nothingToAddModalOpen} toggle={toggleNothingToAddModal} message={messages.nothingToAddRoport}/>
        </CardFooter>
      </Card>

      <div>
          <div>
          </div>

      </div>
      <Footer />
    </div>
  );
};



const styles = {
  buttonContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    marginTop: '20px',
  },
};

export default AddReport;
