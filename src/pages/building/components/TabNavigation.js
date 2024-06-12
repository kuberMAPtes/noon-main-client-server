import React, { useState } from 'react';
import FeedList from './FeedList';
import ChatroomList from './ChatroomList';

const TabNavigation = () => {
  const [activeTab, setActiveTab] = useState('feed');

  return (
    <div>
      <div className="tabs">
        <button onClick={() => setActiveTab('feed')} className={activeTab === 'feed' ? 'active' : ''}>
          피드
        </button>
        <button onClick={() => setActiveTab('chat')} className={activeTab === 'chat' ? 'active' : ''}>
          채팅방
        </button>
      </div>
      <div className="tab-content">
        {activeTab === 'feed' ? <FeedList /> : <ChatroomList />}
      </div>
      <div className="create-button">
        {activeTab === 'feed' ? ( <button>피드 생성</button> ) : ( <button>채팅방 생성</button> )}
      </div>
    </div>
  );
};

export default TabNavigation;
