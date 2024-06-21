import { useNavigate } from "react-router-dom";
import "../../../assets/css/module/search/component/FeedSearchResult.css";

const MINUTE = 60;
const HOUR = MINUTE * 60;
const DAY = HOUR * 24;
const TEXT_MAX_LENGTH = 30;

/**
 * @param {{
 *   searchResult: {
 *     feedId: number;
 *     writerId: string;
 *     writerNickname: string;
 *     title: string;
 *     feedText: string;
 *     buildingId: number;
 *     buildingName: string;
 *     writtenTime: string;
 *     feedAttachementURL: string;
 *     like: boolean;
 *     bookmark: boolean;
 *     mainActivated: boolean;
 *   }[];
 *   infScrollTargetRef;
 * }} props
 */
export default function FeedSearchResult({
  searchResult,
  infScrollTargetRef
}) {
  console.log(searchResult);
  return (
    <div className="scroll list-container">
      {
        searchResult && searchResult.map((data, idx) => (
          <FeedSearchResultItem
              key={`feed-search-${idx}`}
              feedId={data.feedId}
              writer={{
                nickname: data.writerNickname
              }}
              writtenTime={new Date(data.writtenTime)}
              title={data.title}
              text={data.feedText}
              buildingName={data.buildingName}
              thumbnailUrl={data.feedAttachementURL}
              infScrollTargetRef={idx + 1 === searchResult.length ? infScrollTargetRef : null}
          />
        ))
      }
    </div>
  )
}

/**
 * @param {{
 *  feedId: number;
 *  writer: {
 *    nickname: string;
 *  },
 *  writtenTime: Date;
 *  title: string;
 *  text: string;
 *  buildingName: string;
 *  thumbnailUrl: string;
* }} prop
*/
function FeedSearchResultItem({
  feedId, writer, writtenTime, title, text, buildingName, thumbnailUrl, infScrollTargetRef
}) {
  const navigate = useNavigate();
  const periodInSeconds = (new Date() - writtenTime) / 1000;
  let timeDisplay;

  if (periodInSeconds < MINUTE) {
    timeDisplay = `${Math.round(periodInSeconds)}초 전`
  } else if (periodInSeconds < HOUR) {
    timeDisplay = `${Math.round(periodInSeconds / MINUTE)}분 전`
  } else if (periodInSeconds < DAY) {
    timeDisplay = `${Math.round(periodInSeconds / HOUR)}시간 전`
  } else {
    timeDisplay = `${writtenTime.getFullYear()}/${writtenTime.getMonth() + 1}/${writtenTime.getDate()}`
  }

  return (
    <div
        className="item-container"
        onClick={() => navigate(`/feed/detail?feedId=${feedId}`)}
        ref={infScrollTargetRef}
    >
      <div className="feed-info">
        <div className="feed-metadata">
          <div className="sub-info">
            <div className="icon-title">
              <img src="./image/write.png" alt="write" />
              <div>{writer.nickname}</div>
            </div>
            <div className="icon-title">
              <img src="./image/clock.png" alt="clock" />
              <div>{timeDisplay}</div>
            </div>
          </div>
          <div>{buildingName}</div>
        </div>
        <div className="feed-content">
          <h4>{title}</h4>
          <p>
            {text.length > TEXT_MAX_LENGTH
              ? `${text.substring(0, TEXT_MAX_LENGTH)}...`
              : text}
          </p>
        </div>
      </div>
      {thumbnailUrl && <img src={thumbnailUrl} alt="thumbnail"/>}
    </div>
  )
}
