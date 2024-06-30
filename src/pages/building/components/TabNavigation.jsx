import React, { useState } from 'react';
import FeedBuildingListPage from '../../feed/FeedBuildingListPage';
import ChatroomList from './ChatroomList';
import { useNavigate, useParams } from 'react-router-dom';
import Swal from 'sweetalert2';
import '../css/tab-navigation.css';

const TabNavigation = ({ subscriptionData }) => {
  const [activeTab, setActiveTab] = useState('feed');
  const navigate = useNavigate();
  const { buildingId } = useParams();

  // 피드 생성 or 채팅방 생성
  const handleCreationLink = () => {
    console.log("구독여부: " + subscriptionData);

    if (subscriptionData) {
      if (activeTab === 'feed') {
        navigate('/feed/form?buildingId=' + buildingId);
      } else {
        navigate('/chat/chatroomCreation/' + buildingId);
      }
    } else {
      Swal.fire({
        text: "생성 전에 '구독' 버튼을 먼저 눌러주세요 😊",
        icon: 'warning',
        timer: 1500, 
        timerProgressBar: true,
        showConfirmButton: false 
      });
    }
  };

  return (
    <div className="tab-navigation-container">
      <div className="tabs">
        <button 
          onClick={(e) => {
            e.target.style.backgroundColor = '#f3f0ff';
            setTimeout(() => {
              e.target.style.backgroundColor = 'transparent';
            }, 200);
            setActiveTab('feed');
          }} 
          className={activeTab === 'feed' ? 'active' : ''}
        >
          <i className="fa fa-th"></i>
        </button>
        <button 
          onClick={(e) => {
            e.target.style.backgroundColor = '#f3f0ff';
            setTimeout(() => {
              e.target.style.backgroundColor = 'transparent';
            }, 200);
            setActiveTab('chat');
          }} 
          className={activeTab === 'chat' ? 'active' : ''}
        >
          <i className="fa fa-comment"></i>
        </button>
      </div>
      <div className="tab-content">
        {activeTab === 'feed' ? <FeedBuildingListPage /> : <ChatroomList />}
      </div>
      <button className="create-button" onClick={handleCreationLink}>
        <i className="fa fa-plus"></i>
      </button>
    </div>
  );
};

export default TabNavigation;
