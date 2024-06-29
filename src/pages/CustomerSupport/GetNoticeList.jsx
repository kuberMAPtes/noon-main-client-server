import React, { useEffect, useState } from 'react';
import Footer from '../../components/common/Footer';
import axiosInstance from '../../lib/axiosInstance';
import { Card, CardHeader, CardBody, Table, Row, Col, CardFooter } from 'reactstrap';
import { useInView } from 'react-intersection-observer';
import navigate from '../CustomerSupport/util/Navigator'

import { useSelector } from 'react-redux';
import '../building/css/tab-navigation.css';
import Header from '../../components/common/Header';

const GetNoticeList = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const [noticeList, setNoticeList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const { goToNoticeDetail, goToAddNotice } = navigate();

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

  // 날짜 형식을 YYYY-MM-DD로 변환
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    if (!isNaN(date.getTime())) {
      return date.toISOString().split('T')[0];
    }
    return 'Invalid Date';
  };

  // 새로운 공지인지 확인 (테스트를 위해 1시간 기준. 추후 1일이나 7일 기준으로 변경)
  const isNew = (dateString) => {
    const now = new Date();
    const noticeDate = new Date(dateString);
    //const oneDayInMilliseconds = 24 * 60 * 60 * 1000;
    const oneDayInMilliseconds = 60 * 60 * 1000;
    return (now - noticeDate) <= oneDayInMilliseconds;
  };
  

  // noticeList에서 viewCnt가 가장 큰 공지 찾기 
  const maxNotice = noticeList.reduce((max, notice) => (notice.viewCnt > max.viewCnt ? notice : max), noticeList[0] || {});

  return (
    <div>
      <Header title="공지 사항" />
      <Card>
        <CardHeader style={{backgroundColor: '#B8C6E3', padding:'10px', margin: '10px', borderRadius: '5px'}}>
         <div>
            <h3><b>🔥지금 핫한 공지!</b></h3>
          </div>
          <Card>

            
            <div>
              {maxNotice && (

                <div
                  style={{ padding: '10px', borderBottom: '1px solid #ddd', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
                  onClick={() => goToNoticeDetail(member.memberId, maxNotice.feedId)}>

                  <div>
                    <div style={{ fontWeight: 'bold'}}>
                      {maxNotice.title}
                        <span style={{
                          color: 'white',
                          backgroundColor: 'red',
                          borderRadius: '5px',
                          padding: '2px 6px',
                          marginLeft: '10px',
                          fontSize: '12px',
                          fontWeight: 'bold'
                        }}>HOT</span>
                    </div>

                    <div style={{ color: 'gray', fontSize: '12px' }}>
                      {formatDate(maxNotice.writtenTime)}
                    </div>
                  </div>

                  <div style={{ marginLeft: 'auto', color: 'gray', fontSize: '12px' }}>
                    👀{maxNotice.viewCnt}
                  </div>
                

                </div>
              )}
            </div>
          </Card>
         </CardHeader>


        <CardBody>

            <div>
              {noticeList.map((notice) => (
                <div key={notice.feedId} 
                    style={{ padding: '10px', borderBottom: '1px solid #ddd', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
                    onClick={() => goToNoticeDetail(member.memberId, notice.feedId)}>

                  <div>
                    <div style={{ fontWeight: 'bold' }}>
                      {notice.title}
                      {isNew(notice.writtenTime) && (
                        <span style={{
                          color: 'white',
                          backgroundColor: '#9BAAF8',
                          borderRadius: '5px',
                          padding: '2px 6px',
                          marginLeft: '10px',
                          fontSize: '12px',
                          fontWeight: 'bold'
                        }}>NEW</span>
                      )}
                    </div>

                  
                    <div style={{ color: 'gray', fontSize: '12px' }}>
                      {formatDate(notice.writtenTime)}
                    </div>

                  </div>

                  <div style={{ marginLeft: 'auto', color: 'gray', fontSize: '12px' }}>
                    👀{notice.viewCnt}
                  </div>

                </div>
              ))}
            </div>

            {loading && <p>Loading...</p>}
            {!hasMore && <p>No more announcements</p>}
            <div ref={ref} style={{ height: 1 }} />

          </CardBody>
        <CardFooter>
          {role === "ADMIN" && (
            <button className="create-button" onClick={() => goToAddNotice()}>
              <i className="fa fa-plus"></i>
            </button>
          )}
        </CardFooter>
      </Card>

      <Footer />
    </div>
  );
};

export default GetNoticeList;
