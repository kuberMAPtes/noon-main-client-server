import { useNavigate } from "react-router-dom";
import styles from "../../../assets/css/module/search/component/ChatroomSearchResult.module.css";
import { abbreviateLongString } from "../../../util/stringUtil";
import { FaBuilding } from "react-icons/fa";

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
 *   searchResultContainerRef;
 * }} props
 */
export default function ChatroomSearchResult({
  searchResult,
  infScrollTargetRef,
  searchResultContainerRef
}) {
  console.log(searchResult);
  return (
    <div className="scroll list-container" ref={searchResultContainerRef}>
      {
        searchResult && searchResult.map((data, idx) => (
          <div
              key={`search-item-${idx}`}
              className="list-container-item"
          >
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
            <hr className="search-item-divider" />
          </div>
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
        className={styles.chatroomItemContainer}
        onClick={() => navigate(`/chat/chatroom?chatroomID=${chatroomId}`)}
        ref={infScrollTargetRef}
    >
      <div className={styles.info}>
        <h3>{abbreviateLongString(chatroomName)}</h3>
        <div className="icon-title">
          <img src="./image/chat-participants.png" alt="chat participants" />
          <div>{participantCount}</div>
        </div>
      </div>
      <div className={`${styles.info} ${styles.metadata}`}>
        <div className="icon-title">
          <FaBuilding />
          <div>{buildingName}</div>
        </div>
        <div className="icon-title">
          <img src="/image/address.png" alt="address" />
          <div>{abbreviateLongString(roadAddr, 13)}</div>
        </div>
        <div>{chatroomCreatorId}</div>
      </div>
    </div>
  );
}
