import React from "react";
import { Link } from "react-router-dom";
import BasicNavbar from '../../components/common/BasicNavbar';
import Footer from "../../components/common/Footer";

const FeedPages = () => {
  return (
    <div className="content">
      <BasicNavbar />
      <nav>
        <ul>
          <li>
            <Link to="list?memberId=member_1&page=1">Feed List</Link>
          </li>
          <li>
            <Link to="detail?feedId=10001">Feed Detail</Link>
          </li>
          <li>
            <Link to="feedForm">Feed Form</Link>
          </li>
        </ul>
      </nav>
      <div>
        <Footer />
      </div>
    </div>
  );
};

export default FeedPages;
