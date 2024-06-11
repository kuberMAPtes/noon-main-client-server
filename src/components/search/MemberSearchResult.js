/**
 * @param {{
 *   profilePhotoUrl: string;
 *   memberId: string;
 *   nickname: string;
 *   following: boolean;
 *   followed: boolean;
 * }} props
 */
export default function MemberSearchResult({
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
