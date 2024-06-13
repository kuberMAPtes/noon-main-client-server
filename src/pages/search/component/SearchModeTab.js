export const modes = {
  INTEGRATION: 1,
  FEED: 2,
  BUILDING: 3,
  CHATROOM: 4,
  MEMBER: 5
};

const tabTitles = {
  1: "통합",
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
    <div>
      {Object.keys(modes).map((key) => (
        <button type="button" key={key}
            onClick={() => onModeChange(modes[key])}>
          {tabTitles[modes[key]]}
          {
            currentMode === modes[key]
            ? <span>선택됨</span>
            : ""
          }
        </button>
      ))}
      {/* <button type="button" onClick={() => onModeChange(modes.INTEGRATION)}>
        통합
      </button>
      <button type="button" onClick={() => onModeChange(modes.FEED)}>
        피드
      </button>
      <button type="button" onClick={() => onModeChange(modes.BUILDING)}>
        건물
      </button>
      <button type="button" onClick={() => onModeChange(modes.CHATROOM)}>
        채팅방
      </button>
      <button type="button" onClick={() => onModeChange(modes.MEMBER)}>
        회원
      </button> */}
    </div>
  )
}

