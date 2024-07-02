const MINUTE = 60;
const HOUR = MINUTE * 60;
const DAY = HOUR * 24;
const TEXT_MAX_LENGTH = 30;

const formatTime = (dateString) => {

    const writtenTime = new Date(dateString);
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

    return timeDisplay;

};

export default formatTime;
