import React, { useEffect, useState } from "react";
import LogoutForm from "./component/LogoutForm";
import { FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa";
import { useLocation, useParams } from "react-router-dom";
import { getMemberProfile } from "./function/memberAxios";
import { useSelector } from "react-redux";

// 누군가 http://127.0.0.1:3000/member/getMemberProfile/{toId}로 요청해야함.
const GetMemberProfile = () => {
  const authorization = useSelector((state) => state.auth.authorization);
  const fromId = useSelector((state) => state.auth.member.memberId);
  const { toId } = useParams(); // :3000/member/getMemberProfile/{toId}URL 파라미터 가져오기
  
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    console.log("Authorization:", authorization);
    console.log("From ID:", fromId);
    console.log("To ID:", toId);
    getMemberProfileData(authorization, fromId, toId);
  }, [authorization, fromId, toId]);

  const getMemberProfileData = async (authorization, fromId, toId) => {
    console.log("Fetching member profile with:");
    console.log("Authorization:", authorization);
    console.log("From ID:", fromId);
    console.log("To ID:", toId);
    setLoading(true);
    setError(null);
    try {
      const response = await getMemberProfile(authorization, fromId, toId);
      console.log("Profile data:", response.data.info);
      setProfile(response.data.info);
    } catch (error) {
      console.error("Error fetching member profile:", error);
      setError("Error fetching member profile: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1>Member Profile</h1>
      {loading ? (
        <p>Loading profile for member ID: {toId}</p>
      ) : error ? (
        <p>{error}</p>
      ) : profile ? (
        <div>
          <p>Member ID: {profile.memberId}</p>
          <p>Name: {profile.nickname}</p>
          <p>DajungScore : {profile.dajungScore}</p>
            <p>Profile photo URL: {profile.profilePhotoUrl}</p>
            <p>Profile intro: {profile.profileIntro}</p>
        <p>feedDtoList : {profile.feedDtoList}</p>
          {/* 여기에 더 많은 프로필 정보를 추가할 수 있습니다 */}
        </div>
      ) : (
        <p>No profile data available.</p>
      )}
      <div>
        <a
          href="https://www.facebook.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaFacebook size={30} />
        </a>
        <a
          href="https://www.twitter.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaTwitter size={30} />
        </a>
        <a
          href="https://www.instagram.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaInstagram size={30} />
        </a>
      </div>
      {/* 다른 프로필 내용들... */}

      <LogoutForm />
    </div>
  );
};

export default GetMemberProfile;
