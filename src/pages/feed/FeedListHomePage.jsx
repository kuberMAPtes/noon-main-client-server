import React, { useEffect, useState, useRef, useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';

import FeedItem from './component/FeedList/FeedItem';
import Dropdown from './component/FeedList/FeedDropdown';
import FeedNotFound from './component/FeedNotFound';
import Loading from './component/FeedList/FeedLoading';

import Footer from '../../components/common/Footer';
import BasicNavbar from '../../components/common/BasicNavbar';

import './css/FeedList.css';
import axios_api from '../../lib/axios_api';

/**
 * 피드 대표 Home을 설정하는 곳입니다. FeedListPage와 대동소이함
 * @returns 인기도가 높은 피드 리스트를 가져온다.
 */
const FeedListHomePage = () => {
    const [searchParams] = useSearchParams();
    const memberId = searchParams.get('memberId');
    const initialPage = searchParams.get('page') || 1;

    const [feeds, setFeeds] = useState([]);
    const [loading, setLoading] = useState(false);
    const [hasMore, setHasMore] = useState(true);
    const [page, setPage] = useState(Number(initialPage));
    const [fetchUrl, setFetchUrl] = useState('/feed/getAllFeedOrderByPopolarity')
    const observer = useRef();

    // 기본적으로 볼 수 있는 피드 목록 가져오기
    const fetchData = async (url, page) => {
        setLoading(true);
    
        // QueryString 설정
        let paging = `?memberId=${memberId}&page=${page}`;

        // axios 실행
        try {
            const response = await axios_api.get(url + paging);
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

    // NotFount 페이지
    if (!loading && feeds.length === 0) {
        return (
            <div>
                <FeedNotFound />
            </div>
        );
    }

    return (
        <div>
            <BasicNavbar />
            <div className='container'>
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
                <Footer />
            </div>
        </div>
    );
};

export default FeedListHomePage;