import axios from 'axios';
import { useCallback, useEffect, useState } from 'react';
import  axiosInstance  from '../../../../lib/axiosInstance';
// http://localhost:8080/feed/getFeedListByMember
const UseProfileFetchFeeds = (feedDtoList,toId, initialPage) => {

    const [feeds, setFeeds] = useState([]);
    const [loading, setLoading] = useState(false);
    const [hasMore, setHasMore] = useState(true);
    const [page, setPage] = useState(Number(initialPage));

    const fetchData = useCallback(() => {
        setLoading(true);
    
        // alert("피드 response" + JSON.stringify(feedDtoList));
        if (feedDtoList.length === 0) {
            setHasMore(false);
        } else {
            setFeeds((prevFeeds) => [...prevFeeds, ...feedDtoList]);
        }
        setLoading(false);
    }, [feedDtoList]);

    useEffect(() => {
        fetchData(toId, page);
    }, [page, toId, fetchData]);

    return { feeds, loading, hasMore, setPage };
};

export default UseProfileFetchFeeds;
