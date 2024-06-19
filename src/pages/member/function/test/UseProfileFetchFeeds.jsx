import axios from 'axios';
import { useEffect, useState } from 'react';

const UseProfileFetchFeeds = (fetchUrl, toId, initialPage) => {
    const [feeds, setFeeds] = useState([]);
    const [loading, setLoading] = useState(false);
    const [hasMore, setHasMore] = useState(true);
    const [page, setPage] = useState(Number(initialPage));

    const fetchData = async (url, page) => {
        setLoading(true);
        let queryString = `?memberId=${toId}&page=${page}`;

        try {
            const response = await axios.get(url + queryString);
            if (response.data.length === 0) {
                setHasMore(false);
            } else {
                setFeeds((prevFeeds) => [...prevFeeds, ...response.data]);
            }
        } catch (e) {
            console.log(e);
        }
        setLoading(false);
    };

    useEffect(() => {
        fetchData(fetchUrl, page);
    }, [page, fetchUrl]);

    return { feeds, loading, hasMore, setPage };
};

export default UseProfileFetchFeeds;
