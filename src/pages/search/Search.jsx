import { useCallback, useEffect, useRef, useState } from "react";
import SearchBar, { PARAM_KEY_SEARCH_KEYWORD } from "../../components/common/SearchBar";
import SearchModeTab, { modes } from "./component/SearchModeTab";
import FeedSearchResult from "./component/FeedSearchResult";
import BuildingSearchResult from "./component/BuildingSearchResult";
import ChatroomSearchResult from "./component/ChatroomSearchResult";
import MemberSearchResult from "./component/MemberSearchResult";
import searchFeed, { isFeedSearchResultEmpty } from "./axios/searchFeed";
import searchBuilding, { isBuildingSearchResultEmpty } from "./axios/searchBuilding";
import searchChatroom, { isChatroomSearchResultEmpty } from "./axios/searchChatroom";
import searchMember, { isMemberSearchResultEmpty } from "./axios/searchMember";
import "../../assets/css/module/search/Search.css";
import { useSearchParams } from "react-router-dom";
import Footer from "../../components/common/Footer";


const PARAM_KEY_SEARCH_MODE = "search-mode";

export default function Search() {
  const [queryParams, setQueryParams] = useSearchParams();
  
  const [searchKeyword, setSearchKeyword] = useState(queryParams.has(PARAM_KEY_SEARCH_KEYWORD) ? queryParams.get(PARAM_KEY_SEARCH_KEYWORD) : "");
  const [currentSearchMode, setCurrentSearchMode] =
      useState(queryParams.has(PARAM_KEY_SEARCH_MODE) ? parseInt(queryParams.get(PARAM_KEY_SEARCH_MODE)) : modes.INTEGRATION);
  const [searchResult, setSearchResult] = useState();
  const [page, setPage] = useState(1);

  const observer = useRef(undefined);

  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const SAMPLE_MEMBER = "member_2";

  const lastFeedElementRef = useCallback((node) => {
    if (observer.current) {
      observer.current.disconnect();
    }
    observer.current = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && hasMore && !loading) {
        setPage((prevPage) => prevPage + 1);
      }
    });
    if (node) {
      observer.current.observe(node);
    }
  }, [hasMore]);

  console.log(searchResult);

  let searchFunction;
  let component;
  switch (currentSearchMode) {
    case modes.FEED:
      component = <FeedSearchResult
          key="feed-search-result"
          searchResult={searchResult}
          infScrollTargetRef={lastFeedElementRef} />;
      searchFunction = searchFeed
      break;
    case modes.BUILDING:
      component = <BuildingSearchResult
          key="building-search-result"
          searchResult={searchResult}
          infScrollTargetRef={lastFeedElementRef} />;
      searchFunction = searchBuilding
      break;
    case modes.CHATROOM:
      component = <ChatroomSearchResult
          key="chatroom-search-result"
          searchResult={searchResult}
          infScrollTargetRef={lastFeedElementRef} />;
      searchFunction = searchChatroom
      break;
    case modes.MEMBER:
      component = <MemberSearchResult
          key="member-search-result"
          searchResult={searchResult}
          infScrollTargetRef={lastFeedElementRef} />;
      searchFunction = searchMember
      break;
    default:
      component = <p>통합검색창</p>;
      searchFunction = () => {}
  }

  useEffect(() => {
    if (hasMore && !loading && page !== 1) {
      setLoading(true);
      
      searchFunction(searchKeyword, page, (data) => {
        if (!data || data.length === 0) {
          setHasMore(false);
          return;
        }
        setHasMore(true);

        let newSearchResult;
        if (searchResult) {
          newSearchResult = [...searchResult, ...data];
        } else {
          newSearchResult = [...data];
        }
        setSearchResult(newSearchResult);
        setLoading(false);;
      }, SAMPLE_MEMBER);
    }
  }, [page]);

  function onSearchBtnClick() {
    if (!loading) {
      searchFunction(searchKeyword, page, (data) => {
        queryParams.set(PARAM_KEY_SEARCH_KEYWORD, searchKeyword);
        setPage(1);
        setQueryParams(queryParams);
        console.log(data);
        if (!data || data.length === 0) {
          setHasMore(false);
          return;
        }
        const newSearchResult = [...data];
        setSearchResult(newSearchResult);
        setLoading(false);
      }, SAMPLE_MEMBER);
    }
  }

  function onModeChange(mode) {
    setCurrentSearchMode(mode);
    setPage(1);
    setSearchResult(null);
    setHasMore(true);
    setLoading(false);
    queryParams.delete(PARAM_KEY_SEARCH_KEYWORD);
    setQueryParams(queryParams);
    queryParams.set(PARAM_KEY_SEARCH_MODE, mode);
    setQueryParams(queryParams);
  }

  return (
    <div className="container search-container">
      <SearchBar typeCallback={(text) => setSearchKeyword(text)} searchCallback={onSearchBtnClick} />
      <SearchModeTab currentSearchMode={currentSearchMode} onModeChange={onModeChange} />
      {component}
      <Footer />
    </div>
  );
}
