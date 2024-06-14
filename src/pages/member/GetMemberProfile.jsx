import React, { useEffect, useState } from "react";
import LogoutForm from "./component/LogoutForm";
import { FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa";

import { getMemberProfile } from "./function/memberAxios";
import { useSelector } from "react-redux";
import { decryptWithIv } from "../../util/crypto";
import { useParams } from "react-router-dom";

const GetMemberProfile = () => {
  console.log("#### GetMemberProfile 렌더링");
  
  const authorization = useSelector((state) => state.auth.authorization);
  const fromId = useSelector((state) => state.auth.member.memberId);
  const { encryptedToId, IV } = useParams();


  const [toId, setToId] = useState(null);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const decryptToId = (encryptedToId, IV) => {
    try {
      return decryptWithIv(decodeURIComponent(encryptedToId), decodeURIComponent(IV));
    } catch (error) {
      console.error("Error decrypting toId: ", error);
      setError("Error decrypting toId");
      setLoading(false);
      return null;
    }
  };

  useEffect(() => {
    
    console.log("URL Parameters - encryptedToId:", encryptedToId, "IV:", IV);
    if (encryptedToId && IV) {
      const decryptedToId = decryptToId(encryptedToId, IV);
      console.log("Decrypted toId: ", decryptedToId);
      setToId(decryptedToId);
    }
  }, [encryptedToId, IV]);

  useEffect(() => {
    if (authorization && fromId && toId) {
      console.log("Fetching member profile data", "Authorization:", authorization, "From ID:", fromId, "To ID:", toId);
      const fetchMemberProfile = async () => {
        setLoading(true);
        setError(null);
        try {
          const response = await getMemberProfile(fromId, toId);
          console.log("Profile data:", response);
          setProfile(response);
        } catch (error) {
          console.error("Error fetching member profile:", error);
          setError("Error fetching member profile: " + error.message);
        } finally {
          setLoading(false);
        }
      };
      fetchMemberProfile();
    }
  }, [authorization, toId, fromId]);

  return (
    <div>
        <LogoutForm />
      <h1>Member Profile</h1>
      {loading ? (
        <p>Loading profile...</p>
      ) : error ? (
        <p>{error}</p>
      ) : profile ? (
        <div>
          <p>Member ID: {profile.memberId}</p>
          <p>Name: {profile.nickname}</p>
          <p>DajungScore: {profile.dajungScore}</p>
          <p>Profile photo URL: {profile.profilePhotoUrl}</p>
          <p>Profile intro: {profile.profileIntro}</p>

          <p>
            feedDtoList:
            {profile.feedDtoList &&
              profile.feedDtoList.map((feed) => (
                <div key={feed.feedId}>
                  피드제목<h2>{feed.title}</h2>
                  빌딩이름{feed.buildingName}
                  <p>피드내용{feed.feedText}</p>
                  <p>작성자: {feed.writerNickname}</p>
                  <p>작성 시간: {feed.writtenTime}</p>
                  {feed.feedAttachementURL && (
                    <img src={feed.feedAttachementURL} alt="첨부 이미지" />
                  )}
                </div>
              ))}
          </p>
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
      
    </div>
  );
};

export default GetMemberProfile;
