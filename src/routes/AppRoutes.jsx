import React, { useEffect, useRef, useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
  useNavigationType,
  Navigate,
} from "react-router-dom";
import GetAuthMain from "../pages/member/GetAuthMain";
import GetSignUpTermAgreement from "../pages/member/GetSignUpTermAgreement";
import AddPhoneNumberAuthentification from "../pages/member/AddPhoneNumberAuthentification";
import AddMember from "../pages/member/AddMember";
import AddMemberResult from "../pages/member/AddMemberResult";
import UpdatePwd from "../pages/member/UpdatePwd";
import UpdatePwdResult from "../pages/member/UpdatePwdResult";
import GetMember from "../pages/member/GetMember";
import UpdateMember from "../pages/member/GetMember";
import GetMemberRelationshipList from "../pages/member/GetMemberRelationshipList";

import ChatRoomCreation from "../pages/Chat/ChatroomCreation";
import Chatroom from "../pages/Chat/Chatroom";
import MyChatroomList from "../pages/Chat/MyChatroomList";
import ChatApplyList from "../pages/Chat/ChatApplyList";

import ChatAcceptRejectDecide from "../pages/ChatApply/ChatAcceptRejectDecide";
import ChatApply from "../pages/ChatApply/ChatApply";
import ChatisAccepted from "../pages/ChatApply/ChatisAccepted";
import ChatisRejected from "../pages/ChatApply/ChatisRejected";
import ChatReject from "../pages/ChatApply/ChatReject";
import ChatRejected from "../pages/ChatApply/ChatRejected";
import BMap from "../pages/map/BMap";
import PrivateRoute from "./PrivateRoute";
import KakaoNav from "../pages/member/KakaoNav";
import Search from "../pages/search/Search";
import GuestRoute from './GuestRoute';
import B from '../pages/member/function/test/B';

import GetBuilding from '../pages/building/GetBuilding';
import GetCustomerSupport from '../pages/CustomerSupport/GetCustomerSupport';
import GetChatbot from '../pages/CustomerSupport/GetChatbot';
import GetNotice from '../pages/CustomerSupport/GetNotice';
import AddNotice from '../pages/CustomerSupport/AddNotice';
import GetReport from '../pages/CustomerSupport/GetReport';
import AddReport from '../pages/CustomerSupport/AddReport';
import ListImages from '../pages/CustomerSupport/ListImages';
import GetImage from '../pages/CustomerSupport/GetImage';
import DeleteBadFeed from '../pages/CustomerSupport/DeleteBadFeed';
import GetListReport from '../pages/CustomerSupport/GetReportList';
import GetNoticeList from "../pages/CustomerSupport/GetNoticeList";

import MemberSetting from "../pages/setting/MemberSetting";
// import Test from '../pages/Chat/Test';
import FeedPages from "../pages/feed/FeedPages";
import FeedList from "../pages/feed/FeedListPage";
import FeedDetail from "../pages/feed/FeedDetailPage";
import FeedForm from "../pages/feed/FeedFormPage";
import GetMemberId from "../pages/member/GetMemberId";
import IdFormToUpdatePwd from "../pages/member/IdFormToUpdatePwd";

import TestComponent from '../pages/member/component/test/TestComponent';
import Postcode from '../pages/member/component/Postcode';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import '../assets/css/animation.css'
import LoginForm from '../pages/member/component/LoginForm';
import AuthLoader from '../components/common/AuthLoader'
import FeedChartPage from '../pages/feed/FeedChartPage';
import FeedBuildingListPage from '../pages/feed/FeedBuildingListPage';
import FeedListHomePage from '../pages/feed/FeedListHomePage';
import GetMemberProfile from "../pages/member/GetMemberProfile";
import GetBuildingWiki from "../pages/building/wiki/GetBuildingWiki";
import EditBuildingWiki from "../pages/building/wiki/EditBuildingWiki";
import ApplicantSample from "../pages/building/components/ApplicantSample";
import FeedVoteForm from "../pages/feed/FeedVoteFormPage";
import FeedMegaphoneForm from "../pages/feed/FeedMegaphoneFormPage";

