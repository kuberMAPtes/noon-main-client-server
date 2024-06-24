import React from "react";
import { Link } from "react-router-dom";
import BasicNavbar from '../../components/common/BasicNavbar';
import Footer from "../../components/common/Footer";
import FeedListPage from "./FeedListPage";
import FeedBuildingListPage from "./FeedBuildingListPage";

/**
 * 테스트용 페이지, 개발이 어느정도 완료되면 삭제할 예정
 * @returns 
 */
const FeedPages = () => {
  return (
    <div className="content">
        <BasicNavbar />
        <h2>태스트용 페이지입니다.</h2>
        <nav>
          <ul>
            <li>
              <Link to="list?memberId=member_1&page=1">Feed List</Link>
            </li>
            <li>
              <Link to="list/building?memberId=member_1&buildingId=10001&page=1">Feed Building List</Link>
            </li>
            <li>
              <Link to="detail?feedId=10001">Feed Detail</Link>
            </li>
            <li>
              <Link to="form?buildingId=10010&memberId=member_1">Feed Form(추가)</Link>
            </li>
            <li>
              <Link to="form/10010?memberId=member_1">Feed Form(수정)</Link>
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
