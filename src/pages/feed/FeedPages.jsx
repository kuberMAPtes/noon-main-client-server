import React from "react";
import { Link } from "react-router-dom";

const FeedPages = () => {
  return (
    <div className="content">
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
    </div>
  );
};

export default FeedPages;
