import { useEffect, useState } from "react";

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
 *   searchResult: {};
 * }} props
 */
export default function MemberSearchResult({
  searchResult
}) {
  const [memberData, setMemberData] = useState(SAMPLE_DATA);

  return (
    <div>
      {
        memberData.map((data, idx) => (
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
 *   profilePhotoUrl: string;
 *   memberId: string;
 *   nickname: string;
 *   following: boolean;
 *   followed: boolean;
 * }} props
 */
function MemberSearchResultItem({
  profilePhotoUrl,
  memberId,
  nickname,
  following,
  followed
}) {
  return (
    <div>
      <img src={profilePhotoUrl} alt="Profile" />
      <p>{memberId}</p>
      <p>{nickname}</p>
      <div>
        {following && <p>팔로잉</p>}
        {followed && <p>팔로워</p>}
      </div>
    </div>
  );
}
