import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import axiosInstance from '../../../lib/axiosInstance';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const WantBuildingProfile = ({ isOpen, onClose, applicationData }) => {
  const navigate = useNavigate();
  const [applicantList, setApplicantList] = useState([]);
  const member = useSelector((state) => state.auth.member);
  const { buildingName, roadAddr, longitude, latitude } = applicationData;

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
    try {

      console.log(applicationData.roadAddr);

      const findBuildingResponse = await axiosInstance.get(`/buildingProfile/getBuildingProfileByRoadAddr`, {
        params: {
          roadAddr : applicationData.roadAddr
        },
      });

      const buildingId = findBuildingResponse.data.buildingId;
      console.log(buildingId);

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
        setApplicantList(response.data);
      } else {
        console.error("Expected an array but got:", response.data);
      }
    } catch (error) {
      console.error("Error fetching subscribers:", error);
    }
  };

  useEffect(() => {
    if (isOpen) {
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
          <i onClick={onClose} class="fa-solid fa-circle-xmark"></i>
        </div>
        <p>이 건물에서 일어나는 일을 알고 싶나요? 프로필 등록을 신청해보세요!</p>
        <div style={styles.buildingInfo}>
          <h3>{buildingName}</h3>
          <p>{roadAddr}</p>
        </div>
        <div style={styles.requestSection}>
          <i onClick={addSubscription} class="fa-solid fa-circle-plus"></i>
          <span style={styles.requestCount}>{applicantList.length}</span>
         <i onClick={deleteSubscription} class="fa-solid fa-circle-minus"></i>
        </div>
        <div style={styles.applicantPhotos}>
          {applicantList.map((applicant) => (
            <img
              key={applicant.memberId}
              src={applicant.profilePhotoUrl}
              alt={applicant.nickname}
              style={styles.profilePhoto}
            />
          ))}
        </div>
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
    fontSize: '20px',
  },
  applicantPhotos: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: '10px',
  },
  profilePhoto: {
    width: '50px',
    height: '50px',
    borderRadius: '50%',
    margin: '0 5px',
  },
};

export default WantBuildingProfile;
