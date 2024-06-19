import { useRef, useCallback } from 'react';

const UseProfileInfiniteScroll = (hasMore, setPage) => {
    const observer = useRef();

    const lastFeedElementRef = useCallback((node) => {
        if (observer.current) observer.current.disconnect();
        observer.current = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting && hasMore) {
                setPage((prevPage) => prevPage + 1);
            }
        });
        if (node) observer.current.observe(node);
    }, [hasMore]);

    return lastFeedElementRef;
};

export default UseProfileInfiniteScroll;
