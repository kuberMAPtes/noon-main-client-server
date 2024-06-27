import React from 'react';
import CustomerSupportHeader from './components/CustomerSupportHeader';
import Support from './components/Support';
import Footer from '../../components/common/Footer';
import Header from '../../components/common/Header';


const GetCustomerSupport = () => {
  return (
    <div className="customer-support">
         <Header title="고객 지원"/>
        <Support />
        <Footer />
    </div>
  );
};

export default GetCustomerSupport;
