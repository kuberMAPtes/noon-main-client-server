import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axiosInstance from '../../lib/axiosInstance';
import CustomerSupportHeader from './components/CustomerSupportHeader';
import Footer from '../../components/common/Footer';
import MessageModal from './components/MessageModal';
import messages from './metadata/messages';

const AddReport = () => {

  const { reporterId, reporteeId } = useParams();
  const [reportText, setReportText] = useState('');
  const navigate = useNavigate();


  const handleReportTextChange = (e) => {
    setReportText(e.target.value);
  };


  //신고 등록하기
  const [reportModalOpen, setReportModalOpen] = useState(false);
  const addReport = async () => {

    try {
      const response = await axiosInstance.post(`/customersupport/addReport`, {
        reporterId : reporterId,
        reporteeId : reporteeId,
        reportText : reportText,
        reportStatus : 'PEND'
        //상태는 기본  PEND로 들어갈텐데 확인해보고 혹시나 안되면 PEND로 추가해서 보내기.
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














  return (
    <div>
      <CustomerSupportHeader title="신고하기" />
      <div>
          <div>
            <label htmlFor="reportedId">{reporteeId}를 신고합니다.</label>
          </div>
          <div>
            <textarea
              id="reportText"
              value={reportText}
              onChange={handleReportTextChange}
              placeholder="신고 사유를 상세히 작성..."
              rows="4"
              cols="50"
            />
          </div>
          <div style={styles.buttonContainer}>
            <button type="button" onClick={() => navigate(-1)}>취소</button>
            <button onClick={addReport}>신고등록</button>
            <MessageModal isOpen={reportModalOpen} toggle={toggleReportModal} message={messages.addReport}/>
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
