import BuildingInfo from './components/BuildingInfo';
import TabNavigation from './components/TabNavigation';
import Footer from '../../components/common/Footer';
import CustomerSupportHeader from '../CustomerSupport/components/CustomerSupportHeader';


const Building = () => {
  
  return (
    <div className="building-container">
      
    <CustomerSupportHeader title="건물 프로필"/>
    <BuildingInfo/>
    <TabNavigation/>
    <Footer/>

    </div>
    
  );
};

export default Building;
