import { useNavigate } from "react-router-dom";
import "../../../assets/css/module/search/component/BuildingSearchResult.css";

/**
 * @param {{
 *   searchResult: {
 *     buildingId: number;
 *     buildingName: string;
 *     roadAddr: string;
 *     feedAiSummary: string;
 *     liveliestChatroomDto: {
 *       chatroomName: string;
 *       liveliness: string;
 *     }
 *   }[],
 *   infScrollTargetRef
 * }} props
 */
export default function BuildingSearchResult({
  searchResult,
  infScrollTargetRef
}) {

  return (
    <div className="scroll list-container">
      {
        searchResult && searchResult.map((data, idx) =>
            <BuildingSearchResultItem
                key={`building-item-${idx}`}
                buildingId={data.buildingId}
                buildingName={data.buildingName}
                liveliestChatroomDto={data.liveliestChatroomDto}
                roadAddr={data.roadAddr}
                feedAiSummary={data.feedAiSummary}
                infScrollTargetRef={idx + 1 === searchResult.length ? infScrollTargetRef : null}
            />)
      }
    </div>
  );
}

/**
 * 
 * @param {{
 *   buildingId: number;
 *   buildingName: string;
 *   roadAddr: string;
 *   feedAiSummary: string;
 *   liveliestChatroomDto: {
 *     chatroomName: string;
 *     liveliness: string;
 *   }
 * }} props 
*/
function BuildingSearchResultItem({
  buildingId,
  buildingName,
  roadAddr,
  feedAiSummary,
  liveliestChatroomDto,
  infScrollTargetRef
}) {
  const navigate = useNavigate();
  console.log(buildingName);
  console.log(roadAddr);
  console.log(feedAiSummary);
  console.log(liveliestChatroomDto);
  return (
    <div
        className="building-item-container item-container"
        onClick={() => navigate(`/getBuildingProfile/${buildingId}`)}
        ref={infScrollTargetRef}
    >
      <h3>{buildingName}</h3>
      <div>
        <div className="icon-title">
          <img src="./image/chat.png" alt="chat" />
          <div>{liveliestChatroomDto.chatroomName}</div>
        </div>
        <div className="icon-title">
          <img src="./image/address.png" alt="address" />
          <div>{roadAddr}</div>
        </div>
      </div>
    </div>
  );
}
