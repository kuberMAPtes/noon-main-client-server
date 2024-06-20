import axios from 'axios';
import { useCallback, useEffect, useState } from 'react';
import  axiosInstance  from '../../../../lib/axiosInstance';
// http://localhost:8080/feed/getFeedListByMember
const UseProfileFetchFeeds = (toId, initialPage) => {

    const fetchUrl = "/feed/getFeedListByMember";

    const [feeds, setFeeds] = useState([]);
    const [loading, setLoading] = useState(false);
    const [hasMore, setHasMore] = useState(true);
    const [page, setPage] = useState(Number(initialPage));

    const fetchData = useCallback(async (toId, page) => {
        setLoading(true);
        const queryString = `?memberId=${toId}&page=${page}`;
        try {
            const response = await axiosInstance.get(fetchUrl + queryString);
            alert("피드 response" + JSON.stringify(response));
            if (response.data.length === 0) {
                setHasMore(false);
            } else {
                setFeeds((prevFeeds) => [...prevFeeds, ...response.data]);
            }
        } catch (error) {
            console.error('Error fetching feeds:', error);
        } finally {
            setLoading(false);
        }
    }, [fetchUrl]);

    useEffect(() => {
        fetchData(toId, page);
    }, [page, toId, fetchData]);

    return { feeds, loading, hasMore, setPage };
};

export default UseProfileFetchFeeds;
