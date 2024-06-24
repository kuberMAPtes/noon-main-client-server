import React, { useState } from 'react';
import FeedList from '../../feed/FeedListPage';
import FeedBuildingListPage from '../../feed/FeedBuildingListPage';
import ChatroomList from './ChatroomList';
import { useNavigate } from 'react-router-dom';

const TabNavigation = () => {

  const [activeTab, setActiveTab] = useState('feed');
  const navigate = useNavigate();

  //피드 생성 or 채팅방 생성
  const handleCreationLink = () => {

    if(activeTab === 'feed'){
      navigate('/feed/form');
    }else{
      navigate('/chat/chatroomCreation');
    }

  };


  return (
    <div>
      <div className="tabs">
        <button onClick={() => setActiveTab('feed')} className={activeTab === 'feed' ? 'active' : ''}>
          FEED
        </button>
        <button onClick={() => setActiveTab('chat')} className={activeTab === 'chat' ? 'active' : ''}>
          CHAT
        </button>
        {activeTab === 'feed' ? ( <button onClick={handleCreationLink} >FEED+</button> ) : ( <button onClick={handleCreationLink}>CHAT+</button> )}
      </div>
      <div className="tab-content">
        {activeTab === 'feed' ? <FeedBuildingListPage /> : <ChatroomList />}
      </div>
      <div className="create-button">
        
      </div>
    </div>
  );
};

export default TabNavigation;
