import React, { useState } from 'react';
import CustomerSupportHeader from './components/CustomerSupportHeader';
import Footer from '../../components/common/Footer';

const AddReport = () => {
  const [reporterId, setReporterId] = useState('');
  const [reportedId, setReportedId] = useState('');
  const [reportText, setReportText] = useState('');

  const handleReporterIdChange = (e) => {
    setReporterId(e.target.value);
  };

  const handleReportedIdChange = (e) => {
    setReportedId(e.target.value);
  };

  const handleReportTextChange = (e) => {
    setReportText(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // 제출 로직을 추가합니다. 예: 서버로 데이터 전송
    console.log('Reporter ID:', reporterId);
    console.log('Reported ID:', reportedId);
    console.log('Report Text:', reportText);
  };

  const handleCancel = () => {
    // 취소 버튼을 클릭했을 때의 로직을 추가합니다.
    console.log('취소되었습니다.');
  };

  return (
    <div>
      <CustomerSupportHeader title="신고하기" />
      <div>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="reporterId">신고자: member_1</label>
          </div>
          <div>
            <label htmlFor="reportedId">피신고자: member_2</label>
          </div>
          <div>
            <textarea
              id="reportText"
              value={reportText}
              onChange={handleReportTextChange}
              placeholder="신고 텍스트"
              rows="4"
              cols="50"
            />
          </div>
          <div>
            <button type="button" onClick={handleCancel}>취소</button>
            <button type="submit">신고등록</button>
          </div>
        </form>
      </div>
      <Footer />
    </div>
  );
};

export default AddReport;