const AppRoutes = () => {
  const location = useLocation();
  const navigationType = useNavigationType();
  const prevLocationRef = useRef(location); // 초기 위치를 저장
  const [isBack, setIsBack] = useState(false);

  console.log("#### AppRoutes 렌더링");
  // console.log('!@*#(&$^!@*&#^!*@&^#!#isNotReversing:', isBack);

  useEffect(() => {
    console.log("@@@@ AppRoutes useEffect ");
    if (navigationType === "POP") {
      //   console.log('POP');
      setIsBack(true);
    } else {
      setIsBack(false);
      //   console.log('PUSH');
    }
    prevLocationRef.current = location; // 현재 위치를 저장하여 다음 렌더링 시 사용할 수 있도록 함
  }, [location, navigationType]);

  return (
    <TransitionGroup className="transition-wrapper" fluid="true">
      <CSSTransition
        key={location.pathname}
        timeout={300}
        classNames={isBack ? "reverse-slide" : "slide"}
      >
        <Routes location={location}>
          {/* <Route path="/" element={<Navigate to="/member/getAuthMain" />} /> */}
          <Route path="/" element={<Navigate to="/member/getAuthMain" />} />
          <Route path="/b" element={<B />}></Route>
          <Route path="/testComponent" element={<TestComponent />}></Route>
          <Route path="/member">
            <Route path="getAuthMain" element={<GuestRoute><GetAuthMain /></GuestRoute>} />
            <Route path="getSignUpTermAgreement" element={<GuestRoute><GetSignUpTermAgreement /></GuestRoute>} />
            <Route path="addPhoneNumberAuthentification/:toUrl" element={<AddPhoneNumberAuthentification />} />
            <Route path="addMember" element={<GuestRoute><AddMember /></GuestRoute>} />
            <Route path="postcode" element={<Postcode />} />
            <Route path="addMemberResult" element={<AddMemberResult />} />
            <Route path="loginForm" element={<GuestRoute><LoginForm /></GuestRoute>} />
            <Route path="kakaoNav/:memberId" element={<KakaoNav />} />
            <Route path="IdFormToUpdatePwd" element={<IdFormToUpdatePwd />} />
            <Route path="updatePwd" element={<PrivateRoute><UpdatePwd /></PrivateRoute>} />
            <Route path="updatePwdResult/:result" element={<PrivateRoute><UpdatePwdResult /></PrivateRoute>} />
            <Route path="getMember" element={<PrivateRoute><GetMember /></PrivateRoute>} />
            <Route path="getMemberId/:memberId" element={<GuestRoute><GetMemberId /></GuestRoute>} />
            <Route path="getMemberProfile/:secretId/:secretIv" element={<PrivateRoute><GetMemberProfile /></PrivateRoute>} />
            <Route path="getMemberRelationshipList/:secretId/:secretIv" element={<PrivateRoute><GetMemberRelationshipList /></PrivateRoute>} />
          </Route>
        <Route path="chat">
          <Route path="chatroomCreation/:buildingId" element={<PrivateRoute><ChatRoomCreation /></PrivateRoute>} />
          <Route path="chatroom" element={<PrivateRoute><Chatroom /></PrivateRoute>} />
          <Route path="myChatroomList" element={<PrivateRoute><MyChatroomList /></PrivateRoute>} />
          <Route path="ChatApplyList" element={<PrivateRoute><ChatApplyList /></PrivateRoute>} />
          <Route path="chatAcceptRejectDecide" element={<PrivateRoute><ChatAcceptRejectDecide /></PrivateRoute>} />
          <Route path="chatApply" element={<PrivateRoute><ChatApply /></PrivateRoute>} />
          <Route path="chatisAccepted" element={<PrivateRoute><ChatisAccepted /></PrivateRoute>} />
          <Route path="chatisRejected" element={<PrivateRoute><ChatisRejected /></PrivateRoute>} />
          <Route path="chatReject" element={<PrivateRoute><ChatReject /></PrivateRoute>} />
          <Route path="chatRejected" element={<PrivateRoute><ChatRejected /></PrivateRoute>} />
          {/* <Route path="test" element={<Test/>}/> */}
        </Route>        

        <Route path="/map" element={<PrivateRoute><BMap /></PrivateRoute>} />
        <Route path="/map/:ownerIdOfMapInfo" element={<PrivateRoute><BMap /></PrivateRoute>} />
        <Route path="/search" element={<PrivateRoute><Search /></PrivateRoute>} />
        <Route path="/getBuildingProfile/:buildingId" element={<PrivateRoute><GetBuilding /></PrivateRoute>} />
        <Route path="/getBuildingWiki/:buildingId" element={<PrivateRoute><GetBuildingWiki /></PrivateRoute>} />
        <Route path="/editBuildingWiki/:buildingId" element={<PrivateRoute><EditBuildingWiki /></PrivateRoute>} />
        <Route path="/applicantSample" element={<PrivateRoute><ApplicantSample /></PrivateRoute>} />

         <Route path="/customerSupport">
         <Route path="" element={<PrivateRoute element={<GetCustomerSupport />} />} />
          <Route path="getChatbot" element={<PrivateRoute element={<GetChatbot />} />} />
          <Route path="getNoticeList" element={<PrivateRoute element={<GetNoticeList />} />} />
          <Route path="getNotice/:noticeId" element={<PrivateRoute element={<GetNotice />} />} />
          <Route path="addNotice" element={<PrivateRoute element={<AddNotice />} />} />
          <Route path="getReportList" element={<PrivateRoute element={<GetListReport />} />} />
          <Route path="getReport/:reportId" element={<PrivateRoute element={<GetReport />} />} />
          <Route path="addReport/:reporteeId" element={<PrivateRoute element={<AddReport />} />} />
          <Route path="listImages" element={<PrivateRoute element={<ListImages />} />} />
          <Route path="getImage" element={<PrivateRoute element={<GetImage />} />} />
          <Route path="deleteBadFeed" element={<PrivateRoute element={<DeleteBadFeed />} />} />
        </Route>
          <Route path="/setting" element={<MemberSetting />} />
          <Route path="/feed">
            <Route path="list" element={<FeedList />} />
            <Route path="list/building/:buildingId" element={<FeedBuildingListPage />} />
            <Route path="detail" element={<FeedDetail />} />
            <Route path="form" element={<FeedForm />} /> {/* 일반 피드 추가 */}
            <Route path="voteForm" element={<FeedVoteForm />} /> {/* 투표 피드 추가 */}
            <Route path="form/:feedId" element={<FeedForm />} /> {/* 일반 피드 수정 */}
            <Route path="chart" element={<FeedChartPage />} />
            <Route path="main" element={<FeedListHomePage />}/>
            <Route path="" element={<FeedPages />} />
          </Route>
        </Routes>
      </CSSTransition>
    </TransitionGroup>
  );
};

export default AppRoutes;