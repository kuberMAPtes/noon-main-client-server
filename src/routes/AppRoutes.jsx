import React from 'react';
import { Routes, Route } from 'react-router-dom';
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
import MemberSetting from "../pages/setting/MemberSetting";
// import Test from '../pages/Chat/Test';

import FeedList from "../pages/feed/FeedList";
import FeedDetail from "../pages/feed/FeedDetail";
import FeedForm from "../pages/feed/FeedForm";

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
        <Route path="/setting/:memberId" element={<MemberSetting />} />
        <Route path="/feed">
            <Route path="feedList" element={<FeedList />} />
            <Route path="feedDetail" element={<FeedDetail />} />
            <Route path="feedForm" element={<FeedForm />} />
        </Route>
    </Routes>
    )
};

export default AppRoutes;
