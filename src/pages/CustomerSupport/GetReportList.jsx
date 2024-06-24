import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CustomerSupportHeader from './components/CustomerSupportHeader';
import Footer from '../../components/common/Footer';
import axiosInstance from '../../lib/axiosInstance';
import { Card, CardHeader, CardBody, Table, Row, Col } from 'reactstrap';
import { useInView } from 'react-intersection-observer';
import '../building/css/tab-navigation.css';

const GetListReport = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const [reportList, setReportList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [filterTab, setFilterTab] = useState('ALL');
  const navigate = useNavigate();

  const getReportList = async (page) => {
    setLoading(true);
    try {
      const response = await axiosInstance.get(`/customersupport/getReportList`, {
        params: { pageNumber: page }
      });
      if (response.data.length === 0) {
        setHasMore(false);
      } else {
        setReportList((prevReports) => [...prevReports, ...response.data]);
        console.log("신고 목록: " + JSON.stringify(response.data));
      }
    } catch (error) {
      console.error("Error fetching report list:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (hasMore) {
      getReportList(currentPage);
    }
  }, [currentPage, hasMore]);

  const { ref, inView } = useInView({
    threshold: 1.0
  });

  useEffect(() => {
    if (inView && !loading && hasMore) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  }, [inView, loading, hasMore]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toISOString().split('T')[0];
  };

  const handleTabChange = (tab) => {
    setFilterTab(tab);
  };

  const handleGoUp = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const filteredReportList = reportList.filter((report) => {
    if (filterTab === 'ALL') return true;
    if (filterTab === 'PEND') return report.reportStatus === 'PEND';
    if (filterTab === 'ACCEPT') return report.reportStatus === 'ACCEPT';
    if (filterTab === 'REJECT') return report.reportStatus === 'REJECT';
    return true;
  });

  return (
    <div>
      <CustomerSupportHeader title="신고 관리" />

      <div style={styles.tabs}>
        <button
          style={{ ...styles.tabButton, ...(filterTab === "ALL" ? styles.activeTab : {}) }}
          onClick={() => handleTabChange("ALL")}
        >
          전체
        </button>
        <button
          style={{ ...styles.tabButton, ...(filterTab === "PEND" ? styles.activeTab : {}) }}
          onClick={() => handleTabChange("PEND")}
        >
          대기
        </button>
        <button
          style={{ ...styles.tabButton, ...(filterTab === "ACCEPT" ? styles.activeTab : {}) }}
          onClick={() => handleTabChange("ACCEPT")}
        >
          승인
        </button>
        <button
          style={{ ...styles.tabButton, ...(filterTab === "REJECT" ? styles.activeTab : {}) }}
          onClick={() => handleTabChange("REJECT")}
        >
          반려
        </button>
      </div>

      <Row style={{ width: '103%', height: '90%' }} className="justify-content-center align-items-center">
        <Col md="12">
          <Card>
            <CardHeader>각 신고를 클릭해 확인 후 처리하세요.</CardHeader>
            <CardBody>
              <Table responsive>
                <thead className="text-primary">
                  <tr>
                    <th className="text-right">ID</th>
                    <th className="text-right">신고자</th>
                    <th className="text-right">신고일자</th>
                    <th className="text-right">신고상태</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredReportList.map((report) => (
                    <tr
                      key={report.reportId}
                      onClick={() => navigate(`../getReport/${report.reportId}`)}
                      style={{
                        backgroundColor: report.reportStatus === 'ACCEPT' || report.reportStatus === 'REJECT' ? '#D9D9D9' : 'transparent'
                      }}
                    >
                      <td className="text-right">{report.reportId}</td>
                      <td className="text-right">{report.reporterId}</td>
                      <td className="text-right">{formatDate(report.reportedTime)}</td>
                      <td
                        className="text-right"
                        style={{
                          color: report.reportStatus === 'PEND' ? '#9BAAF8' : '#D9D9D9'
                        }}
                      >
                        {report.reportStatus}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
              {loading && <p>Loading...</p>}
              {!hasMore && <p>No more reports</p>}
              <div ref={ref} style={{ height: 1 }} />
            </CardBody>
          </Card>
        </Col>
      </Row>

      <Footer />

      <button className="create-button" onClick={handleGoUp}>
        <i className="fa fa-arrow-up"></i>
      </button>
    </div>
  );
};

const styles = {
  tabs: {
    display: 'flex',
    justifyContent: 'space-around',
    width: '100%',
    marginBottom: '10px',
  },
  tabButton: {
    backgroundColor: 'transparent',
    border: 'none',
    color: '#030722',
    fontSize: '20px',
  },
  activeTab: {
    borderBottom: '2.5px solid #D9D9D9 ',
    width: '25%', 
  },
};

export default GetListReport;
