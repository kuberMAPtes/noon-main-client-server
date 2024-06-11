const MINUTE = 60;
const HOUR = MINUTE * 60;
const DAY = HOUR * 24;
const TEXT_MAX_LENGTH = 30;

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
 *   thumnailUrl: string;
 * }} prop
 */
export default function FeedSearchResult({
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
