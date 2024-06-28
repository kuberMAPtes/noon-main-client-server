import mapStyles from "../../../assets/css/module/map/BMap.module.css";

/**
 * @param props
 * @returns JSX.Element
 */
export default function FetchTypeToggle({
  subscriptionChecked, setSubscriptionChecked, popBuildingChecked, setPopBuildingChecked
}) {
  
  return (
    <div className={mapStyles.fetchTypeContainer}>
      <div
          className={`check-container${subscriptionChecked ? "" : " unchecked"}`}
          onClick={() => setSubscriptionChecked((prevState) => !prevState)}
      >
        <div>구독</div>
      </div>
    </div>
  );
}