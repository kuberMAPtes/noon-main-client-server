import { useEffect, useState } from "react";

const SAMPLE_DATA = []

for (let i = 0; i <= 5; i++) {
  SAMPLE_DATA.push({
    chatroomName: `chatroomName-${i}`,
    participantCount: i + 13,
    buildingName: `buildingName-${i}`,
    roadAddress: `서울시 영등포구`
  });
}

/**
 * @param {{
 *   searchResult: {
 *     totalPages: number;
 *     totalElements: number;
 *     size: number;
 *     content: {
 *       chatroomID: number;
 *       chatroomMinTemp: number;
 *       chatroomName: string;
 *       chatroomCreatorId: string;
 *       chatroomType: string;
 *     }[]
 *   }
 * }} props
 */
export default function ChatroomSearchResult({
  searchResult
}) {
  const [chatroomData, setChatroomData] = useState(SAMPLE_DATA);

  return (
    <div>
      {
        chatroomData.map((data, idx) => (
          <CharoomSearchResultItem
            key={`chatroom-item-${idx}`}
            chatroomData={data.chatroomData}
            participantCount={data.participantCount}
            buildingName={data.buildingName}
            roadAddress={data.roadAddress}
          />
        ))
      }
    </div>
  );
}

/**
 * @param {{
 *   chatroomName: string;
 *   participantCount: number;
 *   buildingName: string;
 *   roadAddress: string;
 * }} props
 */
function CharoomSearchResultItem({
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
