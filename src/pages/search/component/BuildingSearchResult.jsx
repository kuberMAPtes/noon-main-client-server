import { useEffect, useState } from "react";

const SAMPLE_DATA = [
  {
    buildingName: "name1",
    liveliestChatroomName: "chatroom1",
    roadAddress: "서울시 영등포구"
  },
  {
    buildingName: "name2",
    liveliestChatroomName: "chatroom2",
    roadAddress: "서울시 영등포구"
  },
  {
    buildingName: "name3",
    liveliestChatroomName: "chatroom3",
    roadAddress: "서울시 영등포구"
  },
  {
    buildingName: "name4",
    liveliestChatroomName: "chatroom4",
    roadAddress: "서울시 영등포구"
  }
]

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
    <div>
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
    <div>
      <p>{buildingName}</p>
      <p>{liveliestChatroomDto.chatroomName}</p>
      <p>{roadAddr}</p>
    </div>
  );
}
