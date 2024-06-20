import { useEffect, useState } from "react";
import "../../../assets/css/module/search/component/ChatroomSearchResult.css";

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
 *       chatroomId: number;
 *       chatroomName: string;
 *       participantCount: number;
 *       buildingName: string;
 *       roadAddr: string;
 *       chatroomCreatorId: string;
 *       chatroomType: string;
 *       chatroomMinTemp: number;
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
            participantCount={data.participantCount}
            buildingName={data.buildingName}
            roadAddr={data.roadAddr}
            chatroomCreatorId={data.chatroomCreatorId}
            chatroomType={data.chatroomType}
            chatroomMinTemp={data.chatroomMinTemp}
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
 *   participantCount: number;
 *   buildingName: string;
 *   roadAddr: string;
 *   chatroomCreatorId: string;
 *   chatroomType: string;
 *   chatroomMinTemp: number;
 * }} props
 */
function CharoomSearchResultItem({
  chatroomId,
  chatroomName,
  participantCount,
  buildingName,
  roadAddr,
  chatroomCreatorId,
  chatroomType,
  chatroomMinTemp
}) {
  return (
    <div className="item-container chatroom-item-container">
      <div className="info">
        <h3>{chatroomName}</h3>
        <div className="icon-title">
          <img src="./image/chat-participants.png" alt="chat participants" />
          <div>{participantCount}</div>
        </div>
      </div>
      <div className="info">
        <div>{buildingName}</div>
        <div>{roadAddr}</div>
        <div>{chatroomCreatorId}</div>
      </div>
    </div>
  );
}
