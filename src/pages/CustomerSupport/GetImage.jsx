import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Header from '../../components/common/Header';
import Footer from '../../components/common/Footer';
import UpdateUnlockTimeModal from '../CustomerSupport/components/UpdateUnlockTimeModal';
import MessageModal from './components/MessageModal';
import LoadingModal from './components/LoadingModal'; // 로딩 모달 컴포넌트 임포트
import axiosInstance from '../../lib/axiosInstance';
import { useSelector } from 'react-redux';
import messages from './metadata/messages';

import {
  Button,
  Card,
  CardHeader,
  CardBody,
  Table,
  Badge,
  Row,
  Col,
  Nav,
  NavItem,
  NavLink,
  TabContent,
  TabPane
} from "reactstrap";
import classnames from 'classnames';
import { CardFooter, CardTitle } from 'react-bootstrap';

const handleBlur = async (attachment, blurIntensity, setLoading, setAttachmentList, setBlurModalOpen) => {
  console.log('블러 처리하기' + JSON.stringify(attachment));
  console.log('블러 수준:'+blurIntensity);

  setLoading(true);
  try {
    const response = await axiosInstance.post(`/customersupport/addBlurFile?blurIntensity=`+blurIntensity, {
      attachmentId: attachment.attachmentId
    });

    console.log("블러 결과 : " + JSON.stringify(response.data));
    setAttachmentList(response.data);

  } catch (error) {
    console.error("Error fetching attachment:", error);
  } finally {
    setLoading(false);
    setBlurModalOpen(true);
  }
}; /// end of handleBlur

const handleCancleBlur = async (attachment, setLoading, setAttachmentList, setBlurModalOpen) => {
  console.log('블러 취소하기' + JSON.stringify(attachment));

  setLoading(true);
  try {
    const response = await axiosInstance.post(`/customersupport/deleteBlurFile`, {
      attachmentId: attachment.attachmentId
    });

    console.log("블러 취소 결과 : " + JSON.stringify(response.data));
    setAttachmentList(response.data);

  } catch (error) {
    console.error("Error fetching attachment:", error);
  } finally {
    setLoading(false);
    setBlurModalOpen(true);
  }
}; /// end of handleBlur

const handleDelete = async (attachment, unlockDuration) => {
  console.log('피드 삭제 및 계정 잠금' + JSON.stringify(attachment));

  try {
    const response = await axiosInstance.post(`/customersupport/deleteBadFeed`, {
      feedId: attachment.feedId
    }, {
      params: {
        reqUnlockDuration: unlockDuration
      }
    });

    console.log("피드 삭제 및 계정 잠금 결과 : " + JSON.stringify(response.data));
  } catch (error) {
    console.error("Error fetching attachment:", error);
  }
}; /// end of handleDelete

