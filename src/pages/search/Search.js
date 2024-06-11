import { useState } from "react";
import SearchWindow from "../../components/common/SearchWindow";
import SearchModeTab, { modes } from "../../components/search/SearchModeTab";
import FeedSearchResult from "../../components/search/FeedSearchResult";

export default function Search() {
  const [searchKeyword, setSearchKeyword] = useState("");
  const [currentSearchMode, setCurrentSearchMode] = useState(modes.INTEGRATION);

  function onSearch() {
    // TODO
    console.log("searchKeyword=" + searchKeyword);
  }

  return (
    <div>
      <SearchWindow typeCallback={(text) => setSearchKeyword(text)} searchCallback={onSearch} />
      <SearchModeTab currentSearchMode={currentSearchMode} onModeChange={(mode) => setCurrentSearchMode(mode)} />
    </div>
  );
}
