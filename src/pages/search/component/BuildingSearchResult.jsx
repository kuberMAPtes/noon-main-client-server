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
 *   searchResult: {}
 * }} props
 */
export default function BuildingSearchResult({
  searchResult
}) {
  const [buildingData, setBuildingData] = useState(SAMPLE_DATA);

  return (
    <div>
      {
        buildingData.map((data, idx) =>
            <BuildingSearchResultItem
                key={`building-item-${idx}`}
                buildingName={data.builidngName}
                liveliestChatroomName={data.liveliestChatroomName}
                roadAddress={data.roadAddress}
            />)
      }
    </div>
  );
}

/**
 * 
 * @param {{
 *   buildingName: string;
 *   liveliestChatroomName: string;
 *   roadAddress: string;
 * }} props 
*/
function BuildingSearchResultItem({
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
