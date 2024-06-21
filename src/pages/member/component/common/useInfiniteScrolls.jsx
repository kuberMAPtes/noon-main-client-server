import { useRef, useCallback, useState, useEffect } from "react";

const useInfiniteScrolls = (dataList, setDataList, initialPage) => {
  const observer = useRef();

  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(Number(initialPage));

  const fetchData = useCallback(() => {
    setLoading(true);
    if (dataList.length === 0) {
      setHasMore(false);
    } else {
      setDataList((prevDataList) => [...prevDataList, ...dataList]);
    }

    setLoading(false);
  }, [dataList, setDataList]);

  useEffect(() => {
    fetchData();
  }, [page, fetchData]);

  const lastElementRef = useCallback(
    (node) => {
      if (loading) return;

      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setPage((prevPage) => prevPage + 1);
        }
      });
      if (node) observer.current.observe(node);
    },
    [loading, hasMore]
  );

  return { lastElementRef, loading };
};

export default useInfiniteScrolls;
