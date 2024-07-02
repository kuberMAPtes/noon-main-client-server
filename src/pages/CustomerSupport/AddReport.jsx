import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axiosInstance from '../../lib/axiosInstance';
import Header from '../../components/common/Header';
import Footer from '../../components/common/Footer';
import MessageModal from './components/MessageModal';
import messages from './metadata/messages';
import { useSelector } from 'react-redux';
import AlertModal from './components/AlertModal';
import { CardHeader, Card, CardBody, Button } from 'reactstrap';
import { CardFooter } from 'react-bootstrap';
import '../CustomerSupport/css/add-report.css';
import Swal from 'sweetalert2';

const AddReport = () => {
  const member = useSelector((state) => state.auth.member);
  const { reporteeId } = useParams();
  const [reportText, setReportText] = useState('');
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('guide'); // 'guide' for 신고안내, 'method' for 신고방법

  const handleReportTextChange = (e) => {
    setReportText(e.target.value);
  };

  // 신고 등록하기
  const [reportModalOpen, setReportModalOpen] = useState(false);
  const addReport = async () => {
    if (reportText === "" || reportText === null) {
      Swal.fire({
        title: messages.nothingToAddRoport.title,
        text: messages.nothingToAddRoport.description,
        icon: 'warning',
        confirmButtonText: 'OK'
      });
      return;
    }

    try {
      const response = await axiosInstance.post(`/customersupport/addReport`, {
        reporterId: member.memberId,
        reporteeId: reporteeId,
        reportText: reportText,
        reportStatus: 'PEND'
      });
      console.log("등록한 신고 정보: " + JSON.stringify(response.data));
      Swal.fire({
        title: messages.addReport.title,
        text: messages.addReport.description,
        icon: 'success',
        confirmButtonText: 'OK'
      }).then(()=>{
        navigate(-1)
      });
      return;
    } catch (error) {
      console.error("Error fetching addReport details:", error);
    }
  };

  const toggleReportModal = () => {
    setReportModalOpen(!reportModalOpen);
  };

  // 신고내용 미입력
  const [nothingToAddModalOpen, setNothingToAddModalOpen] = useState(false);
  const toggleNothingToAddModal = () => {
    setNothingToAddModalOpen(!nothingToAddModalOpen);
  };

  return (
    <div className>
      <Header title="신고하기" />
      <div className="report-guide">
        <div className="tabs">
          <div
            className={`tab ${activeTab === 'guide' ? 'active' : ''}`}
            onClick={() => setActiveTab('guide')}
          >
            신고안내
          </div>
          <div
            className={`tab ${activeTab === 'method' ? 'active' : ''}`}
            onClick={() => setActiveTab('method')}
          >
            신고하기
          </div>
        </div>
        {activeTab === 'guide' && (
          <div className="guide-content">
            <h3>이럴 때 신고하세요!</h3>
            <br />
            <div className="guide-section">
              <div className="guide-item">
                <h4>피드/프로필</h4>
                <ul>
                  <li> - 음란성 내용</li>
                  <li> - 저작권 위배</li>
                  <li> - 상업적 게시물</li>
                  <li> - 운영자를 사칭</li>
                </ul>
              </div>
              <div className="guide-item">
                <h4>채팅</h4>
                <ul>
                  <li> - 욕설/음란 메시지</li>
                  <li> - 스팸/광고 메시지</li>
                  <li> - 개인정보를 요구</li>
                  <li> - 운영자를 사칭</li>
                </ul>
              </div>
            </div>
            <div className="caution">
              <h4>주의사항</h4>
              <p>신고하신 내용은 관리자가 프로필 및 게시글을 확인한 후 처리됩니다.</p>
              <p>신고 내용에 따라 이용이 제한될 수 있으며 거짓 사실과 다르게 장난으로 신고할 경우 경고를 받을 수도 있습니다.</p>
            </div>
          </div>
        )}

        
        {activeTab === 'method' && (

        <div className="guide-content">

          <h3>{reporteeId}를 신고합니다.</h3><br />

        <Card>

          <div className="guide-section">
            <div className="guide-item">
              <textarea
              id="reportText"
              value={reportText}
              onChange={handleReportTextChange}
              placeholder="신고 사유를 상세히 작성..."
              rows="10"
              cols="36"
              style={{ border: 'none', outline: 'none' }}
              />
            </div>
          </div>

          <Button
            color=""
            style={{ backgroundColor: '#030722', marginBottom: '0px', width: "100%",  color: 'white' }}
            onClick={addReport}>
            신고하기
          </Button>  

        </Card>

        </div>

        )}
      </div>
      
    </div>
  );
};

export default AddReport;
