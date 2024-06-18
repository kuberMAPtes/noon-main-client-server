import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
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

import Building from '../pages/building/Building2';
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

import FeedList from "../pages/feed/FeedListPage";
import FeedDetail from "../pages/feed/FeedDetailPage";
import FeedForm from "../pages/feed/FeedFormPage";
import FeedPages from '../pages/feed/FeedPages';

const AppRoutes = () => {
  return (
    <Routes>
        <Route path="/member">
            <Route path="getAuthMain" element={<GetAuthMain />} />
            <Route path="getSignUpTermAgreement" element={<GetSignUpTermAgreement/>}/>
            <Route path="addPhoneNumberAuthentification" element={<AddPhoneNumberAuthentification />} />
            <Route path="addMember" element={<AddMember />} />
            <Route path="addMemberResult" element={<AddMemberResult />} />
            <Route path="login" element={<Login/>}/>
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
            <Route path="getMemberProfile/:toId" element={
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
            <Route path="list" element={<FeedList />} />
            <Route path="detail" element={<FeedDetail />} />
            <Route path="form" element={<FeedForm />} />
            <Route path="" element={<FeedPages />} />
        </Route>
    </Routes>
    )
};

export default AppRoutes;
