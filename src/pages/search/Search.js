import { useState } from "react";
import SearchWindow from "../../components/common/SearchWindow";

export default function Search() {
  const [searchKeyword, setSearchKeyword] = useState("");

  function onSearch() {
    // TODO
    console.log("searchKeyword=" + searchKeyword);
  }

  return (
    <div>
      <SearchWindow typeCallback={(text) => setSearchKeyword(text)} searchCallback={onSearch} />
    </div>
  );
}