import "../../../assets/css/module/search/component/SearchModeTab.css";

export const modes = {
  FEED: 2,
  BUILDING: 3,
  CHATROOM: 4,
  MEMBER: 5
};

const tabTitles = {
  2: "피드",
  3: "건물",
  4: "채팅방",
  5: "회원"
}

/**
 * @param {{ currentSearchMode: number; onModeChange: (mode: number) => void; }} prop
 */
export default function SearchModeTab({currentSearchMode: currentMode, onModeChange}) {

  return (
    <div className="search-mode-tab">
      {Object.keys(modes).map((key) => (
        <button
            className={`btn--search-mode${currentMode === modes[key] ? " mode-selected" : ""}`}
            type="button"
            key={key}
            onClick={() => onModeChange(modes[key])}>
          {tabTitles[modes[key]]}
        </button>
      ))}
    </div>
  )
}

