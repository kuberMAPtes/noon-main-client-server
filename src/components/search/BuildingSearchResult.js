/**
 * 
 * @param {{
 *   buildingName: string;
 *   liveliestChatroomName: string;
 *   roadAddress: string;
 * }} props 
 */
export default function BuildingSearchResult({
  buildingName,
  liveliestChatroomName,
  roadAddress
}) {
  return (
    <div>
      <p>{buildingName}</p>
      <p>{liveliestChatroomName}</p>
      <p>{roadAddress}</p>
    </div>
  );
}
