import React from 'react';
import CustomerSupportHeader from './components/CustomerSupportHeader';
import Footer from '../../components/common/Footer';

const ListReport = () => {
  const reports = [
    { id: 1, reporterId: 'user1', date: '2024-06-01', status: '처리중' },
    { id: 2, reporterId: 'user2', date: '2024-06-02', status: '완료' },
    { id: 3, reporterId: 'user3', date: '2024-06-03', status: '대기중' },
  ];

  return (
    <div>
      <CustomerSupportHeader title="신고 관리" />
      <div>
        <h3>신고 목록</h3>
        <table>
          <thead>
            <tr>
              <th>신고 ID</th>
              <th>신고자 ID</th>
              <th>신고일자</th>
              <th>신고상태</th>
            </tr>
          </thead>
          <tbody>
            {reports.map((report) => (
              <tr key={report.id}>
                <td>{report.id}</td>
                <td>{report.reporterId}</td>
                <td>{report.date}</td>
                <td>{report.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Footer />
    </div>
  );
};

export default ListReport;
