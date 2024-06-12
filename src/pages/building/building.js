import React from 'react';
import BuildingProfileHeader from './components/BuildingProfileHeader';
import Subscription from './components/Subscription';
import BuildingSummary from './components/BuildingSummary';
import WikiButton from './components/WikiButton';
import TabNavigation from './components/TabNavigation';
import Footer from '../../components/common/Footer';
import WantBuildingProfile from './components/WantBuildingProfile';


const Building = () => {
  return (
    <div className="building-container">
      <BuildingProfileHeader />
      <Subscription />
      <BuildingSummary />
      <WikiButton />
      <TabNavigation />
      <Footer />
      <WantBuildingProfile/>
    </div>
  );
};

export default Building;
