import React, { useEffect, useState, useRef, useCallback } from 'react';
import axios from 'axios';
import { useSearchParams } from 'react-router-dom';

import FeedItem from './component/FeedList/FeedItem';
import Dropdown from './component/FeedList/FeedDropdown';
import FeedNotFound from './component/FeedNotFound';

import Footer from '../../components/common/Footer';
import BasicNavbar from '../../components/common/BasicNavbar';

import './css/FeedList.css';

const FeedListPage = () => {
    const [searchParams] = useSearchParams();
    const memberId = searchParams.get('memberId');
    const initialPage = searchParams.get('page') || 1;

    const [feeds, setFeeds] = useState([]);
    const [loading, setLoading] = useState(false);
    const [hasMore, setHasMore] = useState(true);
    const [page, setPage] = useState(Number(initialPage));
    const [fetchUrl, setFetchUrl] = useState('http://localhost:8080/feed/getFeedListByMember')
    const observer = useRef();

    // 기본적으로 볼 수 있는 피드 목록 가져오기
    const fetchData = async (url, page) => {
        setLoading(true);
    
        // QueryString 설정
        let queryString = `?memberId=${memberId}&page=${page}`;

        // axios 실행
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

    // 콜백 함수 정의 : 실행될 때마다 상태 초기화
    const handleSelect = (url) => {
        setFeeds([]);
        setPage(1);
        setHasMore(true);
        setFetchUrl(url)
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
        return "대기중...";
    }

    // NotFount 페이지
    if (!loading && feeds.length === 0) {
        return (
            <div>
                <BasicNavbar />
                <FeedNotFound />
            </div>
        );
    }

    return (
        <div>
            <BasicNavbar />
            <div className='container'>
            <Dropdown onSelect={handleSelect} />
                <div className="row">
                    {feeds.map((feed, index) => (
                        <div
                            key={feed.feedId}
                            className="col-12 mb-4"
                            ref={feeds.length === index + 1 ? lastFeedElementRef : null}
                        >
                            <FeedItem data={feed} />
                        </div>
                    ))}
                </div>
                {loading && <p>Loading...</p>}
                <Footer />
            </div>
        </div>
    );
};

export default FeedListPage;