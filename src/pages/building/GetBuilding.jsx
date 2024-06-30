import React, { useState } from 'react';
import BuildingInfo from './components/BuildingInfo';
import TabNavigation from './components/TabNavigation';
import Footer from '../../components/common/Footer';
import Header from '../../components/common/Header';

const Building = () => {
  const [subscriptionData, setSubscriptionData] = useState(false);

  return (
    <div className="building-container">
      <Header title="건물 프로필"/>
      <BuildingInfo subscriptionData={subscriptionData} setSubscriptionData={setSubscriptionData} />
      <TabNavigation subscriptionData={subscriptionData} />
      <Footer/>
    </div>
  );
};

export default Building;
