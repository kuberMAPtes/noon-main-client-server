export default function FetchTypeToggle() {

  function onSubscriptionDisplayCheckboxChange(e) {
    const checked = e.target.checked;
    // TODO: API 요청
  }
  
  function onPopularDisplayCheckboxChange(e) {
    const checked = e.target.checked;
    // TODO: API 요청
  }
  
  return (
    <div style={{ display: "flex" }}>
      <p>구독한 건물 보기</p>
      <input type="checkbox" onChange={(e) => onSubscriptionDisplayCheckboxChange(e)} />
      <p>인기건물보기</p>
      <input type="checkbox" onChange={(e) => onPopularDisplayCheckboxChange(e)} />
    </div>
  );
}