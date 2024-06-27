import BuildingInfo from './components/BuildingInfo';
import TabNavigation from './components/TabNavigation';
import Footer from '../../components/common/Footer';
import CustomerSupportHeader from '../CustomerSupport/components/CustomerSupportHeader';
import Header from '../../components/common/Header';


const Building = () => {
  
  return (
    <div className="building-container">
      
    <Header title="건물 프로필"/>
    <BuildingInfo/>
    <TabNavigation/>
    <Footer/>

    </div>
    
  );
};

export default Building;
