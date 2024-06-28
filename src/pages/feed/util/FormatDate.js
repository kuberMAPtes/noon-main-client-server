const FormatDate = () => {
  const formatDateForMySQL = (date) => {
    const padZero = (num) => num.toString().padStart(2, "0");
    const year = date.getFullYear();
    const month = padZero(date.getMonth() + 1);
    const day = padZero(date.getDate());
    const hours = padZero(date.getHours());
    const minutes = padZero(date.getMinutes());
    const seconds = padZero(date.getSeconds());
    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  };

  return formatDateForMySQL;
};

export default FormatDate;
