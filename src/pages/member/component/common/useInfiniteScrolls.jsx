import { useRef, useCallback, useState, useEffect } from "react";

// 무한 스크롤을 위한 커스텀 훅 정의
const useInfiniteScrolls = (fetchMoreData) => {
  const observer = useRef();

  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true); // 추가 데이터가 더 있는지 여부

  const lastElementRef = useCallback(
    (node) => {
      if (loading) return;

      // 기존 옵저버가 있으면 연결 해제
      if (observer.current) observer.current.disconnect();

      // 새로운 옵저버를 설정
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setLoading(true);
          // alert("IntersectionObserver: 마지막 요소와 교차함");
          fetchMoreData()
            .then((hasMoreData) => {
              setHasMore(hasMoreData);
              setLoading(false);
              // alert(`fetchMoreData 결과: hasMoreData=${hasMoreData}`);
            })
            .catch(() => setLoading(false));
        }
      });

      // 마지막 요소를 옵저버와 연결
      if (node) observer.current.observe(node);
    },
    [loading, hasMore, fetchMoreData]
  );

  return { lastElementRef, loading };
};

export default useInfiniteScrolls;