import { useState } from "react";

export default function FetchTypeToggle() {
  const [subscriptionChecked, setSubscriptionChecked] = useState(true);
  const [popBuildingChecked, setPopBuildingChecked] = useState(true);

  function onSubscriptionDisplayCheckboxChange(e) {
    setSubscriptionChecked(e.target.checked);
    
  }
  
  function onPopularDisplayCheckboxChange(e) {
    setPopBuildingChecked(e.target.checked);
    // TODO: After API server implemented
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