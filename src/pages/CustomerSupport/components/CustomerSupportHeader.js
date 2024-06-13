import React from 'react';

const CustomerSupportHeader = ({ title }) => {
  return (
    <div className="customerSupportHeader">
      <button className="back-button">{"<"}</button>
      <h1>{title}</h1>
      <button className="menu-button">{"..."}</button>
    </div>
  );
};

export default CustomerSupportHeader;