const GetImage = () => {
  const member = useSelector((state) => state.auth.member);
  const navigate = useNavigate();
  const location = useLocation();
  const { attachment } = location.state || {};
  const [loading, setLoading] = useState(false);
  const [attachmentList, setAttachmentList] = useState([]);

  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [blurModalOpen, setBlurModalOpen] = useState(false);
  const [showBlurMessageModal, setShowBlurMessageModal] = useState(false);
  const [activeTab, setActiveTab] = useState('2');

  const [feed, setFeed] = useState(null);
  console.log("첨부파일 정보: " + JSON.stringify(attachment));

  const getFeed = async () => {
    console.log("getFeed");
    setLoading(true);
    try {
      const response = await axiosInstance.get(`/feed/detail`, {
        params: { 
          feedId: attachment.feedId,
          memberId: member.memberId
         }
      });
  
      console.log("피드 조회 결과 : " + JSON.stringify(response.data));
      setFeed(response.data);
  
    } catch (error) {
      console.error("Error fetching feedDetails:", error);
    } finally {
      setLoading(false);
    }
  }; /// end of getFeed

  useEffect(() => {
    getFeed();
  }, [attachment, member.memberId]); 

  const toggleDeleteModal = () => {
    setDeleteModalOpen(!deleteModalOpen);
  };

  const handleBlurClick = async (blurIntensity) => {
    await handleBlur(attachment, blurIntensity, setLoading, setAttachmentList, setShowBlurMessageModal);
  };

  const handleCancleBlurClick = async () => {
    await handleCancleBlur(attachment, setLoading, setAttachmentList, setShowBlurMessageModal);
  };

  const toggleBlurMessageModal = () => {
    setShowBlurMessageModal(!showBlurMessageModal);
  };

  const handleUnlockSubmit = (unlockDuration) => {
    handleDelete(attachment, unlockDuration);
  };

  const handleGetFeed = () => {
    navigate(`../../feed/detail?feedId=${feed.feedId}`);
  }

  const toggleTab = tab => {
    if(activeTab !== tab) setActiveTab(tab);
  }

  return (
    <div>
      <Header title="사진 상세보기" />

      <Card>
       <CardHeader onClick={handleGetFeed}  style={{ textAlign: 'right', paddingTop: '20px', paddingBottom: '20px' }} >
         피드 확인하러가기&nbsp; <i className="fa-solid fa-right-from-bracket">&nbsp; </i>
       </CardHeader>  
        <CardBody>
           <Table responsive>
              <thead className="text-primary">
                <tr>
                  <th className="text-right">게시자</th>
                  <th className="text-right">피드 등록 일자</th>
                  <th className="text-right">조회수</th>
                </tr>
              </thead>
              <tbody>
                {feed && (
                  <tr>
                    <td>{feed.writerNickname}</td>
                    <td>{feed.writtenTime}</td>
                    <td>{feed.viewCnt}</td>
                  </tr>
                )}
              </tbody>
            </Table>
        </CardBody>

        <CardBody>
          <div style={styles.imageContainer}>
            <Card>
              <CardHeader>
                <div>
                  {attachment.blurredFileUrl == null?
                    <Badge color="primary" style={styles.badge}>
                      블러 처리전
                    </Badge>  
                    :
                    <Badge color="danger" style={styles.badge}>
                      블러 처리됨
                    </Badge>  
                  }
                </div>
              </CardHeader>
              <CardBody>
                <img src={attachment.fileUrl} alt="피드 사진" style={styles.image} />
              </CardBody>
            </Card>
          </div>
        </CardBody>

        <CardBody>
          <Nav tabs>
            <CardHeader>블러 수준</CardHeader>
            <NavItem>
              <NavLink
                className={classnames({ active: activeTab === '1' })}
                onClick={() => { toggleTab('1'); }}>
                약
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                className={classnames({ active: activeTab === '2' })}
                onClick={() => { toggleTab('2'); }}>
                중
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                className={classnames({ active: activeTab === '3' })}
                onClick={() => { toggleTab('3'); }}>
                강
              </NavLink>
            </NavItem>
          </Nav>
        </CardBody>

        <CardFooter>
          <div style={styles.buttonContainer}>
            {attachment.blurredFileUrl == null?
              <button onClick={() => handleBlurClick(activeTab)} style={styles.button}>블러 처리</button>  
              :
              <button onClick={handleCancleBlurClick} style={styles.button}>블러 취소</button>  
            }
            <MessageModal isOpen={showBlurMessageModal} toggle={toggleBlurMessageModal} message={messages.blur} />

            <button onClick={toggleDeleteModal} style={styles.button}>
              피드 삭제
            </button>
            <UpdateUnlockTimeModal isOpen={deleteModalOpen} toggle={toggleDeleteModal} onSubmit={handleUnlockSubmit} />
          </div>
        </CardFooter>

      </Card>

      <LoadingModal show={loading} />
    </div>
  );
}; /// end of GetImage

const styles = {
  imageContainer: {
    flexGrow: 1,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    minHeight: '50vh', 
    position: 'relative', 
  },
  image: {
    maxWidth: '100%',
    maxHeight: '50vh',
    borderRadius: '5px',
  },
  buttonContainer: {
    display: 'flex',
    justifyContent: 'center', 
    width: '100%',
    height: '30%',
    marginBottom: '50px'
  },
  button: {
    backgroundColor: '#030722',
    border: 'none',
    color: '#fff',
    margin: '10px',
    padding: '10px 20px',
    borderRadius: '50px',
    cursor: 'pointer',
    width: '45%',
    height: '30%',
  },
  badge: {
    width: '100px',
    height: '20px'
  },
};

export default GetImage;
