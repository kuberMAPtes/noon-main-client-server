import { useState } from "react";
import SearchBar from "../../components/common/SearchBar";
import SearchModeTab, { modes } from "./component/SearchModeTab";
import FeedSearchResult from "./component/FeedSearchResult";
import BuildingSearchResult from "./component/BuildingSearchResult";
import ChatroomSearchResult from "./component/ChatroomSearchResult";
import MemberSearchResult from "./component/MemberSearchResult";

export default function Search() {
  const [searchKeyword, setSearchKeyword] = useState("");
  const [currentSearchMode, setCurrentSearchMode] = useState(modes.INTEGRATION);

  function onSearch() {
    // TODO
    console.log("searchKeyword=" + searchKeyword);
    console.log("API 요청");
  }

  let component;
  switch (currentSearchMode) {
    case modes.FEED:
      component = <FeedSearchResult key="feed-search-result" />;
      break;
    case modes.BUILDING:
      component = <BuildingSearchResult key="building-search-result" />;
      break;
    case modes.CHATROOM:
      component = <ChatroomSearchResult key="chatroom-search-result" />;
      break;
    case modes.MEMBER:
      component = <MemberSearchResult key="member-search-result" />;
      break;
    default:
      component = <p>통합검색창</p>;
  }

  return (
    <div>
      <SearchBar typeCallback={(text) => setSearchKeyword(text)} searchCallback={onSearch} />
      <SearchModeTab currentSearchMode={currentSearchMode} onModeChange={(mode) => setCurrentSearchMode(mode)} />
      {component}
    </div>
  );
}
