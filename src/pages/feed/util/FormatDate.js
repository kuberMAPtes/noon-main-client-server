const FormatDate = (writtenTime) => {
  const MINUTE = 60;
  const NOW = MINUTE / 2;
  const HOUR = MINUTE * 60;
  const DAY = HOUR * 24;
  const timestamp = new Date(writtenTime);

  const periodInSeconds = (new Date() - timestamp) / 1000;
  let timeDisplay;

  if (periodInSeconds < NOW) {
    timeDisplay = `방금 전`;
  } else if (periodInSeconds < MINUTE) {
    timeDisplay = `${Math.round(periodInSeconds)}초 전`;
  } else if (periodInSeconds < HOUR) {
    timeDisplay = `${Math.round(periodInSeconds / MINUTE)}분 전`;
  } else if (periodInSeconds < DAY) {
    timeDisplay = `${Math.round(periodInSeconds / HOUR)}시간 전`;
  } else {
    timeDisplay = `${timestamp.getFullYear()}/${
      timestamp.getMonth() + 1
    }/${timestamp.getDate()}`;
  }

  return timeDisplay;
};

export default FormatDate;
