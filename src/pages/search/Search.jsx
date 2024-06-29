import { useCallback, useEffect, useRef, useState } from "react";
import SearchBar, { PARAM_KEY_SEARCH_KEYWORD } from "../../components/common/SearchBar";
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
import { useSearchParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { Spinner } from "reactstrap";


const PARAM_KEY_SEARCH_MODE = "search-mode";

export default function Search() {
  const [queryParams, setQueryParams] = useSearchParams();
  
  const [searchKeyword, setSearchKeyword] = useState(queryParams.has(PARAM_KEY_SEARCH_KEYWORD) ? queryParams.get(PARAM_KEY_SEARCH_KEYWORD) : "");
  const [currentSearchMode, setCurrentSearchMode] =
      useState(queryParams.has(PARAM_KEY_SEARCH_MODE) ? parseInt(queryParams.get(PARAM_KEY_SEARCH_MODE)) : modes.FEED);
  const [searchResult, setSearchResult] = useState();
  const [page, setPage] = useState(1);

  const observer = useRef(undefined);

  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const loginMemberId = useSelector((state) => state.auth.member.memberId) || "member_2"; // TODO

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
      searchFunction = () => {}
  }

  useEffect(() => {
    if (hasMore && !loading && page !== 1) {
      setLoading(true);
      
      searchFunction(searchKeyword, page, (data) => {
        if (!data || data.length === 0) {
          setHasMore(false);
          setLoading(false);
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
      }, loginMemberId);
    }
  }, [page]);

  useEffect(() => {
    search();
  }, [currentSearchMode]);

  function onSearchBtnClick() {
    search();
  }

  function search() {
    if (!loading && searchKeyword && searchKeyword !== "") {
      searchFunction(searchKeyword, 1, (data) => {
        queryParams.set(PARAM_KEY_SEARCH_KEYWORD, searchKeyword);
        setPage(1);
        setQueryParams(queryParams);
        const newSearchResult = [...data];
        setSearchResult(newSearchResult);
        setLoading(false);
      }, loginMemberId);
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
    <div className="search-container">
      <SearchBar typeCallback={(text) => setSearchKeyword(text)} searchCallback={onSearchBtnClick} />
      <SearchModeTab currentSearchMode={currentSearchMode} onModeChange={onModeChange} />
      {component}
      {loading && (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '200px' }}>
          <Spinner style={{ width: '3rem', height: '3rem' }} color="primary" />
        </div>
      )}
    </div>
  );
}
