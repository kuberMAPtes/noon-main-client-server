import { useNavigate } from "react-router-dom";
import "../../../assets/css/module/search/component/ChatroomSearchResult.css";

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
 *   };
 *   infScrollTargetRef;
 * }} props
 */
export default function ChatroomSearchResult({
  searchResult,
  infScrollTargetRef
}) {
  console.log(searchResult);
  return (
    <div className="scroll list-container">
      {
        searchResult && searchResult.map((data, idx) => (
          <CharoomSearchResultItem
            key={`chatroom-item-${idx}`}
            chatroomId={data.chatroomId}
            chatroomName={data.chatroomName}
            participantCount={data.participantCount}
            buildingName={data.buildingName}
            roadAddr={data.roadAddr}
            chatroomCreatorId={data.chatroomCreatorId}
            chatroomType={data.chatroomType}
            chatroomMinTemp={data.chatroomMinTemp}
            infScrollTargetRef={idx + 1 === searchResult.length ? infScrollTargetRef : null}
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
  chatroomMinTemp,
  infScrollTargetRef
}) {
  const navigate = useNavigate();
  return (
    <div
        className="item-container chatroom-item-container"
        onClick={() => navigate(`/chat/chatroom?chatroomID=${chatroomId}`)}
        ref={infScrollTargetRef}
    >
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
