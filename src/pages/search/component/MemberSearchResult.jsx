import { useEffect, useState } from "react";
import styles from "../../../assets/css/module/search/component/MemberSearchResult.module.css";
import { useNavigate } from "react-router-dom";
import useEncryptId from "../../member/hook/useEncryptId";
import { abbreviateLongString } from "../../../util/stringUtil";

const SAMPLE_DATA = [];

for (let i = 0; i < 5; i++) {
  SAMPLE_DATA.push({
    profilePhotoUrl: `profilePhotoUrl-${i}`,
    memberId: `memberId-${i}`,
    nickname: `nickname-${i}`,
    following: `following-${i}`,
    followed: `followed-${i}`,
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
 *   infScrollTargetRef;
 * }} props
 */
export default function MemberSearchResult({
  searchResult,
  infScrollTargetRef,
}) {
  return (
    <div className="list-container">
      {searchResult &&
        searchResult.map((data, idx) => (
          <div
              key={`search-item-${idx}`}
              className="list-container-item"
          >
            <MemberSearchResultItem
              profilePhotoUrl={data.profilePhotoUrl}
              memberId={data.memberId}
              nickname={data.nickname}
              following={data.following}
              follower={data.follower}
              infScrollTargetRef={
                idx + 1 === searchResult.length ? infScrollTargetRef : null
              }
            />
            <hr className="search-item-divider" />
          </div>
        ))}
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
  following,
  infScrollTargetRef,
}) {
  const navigate = useNavigate();
  const { encryptedData, ivData } = useEncryptId(memberId);
  return (
    <div
      ref={infScrollTargetRef}
      className={styles.memberItemContainer}
      onClick={() =>
        navigate(`/member/getMemberProfile/${encryptedData}/${ivData}`)
      }
    >
      <div className={styles.memberSearchProfileContainer}>
        <img className={styles.memberSearchProfilePhoto} src={profilePhotoUrl} alt="Profile" />
        <div className={styles.memberNameContainer}>
          <div className={styles.nickname}>{abbreviateLongString(nickname, 14)}</div>
          <div className={styles.memberId}>{abbreviateLongString(memberId, 14)}</div>
        </div>
      </div>
      <div className={styles.relationshipContainer}>
        {following && <div>내가 팔로우하는 회원</div>}
        {follower && <div>나를 팔로우하는 회원</div>}
      </div>
    </div>
  );
}
