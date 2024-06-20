/**
 * @param props
 * @returns JSX.Element
 */
export default function FetchTypeToggle({
  subscriptionChecked, setSubscriptionChecked, popBuildingChecked, setPopBuildingChecked
}) {
  
  return (
    <div className="fetch-type-container">
      <div
          className={`check-container${subscriptionChecked ? "" : " unchecked"}`}
          onClick={() => setSubscriptionChecked((prevState) => !prevState)}
      >
        <input
            type="checkbox"
            checked={subscriptionChecked} />
        <div>구독한 건물 보기</div>
      </div>
      <div
          className={`check-container${popBuildingChecked ? "" : " unchecked"}`}
          onClick={() => setPopBuildingChecked((prevState) => !prevState)}
      >
        <input
            type="checkbox"
            checked={popBuildingChecked} />
        <div>인기건물보기</div>
      </div>
    </div>
  );
}