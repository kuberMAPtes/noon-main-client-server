import { useState } from "react";

export default function SearchWindow() {
  const [searchKeyword, setSearchKeyword] = useState("");

  function onFetchPlaces() {
    // TODO: API 요청
  }

  return (
    <div style={{ display: "flex" }}>
      <input type="text" onChange={(e) => setSearchKeyword(e.target.value)} />
      <button type="button" onClick={() => searchPlaceList(searchKeyword, onFetchPlaces)}>검색</button>
    </div>
  );
}

/**
 * 
 * @param {string} searchKeyword 
 * @param {() => void} callback 
 */
function searchPlaceList(searchKeyword, callback) {
  // TODO: API 요청
  console.log(searchKeyword);
}