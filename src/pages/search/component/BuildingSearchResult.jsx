import "../../../assets/css/module/search/component/BuildingSearchResult.css";

/**
 * @param {{
 *   searchResult: {
 *     buildingName: "string",
 *     roadAddr: "string",
 *     feedAiSummary: "string",
 *     liveliestChatroomDto: {
 *       chatroomName: "string",
 *       liveliness: "string"
 *     }
 *   }[],
 *   pageCallback: () => void
 * }} props
 */
export default function BuildingSearchResult({
  searchResult,
  pageCallback
}) {

  return (
    <div className="list-container">
      {
        searchResult.map((data, idx) =>
            <BuildingSearchResultItem
                key={`building-item-${idx}`}
                buildingName={data.buildingName}
                liveliestChatroomDto={data.liveliestChatroomDto}
                roadAddr={data.roadAddr}
                feedAiSummary={data.feedAiSummary}
            />)
      }
    </div>
  );
}

/**
 * 
 * @param {{
 *   buildingName: "string",
 *   roadAddr: "string",
 *   feedAiSummary: "string",
 *   liveliestChatroomDto: {
 *     chatroomName: "string",
 *     liveliness: "string"
 *   }
 * }} props 
*/
function BuildingSearchResultItem({
  buildingName,
  roadAddr,
  feedAiSummary,
  liveliestChatroomDto
}) {
  console.log(buildingName);
  console.log(roadAddr);
  console.log(feedAiSummary);
  console.log(liveliestChatroomDto);
  return (
    <div className="building-item-container item-container">
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
