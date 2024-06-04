import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Member from '../pages/member/Member';
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
const AppRoutes = () => {
  return (
    <Routes>
        <Route path="/member" element={<Member />}>
            <Route path="getAuthMain" element={<GetAuthMain />} />
            <Route path="getSignUpTermAgreement" element={<GetSignUpTermAgreement/>}/>
            <Route path="addPhoneNumberAuthentification" element={<AddPhoneNumberAuthentification />} />
            <Route path="addMember" element={<AddMember />} />
            <Route path="addMemberResult" element={<AddMemberResult />} />
            <Route path="login" element={<Login/>}/>
            <Route path="updatePassword" element={<UpdatePassword />} />
            <Route path="updatePasswordResult" element={<UpdatePasswordResult />} />
            <Route path="getMember" element={<GetMember />} />
            <Route path="updateMember" element={<UpdateMember />} />
            <Route path="getMemberProfile" element={<GetMemberProfile/>}/>
            <Route path="getMemberRelationshipList" element={<GetMemberRelationshipList />} />
        </Route>
    </Routes>
  );
};

export default AppRoutes;
