import { useEffect, useState } from "react";
import "../../../assets/css/module/search/component/BuildingSearchResult.css";

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
 *   },
 *   pageCallback: () => void;
 * }} props
 */
export default function ChatroomSearchResult({
  searchResult,
  pageCallback
}) {
  console.log(searchResult);
  return (
    <div className="list-container">
      {
        searchResult && searchResult.content && searchResult.content.map((data, idx) => (
          <CharoomSearchResultItem
            key={`chatroom-item-${idx}`}
            chatroomId={data.chatroomID}
            chatroomName={data.chatroomName}
            chatroomMinTemp={data.chatroomMinTemp}
            chatroomCreatorId={data.chatroomCreatorId}
            chatroomType={data.chatroomType}
          />
        ))
      }
    </div>
  );
}

/**
 * @param {{
 *   chatroomId: number;
 *   chatroomName: string;
 *   chatroomMinTemp: number;
 *   chatroomCreatorId: string;
 *   chatroomType: string;
 * }} props
 */
function CharoomSearchResultItem({
  chatroomId, chatroomName, chatroomMinTemp, chatroomCreatorId, chatroomType
}) {
  return (
    <div className="item-container chatroom-item-container">
      <div className="info">
        <h3>{chatroomName}</h3>
        <div className="txt">{chatroomCreatorId}</div>
      </div>
    </div>
  );
}
