import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CustomerSupportHeader from './components/CustomerSupportHeader';
import Footer from '../../components/common/Footer';
import axiosInstance from '../../lib/axiosInstance';
import { Card, CardHeader, CardBody, Table, Row, Col } from 'reactstrap';
import { useInView } from 'react-intersection-observer';

const GetListReport = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const [reportList, setReportList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
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

  return (
    <div>
      <CustomerSupportHeader title="신고 관리" />

      <Row>
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
                  {reportList.map((report) => (
                    <tr key={report.reportId} onClick={() => navigate(`../getReport/${report.reportId}`)}>
                      <td>{report.reportId}</td>
                      <td>{report.reporterId}</td>
                      <td>{report.reportedTime}</td>
                      <td>{report.reportStatus}</td>
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
    </div>
  );
};

export default GetListReport;
