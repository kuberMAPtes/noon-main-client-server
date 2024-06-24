import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CustomerSupportHeader from './components/CustomerSupportHeader';
import Footer from '../../components/common/Footer';
import axiosInstance from '../../lib/axiosInstance';
import { Card, CardHeader, CardBody, Table, Row, Col } from 'reactstrap';
import { useInView } from 'react-intersection-observer';
import { useSelector } from 'react-redux';
import '../building/css/tab-navigation.css';

const GetNoticeList = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const [noticeList, setNoticeList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const navigate = useNavigate();

  // 회원 아이디(실제 데이터. 리덕스 상태값)
  const member = useSelector((state) => state.auth.member);
  const [role, setRole] = useState("MEMBER");

  useEffect(() => {
    setRole(member.memberRole);
    console.log('현재 회원의 역할은: ' + member.memberRole);
  }, []);

  // 공지 목록 가져오기
  const getNoticeList = async (page) => {
    setLoading(true);
    try {
      const response = await axiosInstance.get(`/customersupport/getNoticeList`, {
        params: { pageNumber: page }
      });
      if (response.data.length === 0) {
        setHasMore(false);
      } else {
        setNoticeList((prevNotices) => [...prevNotices, ...response.data]);
        console.log("공지사항 목록: " + JSON.stringify(response.data));
      }
    } catch (error) {
      console.error("Error fetching notice list:", error);
    } finally {
      setLoading(false);
    }
  };

  // 공지 작성
  const handleAddNoticeLink = () => {
    navigate('../addNotice');
  };

  useEffect(() => {
    if (hasMore) {
      getNoticeList(currentPage);
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

  // 날짜 형식을 YYYY-MM-DD로 변환하는 함수
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    if (!isNaN(date.getTime())) {
      return date.toISOString().split('T')[0];
    }
    return 'Invalid Date';
  };

  // noticeList에서 viewCnt가 가장 큰 공지 찾기
  const maxNotice = noticeList.reduce((max, notice) => (notice.viewCnt > max.viewCnt ? notice : max), noticeList[0] || {});

  return (
    <div>
      <CustomerSupportHeader title="공지 사항" />

      <Row style={{ width: '103%', height: '90%' }} className="justify-content-center align-items-center">
        <Col md="12">
          <Card>
            <CardHeader>
              <div style={{marginTop: '20px'}}>
                <h3><b>🔥지금 핫한 공지!</b></h3>
              </div>
              <Table>
                <tbody>
                  {maxNotice && (
                    <tr onClick={() => navigate(`../getNotice/${maxNotice.feedId}`)}>
                      <td>{maxNotice.title}</td>
                      <td>{maxNotice.writerId}</td>
                      <td>{formatDate(maxNotice.writtenTime)}</td>
                      <td>{maxNotice.viewCnt}</td>
                    </tr>
                  )}
                </tbody>
              </Table>
            </CardHeader>
            <CardBody>
              <Table responsive>
                <thead className="text-primary">
                  <tr>
                    <th className="text-right">제목</th>
                    <th className="text-right">작성자</th>
                    <th className="text-right">작성일</th>
                    <th className="text-right">👀</th>
                  </tr>
                </thead>
                <tbody>
                  {noticeList.map((notice) => (
                    <tr key={notice.title} onClick={() => navigate(`../getNotice/${notice.feedId}`)}>
                      <td>{notice.title}</td>
                      <td>{notice.writerId}</td>
                      <td>{formatDate(notice.writtenTime)}</td>
                      <td>{notice.viewCnt}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
              {loading && <p>Loading...</p>}
              {!hasMore && <p>No more announcements</p>}
              <div ref={ref} style={{ height: 1 }} />
            </CardBody>

            {role === "ADMIN" && (
              <button className="create-button" onClick={handleAddNoticeLink}>
                <i className="fa fa-plus"></i>
              </button>
            )}
          </Card>
        </Col>
      </Row>

      <Footer />
    </div>
  );
};

export default GetNoticeList;
