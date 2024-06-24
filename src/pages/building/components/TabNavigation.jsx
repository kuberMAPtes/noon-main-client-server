import React, { useState } from 'react';
import FeedList from '../../feed/FeedListPage';
import FeedBuildingListPage from '../../feed/FeedBuildingListPage';
import ChatroomList from './ChatroomList';
import { useNavigate, useParams } from 'react-router-dom';
import '../css/tab-navigation.css';

const TabNavigation = () => {
  const [activeTab, setActiveTab] = useState('feed');
  const navigate = useNavigate();
  const { buildingId } = useParams();

  // 피드 생성 or 채팅방 생성
  const handleCreationLink = () => {
    if(activeTab === 'feed'){
      navigate('/feed/form');
    } else {
      navigate('/chat/chatroomCreation/'+buildingId);
    }
  };

  return (
    <div className="tab-navigation-container">
      <div className="tabs">
        <button onClick={() => setActiveTab('feed')} className={activeTab === 'feed' ? 'active' : ''}>
          <i className="fa fa-th"></i>
        </button>
        <button onClick={() => setActiveTab('chat')} className={activeTab === 'chat' ? 'active' : ''}>
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
