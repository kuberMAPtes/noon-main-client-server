import { useEffect, useState } from "react";

const SAMPLE_DATA = [];

for (let i = 1; i <= 5; i++) {
  SAMPLE_DATA.push({
    writer: {
      nickname: `nickname-${i}`,
      profilePhotoUrl: `url-${i}`
    },
    writtenTime: new Date() - i * i * i,
    title: `title-${i}`,
    text: `text-${i}`,
    buildingName: `buildingName-${i}`,
    thumnailUrl: `thumbnailUrl-${i}`
  });
}

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
 *   }[],
 *   pageCallback: () => void
 * }} props
 */
export default function FeedSearchResult({
  searchResult,
  pageCallback
}) {
  const [feedData, setFeedData] = useState(SAMPLE_DATA);

  return (
    <div>
      {
        feedData.map((data, idx) => (
          <FeedSearchResultItem
            key={`feed-item-${idx}`}
            writer={data.writer}
            writtenTime={data.writtenTime}
            title={data.title}
            text={data.text}
            buildingName={data.buildingName}
            thumbnailUrl={data.thumbnailUrl}
          />
        ))
      }
    </div>
  )
}

/**
 * @param {{
*   writer: {
*     nickname: string;
*     profilePhotoUrl: string;
*   },
*   writtenTime: Date;
*   title: string;
*   text: string;
*   buildingName: string;
*   thumbnailUrl: string;
* }} prop
*/
function FeedSearchResultItem({
  writer, writtenTime, title, text, buildingName, thumbnailUrl
}) {
  const periodInSeconds = (new Date() - writtenTime) / 1000;
  let display;
  console.log("thumbnailUrl:", thumbnailUrl);

  if (periodInSeconds < MINUTE) {
    display = `${Math.round(periodInSeconds)}초 전`
  } else if (periodInSeconds < HOUR) {
    display = `${Math.round(periodInSeconds / MINUTE)}분 전`
  } else if (periodInSeconds < DAY) {
    display = `${Math.round(periodInSeconds / HOUR)}시간 전`
  } else {
    display = `${writtenTime.getFullYear()}/${writtenTime.getMonth() + 1}/${writtenTime.getDate()}`
  }

  return (
    <div>
      <img src={writer.profilePhotoUrl} alt="Profile" />
      <p>{writer.nickname}</p>
      <p>{display}</p>
      <p>{buildingName}</p>
      <p>{title}</p>
      <p>
        {text.length > TEXT_MAX_LENGTH
          ? `${text.substring(0, TEXT_MAX_LENGTH)}...`
          : text}
      </p>
      {thumbnailUrl && <img src={thumbnailUrl} alt="thumbnail"/>}
    </div>
  )
}
