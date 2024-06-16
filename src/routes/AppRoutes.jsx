import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import GetAuthMain from '../pages/member/GetAuthMain';
import GetSignUpTermAgreement from '../pages/member/GetSignUpTermAgreement';
import AddPhoneNumberAuthentification from '../pages/member/AddPhoneNumberAuthentification';
import AddMember from '../pages/member/AddMember';
import AddMemberResult from '../pages/member/AddMemberResult';
import Login from '../pages/member/Login';
import UpdatePassword from '../pages/member/UpdatePassword';
import UpdatePasswordResult from '../pages/member/UpdatePasswordResult';
import GetMember from '../pages/member/GetMember';
import GetMemberProfile from '../pages/member/GetMemberProfile';
import UpdateMember from '../pages/member/UpdateMember';
import GetMemberRelationshipList from '../pages/member/GetMemberRelationshipList';

import ChatRoomCreation from "../pages/Chat/ChatroomCreation";
import Chatroom from "../pages/Chat/Chatroom";
import MyChatroomList from "../pages/Chat/MyChatroomList";
import ChatApplyList from '../pages/Chat/ChatApplyList'

import ChatAcceptRejectDecide from '../pages/ChatApply/ChatAcceptRejectDecide';
import ChatApply from '../pages/ChatApply/ChatApply';
import ChatisAccepted from '../pages/ChatApply/ChatisAccepted';
import ChatisRejected from '../pages/ChatApply/ChatisRejected';
import ChatReject from '../pages/ChatApply/ChatReject';
import ChatRejected from '../pages/ChatApply/ChatRejected';
import BMap from "../pages/map/BMap";
import PrivateRoute from './PrivateRoute';
import KakaoNav from '../pages/member/KakaoNav';
import Search from "../pages/search/Search";
import GuestRoute from './GuestRoute';
import B from '../pages/member/function/test/B';

import Building from '../pages/building/Building';
import GetCustomerSupport from '../pages/CustomerSupport/GetCustomerSupport';
import GetChatbot from '../pages/CustomerSupport/GetChatbot';
import ListNotice from '../pages/CustomerSupport/ListNotice';
import GetNotice from '../pages/CustomerSupport/GetNotice';
import AddNoticeView from '../pages/CustomerSupport/AddNoticeView';
import ListReport from '../pages/CustomerSupport/ListReport';
import GetReport from '../pages/CustomerSupport/GetReport';
import AddReport from '../pages/CustomerSupport/AddReport';
import ListImages from '../pages/CustomerSupport/ListImages';
import GetImage from '../pages/CustomerSupport/GetImage';
import DeleteBadFeed from '../pages/CustomerSupport/DeleteBadFeed';

import MemberSetting from "../pages/setting/MemberSetting";
// import Test from '../pages/Chat/Test';

import FeedList from "../pages/feed/FeedList";
import FeedDetail from "../pages/feed/FeedDetail";
import FeedForm from "../pages/feed/FeedForm";
import TestComponent from '../pages/member/component/test/TestComponent';
import Postcode from '../pages/member/component/Postcode';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import '../assets/css/animation.css'
import LoginForm from '../pages/member/component/LoginForm';
import AuthLoader from '../components/common/AuthLoader'
const AppRoutes = () => {

    const location = useLocation();

  return (
    <TransitionGroup>
    <CSSTransition
      key={location.key}
      timeout={300}
      classNames="slide"
    >
        <AuthLoader>
    <Routes location={location}>
        <Route path="/b" element={<B/>}></Route>
        <Route path="/testComponent" element={<TestComponent/>}></Route>
        <Route path="/member">
            <Route path="getAuthMain" element={
                <GuestRoute>
                  <GetAuthMain />
                </GuestRoute>
                } />
            <Route path="getSignUpTermAgreement" element={
                <GuestRoute>
                <GetSignUpTermAgreement/>
                </GuestRoute>
                }/>
            <Route path="addPhoneNumberAuthentification" element={
                <GuestRoute>
                <AddPhoneNumberAuthentification />
                </GuestRoute>
                } />
            <Route path="addMember" element={
                <GuestRoute>
                <AddMember />
                </GuestRoute>
                } />
            <Route path="postcode" element={<Postcode/>}/>
            <Route path="addMemberResult" element={<AddMemberResult />} />
            <Route path="login" element={<Login/>}/>
            <Route path="loginForm" element={<LoginForm/>}/>
            <Route path="kakaoNav" element={<KakaoNav/>}/>
            
            <Route path="updatePassword" element={
              <PrivateRoute>
                <UpdatePassword />
              </PrivateRoute>
            } />
            <Route path="updatePasswordResult" element={
              <PrivateRoute>
                <UpdatePasswordResult />
              </PrivateRoute>
            } />
            <Route path="getMember" element={
              <PrivateRoute>
                <GetMember />
              </PrivateRoute>
            } />
            <Route path="updateMember" element={
              <PrivateRoute>
                <UpdateMember />
              </PrivateRoute>
            } />
            <Route path="getMemberProfile/:encryptedToId/:IV" element={
              <PrivateRoute>
                <GetMemberProfile />
              </PrivateRoute>
            } />
            <Route path="getMemberRelationshipList" element={
              <PrivateRoute>
                <GetMemberRelationshipList />
              </PrivateRoute>
            } />
        </Route>
        <Route path="chat">
            <Route path="chatroomCreation" element={<ChatRoomCreation />} />
            <Route path="chatroom" element={<Chatroom />} />
            <Route path="myChatroomList" element={<MyChatroomList />} />
            <Route path="ChatApplyList" element={<ChatApplyList />} />
            
            <Route path="chatAcceptRejectDecide" element={<ChatAcceptRejectDecide/>}/>
            <Route path="chatApply" element={<ChatApply/>}/>
            <Route path="chatisAccepted" element={<ChatisAccepted/>}/>
            <Route path="chatisRejected" element={<ChatisRejected/>}/>
            <Route path="chatReject" element={<ChatReject/>}/>
            <Route path="chatRejected" element={<ChatRejected/>}/>
            {/* <Route path="test" element={<Test/>}/> */}
        </Route>
        <Route path="/map" element={<BMap />} />
        <Route path="/search" element={<Search />} />
        <Route path="/getBuildingProfile" element={<Building />} />
        <Route path="/customerSupport">
            <Route path="" element={<GetCustomerSupport />} />
            <Route path="getChatbot" element={<GetChatbot />} />
            <Route path="getNoticeList" element={<ListNotice />} />
            <Route path="getNotice" element={<GetNotice />} />
            <Route path="addNoticeView" element={<AddNoticeView />} />
            <Route path="getReportList" element={<ListReport />} />
            <Route path="getReport" element={<GetReport />} />
            <Route path="addReport" element={<AddReport />} />
            <Route path="listImages" element={<ListImages />} />
            <Route path="getImage" element={<GetImage />} />
            <Route path="deleteBadFeed" element={<DeleteBadFeed />} />
        </Route>
        <Route path="/setting/:memberId" element={<MemberSetting />} />
        <Route path="/feed">
            <Route path="feedList" element={<FeedList />} />
            <Route path="feedDetail" element={<FeedDetail />} />
            <Route path="feedForm" element={<FeedForm />} />
        </Route>
    </Routes>
    </AuthLoader>
    </CSSTransition>
    </TransitionGroup>
    )
};

export default AppRoutes;
