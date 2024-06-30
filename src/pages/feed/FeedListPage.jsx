import React, { useEffect, useState, useRef, useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';

import FeedItem from './component/FeedList/FeedItem';
import Dropdown from './component/FeedList/FeedDropdown';
import FeedNotFound from './component/FeedNotFound';
import Loading from './component/FeedList/FeedLoading';

import axios_api from '../../lib/axios_api';
import { useSelector } from 'react-redux';

/**
 * 회원 아이디를 통해서 개인으로 관련이 있는 피드 목록을 가져온다.
 * @returns 자신이 작성한 피드, 좋아요와 북마크를 누른 피드, 구독한 건물에 대한 피드(총 4가지)를 가져온다
 */
// const FeedListPage = ({toId, feeds, setFeeds}) => {
const FeedListPage = ({toId}) => {
    const [searchParams] = useSearchParams();

    const initialPage = searchParams.get('page') || 1;
    const memberId = toId // 회원 프로필 회원 : List를 가져오는 기준

    const memberIdFromStore = useSelector((state) => state.auth.member.memberId);
    const memberIdFromURL = searchParams.get('memberId');
    const loginMember = memberIdFromStore || memberIdFromURL; // 로그인한 회원 : 좋아요, 북마크를 가져오는 기준

    const [inFileFeeds, setInFileFeeds] = useState([]);
    const [loading, setLoading] = useState(false);
    const [hasMore, setHasMore] = useState(true);
    const [page, setPage] = useState(Number(initialPage));
    const [fetchUrl, setFetchUrl] = useState('/feed/getFeedListByMember')
    const observer = useRef();

    // 기본적으로 볼 수 있는 피드 목록 가져오기
    const fetchData = useCallback(async (url, page) => {
        setLoading(true);
        let queryString = `?memberId=${memberId}&loginMemberId=${loginMember}&page=${page}`;

        try {
            const response = await axios_api.get(url + queryString);
            if (response.data.length === 0) {
                setHasMore(false);
            } else {
                setInFileFeeds((prevFeeds) => [...prevFeeds, ...response.data]);
            }
        } catch (e) {
            console.log(e);
        }

        setLoading(false);
    }, [memberId, loginMember]);

    const handleSelect = useCallback((url) => {
        setInFileFeeds([]);
        setPage(1);
        setHasMore(true);
        setFetchUrl(prevUrl => {
            if (prevUrl === url) {
                fetchData(url, 1);
            }
            return url;
        });
    }, [fetchData]);

    // 랜더링 될 때마다 실행
    useEffect(() => {
        fetchData(fetchUrl, page);
    }, [fetchUrl, page, fetchData]);

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
    if (loading && inFileFeeds.length === 0) {
        return (
            <div>
                <Loading />
            </div>
        );
    }
    
    return (
        <div>
            <div>
            <Dropdown onSelect={handleSelect} />
            {!loading && inFileFeeds.length === 0 ? (
                <FeedNotFound />
            ) : (
                <div>
                    <div className="row">
                        {inFileFeeds.map((feed, index) => (
                            <div
                                key={feed.feedId}
                                className="col-12 mb-4"
                                ref={inFileFeeds.length === index + 1 ? lastFeedElementRef : null}
                            >
                                <FeedItem data={feed} memberId={loginMember} />
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