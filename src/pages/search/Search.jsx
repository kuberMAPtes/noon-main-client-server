import { useState } from "react";
import SearchBar from "../../components/common/SearchBar";
import SearchModeTab, { modes } from "./component/SearchModeTab";
import FeedSearchResult from "./component/FeedSearchResult";
import BuildingSearchResult from "./component/BuildingSearchResult";
import ChatroomSearchResult from "./component/ChatroomSearchResult";
import MemberSearchResult from "./component/MemberSearchResult";
import searchFeed from "./axios/searchFeed";
import searchBuilding from "./axios/searchBuilding";
import searchChatroom from "./axios/searchChatroom";
import searchMember from "./axios/searchMember";
import "../../assets/css/module/search/Search.css";

export default function Search() {
  const [searchKeyword, setSearchKeyword] = useState("");
  const [currentSearchMode, setCurrentSearchMode] = useState(modes.INTEGRATION);
  const [searchResult, setSearchResult] = useState({
    2: [],
    3: [],
    4: {},
    5: {}
  });
  const [page, setPage] = useState(1);
  
  // TODO
  const SAMPLE_MEMBER = "member_2";

  console.log(searchResult);

  let searchFunction;
  let component;
  switch (currentSearchMode) {
    case modes.FEED:
      component = <FeedSearchResult key="feed-search-result" pageCallback={() => setPage(page + 1)} searchResult={searchResult[modes.FEED]} />;
      searchFunction = searchFeed;
      break;
    case modes.BUILDING:
      component = <BuildingSearchResult key="building-search-result" pageCallback={() => setPage(page + 1)} searchResult={searchResult[modes.BUILDING]} />;
      searchFunction = searchBuilding;
      break;
    case modes.CHATROOM:
      component = <ChatroomSearchResult key="chatroom-search-result" pageCallback={() => setPage(page + 1)} searchResult={searchResult[modes.CHATROOM]} />;
      searchFunction = searchChatroom
      break;
    case modes.MEMBER:
      component = <MemberSearchResult key="member-search-result" pageCallback={() => setPage(page + 1)} searchResult={searchResult[modes.MEMBER]} />;
      searchFunction = searchMember;
      break;
    default:
      component = <p>통합검색창</p>;
      searchFunction = () => {};
  }

  function onSearch() {
    searchFunction(searchKeyword, page, (data) => {
      console.log(data);
      console.log(currentSearchMode);
      const newSearchResult = {...searchResult};
      newSearchResult[currentSearchMode] = data;
      console.log(newSearchResult);
      setSearchResult(newSearchResult);
    }, SAMPLE_MEMBER);
  }

  return (
    <div className="container">
      <SearchBar typeCallback={(text) => setSearchKeyword(text)} searchCallback={onSearch} />
      <SearchModeTab currentSearchMode={currentSearchMode} onModeChange={(mode) => setCurrentSearchMode(mode)} />
      {component}
    </div>
  );
}
