import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import axiosInstance from '../../../lib/axiosInstance';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import useMainPage from '../../member/component/common/useMainPage';

const WantBuildingProfile = ({ isOpen, onClose, applicationData }) => {
  const activationThreshold = 2;
  const navigate = useNavigate();
  const [applicantList, setApplicantList] = useState([]);
  const [subscribe, setSubscribe] = useState(false);
  const [selectedMemberId, setSelectedMemberId] = useState(null); 
  const member = useSelector((state) => state.auth.member);
  const { buildingName, roadAddr, longitude, latitude } = applicationData;

  const mainPageUrl = useMainPage(selectedMemberId);

  useEffect(() => {
    // modal-root 요소를 동적으로 생성
    const modalRoot = document.createElement('div');
    modalRoot.id = 'modal-root';
    document.body.appendChild(modalRoot);

    // 컴포넌트 언마운트 시 modal-root 요소 제거
    return () => {
      document.body.removeChild(modalRoot);
    };
  }, []);

  const addSubscription = async () => {
    setSubscribe(true);
    try {
      const response = await axiosInstance.post(`/buildingProfile/addSubscription/applicant`, {
        memberId: member.memberId,
        buildingName: buildingName,
        roadAddr: roadAddr,
        longitude: longitude,
        latitude: latitude,
      });
      console.log("건물 등록 신청 정보: " + JSON.stringify(response.data));

      setApplicantList((prevList) => {
        if (prevList.some((item) => item.memberId === member.memberId)) {
          return prevList; // 중복 신청 체크
        }
        return [...prevList, member];
      });

      if (response.data.profileActivated) {
        navigate('../getBuildingProfile/' + response.data.buildingId);
      }
    } catch (error) {
      console.error("Error fetching addSubscription details:", error);
    }
  };

  const deleteSubscription = async () => {
    setSubscribe(false);
    try {
      const findBuildingResponse = await axiosInstance.get(`/buildingProfile/getBuildingProfileByRoadAddr`, {
        params: {
          roadAddr: applicationData.roadAddr
        },
      });

      const buildingId = findBuildingResponse.data.buildingId;

      const response = await axiosInstance.post(`/buildingProfile/deleteSubscription`, {
        memberId: member.memberId,
        buildingId: buildingId,
      });
      console.log("건물 신청 취소 정보: " + JSON.stringify(response.data));

      setApplicantList((prevList) => prevList.filter((item) => item.memberId !== member.memberId));

    } catch (error) {
      console.error("Error fetching deleteSubscription details:", error);
    }
  };

  const getSubscribers = async () => {
    try {
      const response = await axiosInstance.get(`/buildingProfile/getSubscribersByRoadAddr`, {
        params: { roadAddr: roadAddr },
      });
      console.log("구독자 목록: " + JSON.stringify(response.data));
      if (Array.isArray(response.data)) {
        // 구독자 목록 세팅
        setApplicantList(response.data);

        // 회원 구독여부 세팅
        setSubscribe(response.data.some(item => item.memberId && item.memberId.includes(member.memberId)));
      } else {
        console.error("Expected an array but got:", response.data);
        setApplicantList([]);
      }
    } catch (error) {
      console.error("Error fetching subscribers:", error);
    }
  };

  useEffect(() => {
    if (isOpen) {
      setSubscribe(false);
      setSelectedMemberId(null);
      getSubscribers();
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <div style={styles.overlay}>
      <div style={styles.modal}>
        <div style={styles.popupHeader}>
          <span role="img" aria-label="notification" style={styles.icon}>🔔</span>
          <h2>건물 프로필 등록 신청</h2>
          <i onClick={onClose} className="fa-solid fa-circle-xmark"></i>
        </div>
        <p>이 건물에서 일어나는 일을 알고 싶나요? 프로필 등록을 신청해보세요!</p>

        <Card>
          <h3>{buildingName}</h3>
          <p>{roadAddr}</p>
        </Card>

        <div style={styles.requestSection}>
          {!subscribe ?
            <button onClick={addSubscription} style={styles.addButton}>신청 하기</button> :
            <button onClick={deleteSubscription} style={styles.deleteButton}>신청 취소</button>
          }
        </div>

        <div style={styles.applicantPhotos}>
          {applicantList.map((applicant) => (
            <div key={applicant.memberId} onClick={() => setSelectedMemberId(applicant.memberId)}>
              <img
                src={applicant.profilePhotoUrl}
                alt={applicant.memberId}
                style={styles.profilePhoto}
              />
            </div>
          ))}
          <div style={styles.requestCount}>{activationThreshold - applicantList.length} MORE!!</div>
        </div>

        {selectedMemberId && (
          <div style={styles.linkContainer}>
            <Link to={mainPageUrl}>
              <button style={styles.linkButton}>이 회원의 프로필 GO</button>
            </Link>
          </div>
        )}
      </div>
    </div>,
    document.getElementById('modal-root') 
  );
};

const styles = {
  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
  },
  modal: {
    backgroundColor: 'white',
    borderRadius: '10px',
    padding: '20px',
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
    width: '300px',
    position: 'relative',
  },
  closeButton: {
    position: 'absolute',
    top: '10px',
    right: '10px',
    background: 'none',
    border: 'none',
    fontSize: '24px',
    cursor: 'pointer',
  },
  popupHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '10px',
  },
  icon: {
    fontSize: '24px',
  },
  buildingInfo: {
    marginBottom: '10px',
  },
  requestSection: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: '10px',
  },
  requestButton: {
    background: '#f0f0f0',
    border: 'none',
    borderRadius: '50%',
    width: '30px',
    height: '30px',
    fontSize: '20px',
    cursor: 'pointer',
  },
  requestCount: {
    margin: '0 10px',
    fontSize: '15px',
    color: '#B8C6E3',
    animation: 'blink 1s step-start infinite' // 깜빡이는 애니메이션
  },
  applicantPhotos: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: '10px',
  },
  profilePhoto: {
    objectFit: 'cover',
    width: '50px',
    height: '50px',
    borderRadius: '50%',
    margin: '0 5px',
    border: '2px solid #9BAAF8',
    cursor: 'pointer' 
  },
  addButton: {
    backgroundColor: "#D8B48B",
    width: '100px',
    height: '40px',
    borderRadius: '500px',
    margin: '0 5px',
  },
  deleteButton: {
    backgroundColor: "#596079",
    width: '100px',
    height: '40px',
    borderRadius: '500px',
    margin: '0 5px',
  },
  linkContainer: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: '10px',
  },
  linkButton: {
    backgroundColor: "#B8C6E3",
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    padding: '10px 20px',
    cursor: 'pointer',
  },
};

// 애니메이션 키프레임 정의
const styleSheet = document.styleSheets[0];
const keyframes =
`@keyframes blink {
  50% {
    opacity: 0;
  }
}`;

styleSheet.insertRule(keyframes, styleSheet.cssRules.length);

export default WantBuildingProfile;
