import { useEffect, useState } from "react";
import "../../../assets/css/module/search/component/MemberSearchResult.css";

const SAMPLE_DATA = [];

for (let i = 0; i < 5; i++) {
  SAMPLE_DATA.push({
    profilePhotoUrl: `profilePhotoUrl-${i}`,
    memberId: `memberId-${i}`,
    nickname: `nickname-${i}`,
    following: `following-${i}`,
    followed: `followed-${i}`
  });
}

/**
 * @param {{
 *   searchResult: {
 *     totalPages: number;
 *     totalElements: number;
 *     size: number;
 *     content: {
 *       memberId: string;
 *       nickname: string;
 *       phoneNumber: string;
 *       profilePhotoUrl: string;
 *       profileIntro: string;
 *       follower: boolean;
 *       following: boolean;
 *     }[]
 *   },
 *   pageCallback: () => void;
 * }} props
 */
export default function MemberSearchResult({
  searchResult,
  pageCallback
}) {

  return (
    <div className="list-container">
      {
        searchResult?.info?.content && searchResult.info.content.map((data, idx) => (
          <MemberSearchResultItem
            key={`member-data-${idx}`}
            profilePhotoUrl={data.profilePhotoUrl}
            memberId={data.memberId}
            nickname={data.nickname}
            following={data.following}
            followed={data.followed}
          />
        ))
      }
    </div>
  );
}

/**
 * @param {{
 *   memberId: string;
 *   nickname: string;
 *   phoneNumber: string;
 *   profilePhotoUrl: string;
 *   profileIntro: string;
 *   follower: boolean;
 *   following: boolean;
 * }} props
 */
function MemberSearchResultItem({
  memberId,
  nickname,
  phoneNumber,
  profilePhotoUrl,
  profileIntro,
  follower,
  following
}) {
  return (
    <div className="member-item-container">
      <img src={profilePhotoUrl} alt="Profile" />
      <div className="member-name-container">
        <div className="nickname">{nickname}</div>
        <div className="member-id">{memberId}</div>
      </div>
      <div className="relationship-container">
        {following && <div>내가 팔로우하는 회원</div>}
        {follower && <div>나를 팔로우하는 회원</div>}
      </div>
    </div>
  );
}
