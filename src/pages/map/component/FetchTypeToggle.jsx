/**
 * @param props
 * @returns JSX.Element
 */
export default function FetchTypeToggle({
  subscriptionChecked, setSubscriptionChecked, popBuildingChecked, setPopBuildingChecked
}) {

  function onSubscriptionDisplayCheckboxChange(e) {
    setSubscriptionChecked(e.target.checked);
  }
  
  function onPopularDisplayCheckboxChange(e) {
    setPopBuildingChecked(e.target.checked);
  }
  
  return (
    <div style={{ display: "flex" }}>
      <p>구독한 건물 보기</p>
      <input
          type="checkbox"
          checked={subscriptionChecked}
          onChange={(e) => onSubscriptionDisplayCheckboxChange(e)} />
      <p>인기건물보기</p>
      <input
          type="checkbox"
          checked={popBuildingChecked}
          onChange={(e) => onPopularDisplayCheckboxChange(e)} />
    </div>
  );
}