import React, { useEffect, useState, useRef, useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';

import FeedItem from './component/FeedList/FeedItem';
import Dropdown from './component/FeedList/FeedDropdown';
import FeedNotFound from './component/FeedNotFound';
import Loading from './component/FeedList/FeedLoading';
import FeedDisplayBoard from './component/FeedList/FeedDisplayBoard';

import axios_api from '../../lib/axios_api';
import { useSelector } from 'react-redux';

/**
 * 회원 아이디를 통해서 개인으로 관련이 있는 피드 목록을 가져온다.
 * @returns 자신이 작성한 피드, 좋아요와 북마크를 누른 피드, 구독한 건물에 대한 피드(총 4가지)를 가져온다
 */
const FeedListPage = () => {
    const [searchParams] = useSearchParams();
    const memberIdFromStore = useSelector((state) => state.auth.member.memberId);
    const memberIdFromURL = searchParams.get('memberId');
    const memberId = memberIdFromStore || memberIdFromURL;
    const initialPage = searchParams.get('page') || 1;

    const [feeds, setFeeds] = useState([]);
    const [loading, setLoading] = useState(false);
    const [hasMore, setHasMore] = useState(true);
    const [page, setPage] = useState(Number(initialPage));
    const [fetchUrl, setFetchUrl] = useState('/feed/getFeedListByMember')
    const observer = useRef();

    // 기본적으로 볼 수 있는 피드 목록 가져오기
    const fetchData = async (url, page) => {
        setLoading(true);
    
        // QueryString 설정
        let queryString = `?memberId=${memberId}&page=${page}`;

        // axios 실행
        try {
            const response = await axios_api.get(url + queryString);
            if (response.data.length === 0) {
                setHasMore(false);
            } else {
                setFeeds((prevFeeds) => [...prevFeeds, ...response.data]); // 기존의 끝에 추가
            }
        } catch (e) {
            console.log(e);
        }

        setLoading(false);
    };

    // 콜백 함수 정의 : 실행될 때마다 상태 초기화
    const handleSelect = (url) => {
        setFeeds([]);
        setPage(1);
        setHasMore(true);
        setFetchUrl(prevUrl => {
            if (prevUrl === url) {
                // 강제로 상태 변경을 트리거하기 위해 같은 URL이라도 setFetchUrl을 호출
                fetchData(url, 1);
            }
            return url;
        });
    }

    // 랜더링 될 때마다 실행
    useEffect(() => {
        fetchData(fetchUrl, page);
    }, [page, fetchUrl]);

    // 무한스크롤 구현 (IntersectionObserver)
    const lastFeedElementRef = useCallback((node) => {
        if (observer.current) observer.current.disconnect();
        observer.current = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting && hasMore) {
                setPage((prevPage) => prevPage + 1);
            }
        });
        if (node) observer.current.observe(node);
    }, [hasMore]);

    // 피드 실행 대기중
    if (loading && feeds.length === 0) {
        return (
            <div>
                <Loading />
            </div>
        );
    }
    
    return (
        <div>
            <div className='container'>
            <FeedDisplayBoard text="흠 그정돈가" />
            <Dropdown onSelect={handleSelect} />
            {!loading && feeds.length === 0 ? (
                <FeedNotFound />
            ) : (
                <div>
                    <div className="row">
                        {feeds.map((feed, index) => (
                            <div
                                key={feed.feedId}
                                className="col-12 mb-4"
                                ref={feeds.length === index + 1 ? lastFeedElementRef : null}
                            >
                                <FeedItem data={feed} memberId={memberId} />
                            </div>
                        ))}
                    </div>
                    {loading && <p>Loading...</p>}
                </div>
            )}
            </div>
        </div>
    );
};

export default FeedListPage;