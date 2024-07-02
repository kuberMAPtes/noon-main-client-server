import React from 'react';
import CustomerSupportHeader from './components/CustomerSupportHeader';
import Support from './components/Support';
import Footer from '../../components/common/Footer';
import Header from '../../components/common/Header';
import BuildingChart from './components/BuildingChart';
import { Row } from 'reactstrap';


const GetCustomerSupport = () => {
  return (
    <div className="customer-support">
        <Header title="고객 지원"/>

        <Row style={{ textAlign: "center", margin: "0 auto", marginTop:'40px'}}>
          <BuildingChart />
        </Row>
        
        <Support />
    </div>
  );
};

export default GetCustomerSupport;
