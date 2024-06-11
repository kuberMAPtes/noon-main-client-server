/**
 * @param {{
 *   chatroomName: string;
 *   participantCount: number;
 *   buildingName: string;
 *   roadAddress: string;
 * }} props
 */
export default function CharoomSearchResult({
  chatroomName, participantCount, buildingName, roadAddress
}) {
  return (
    <div>
      <p>{chatroomName}</p>
      <p>{participantCount}</p>
      <p>{buildingName}</p>
      <p>{roadAddress}</p>
    </div>
  );
}
