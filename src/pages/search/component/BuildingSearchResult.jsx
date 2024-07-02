import { useNavigate } from "react-router-dom";
import styles from "../../../assets/css/module/search/component/BuildingSearchResult.module.css";
import { abbreviateLongString } from "../../../util/stringUtil";

/**
 * @param {{
 *   searchResult: {
 *     buildingId: number;
 *     buildingName: string;
 *     roadAddr: string;
 *     feedAiSummary: string;
 *     liveliestChatroomDto: {
 *       chatroomName: string;
 *       liveliness: string;
 *     }
 *   }[],
 *   infScrollTargetRef,
 *   searchResultContainerRef
 * }} props
 */
export default function BuildingSearchResult({
  searchResult,
  infScrollTargetRef,
  searchResultContainerRef
}) {

  return (
    <div className="scroll list-container" ref={searchResultContainerRef}>
      {
        searchResult && searchResult.map((data, idx) => (
          <div
              key={`search-item-${idx}`}
              className="list-container-item"
          >
            <BuildingSearchResultItem
                key={`building-item-${idx}`}
                buildingId={data.buildingId}
                buildingName={data.buildingName}
                roadAddr={data.roadAddr}
                feedAiSummary={data.feedAiSummary}
                infScrollTargetRef={idx + 1 === searchResult.length ? infScrollTargetRef : null}
            />
            <hr className="search-item-divider" />
          </div>
        ))
      }
    </div>
  );
}

/**
 * 
 * @param {{
 *   buildingId: number;
 *   buildingName: string;
 *   roadAddr: string;
 *   feedAiSummary: string;
 * }} props 
*/
function BuildingSearchResultItem({
  buildingId,
  buildingName,
  roadAddr,
  feedAiSummary,
  infScrollTargetRef
}) {
  const navigate = useNavigate();
  return (
    <div
        className={styles.buildingItemContainer}
        onClick={() => navigate(`/getBuildingProfile/${buildingId}`)}
        ref={infScrollTargetRef}
    >
      <h3>{abbreviateLongString(buildingName, 9)}</h3>
      <div>
        <div className="icon-title">
          <img src="./image/address.png" alt="address" />
          <div>{abbreviateLongString(roadAddr, 13)}</div>
        </div>
      </div>
    </div>
  );
}
