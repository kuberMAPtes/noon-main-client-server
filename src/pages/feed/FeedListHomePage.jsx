import React, { useEffect, useState, useRef, useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';

import FeedItem from './component/FeedList/FeedItem';
import FeedNotFound from './component/FeedNotFound';
import Loading from './component/FeedList/FeedLoading';

import Footer from '../../components/common/Footer';

import './css/FeedList.css';
import axios_api from '../../lib/axios_api';
import Header from '../../components/common/Header';
import { useSelector } from 'react-redux';
import FeedCntByTag from './component/FeedChart/FeedCntByTag';
import { Line } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);
/**
 * 피드 대표 Home을 설정하는 곳입니다. FeedListPage와 대동소이함
 * @returns 인기도가 높은 피드 리스트를 가져온다.
 */
const FeedListHomePage = () => {
    const [searchParams] = useSearchParams();

    const memberIdFromStore = useSelector((state) => state.auth.member.memberId);
    const memberIdFromURL = searchParams.get('memberId');
    const memberId = memberIdFromStore || memberIdFromURL;

    const initialPage = searchParams.get('page') || 1;

    const [feeds, setFeeds] = useState([]);
    const [loading, setLoading] = useState(false);
    const [hasMore, setHasMore] = useState(true);
    const [page, setPage] = useState(Number(initialPage));
    const [fetchUrl, setFetchUrl] = useState('/feed/getAllFeedOrderByPopolarity')
    const observer = useRef();

    // Chart 정보
    const feedCntByTag = FeedCntByTag();

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
                <Header title="피드" />
                <Loading />
            </div>
        );
    }

    // NotFount 페이지
    if (!loading && feeds.length === 0) {
        return (
            <div>
                <Header title="피드" />
                <FeedNotFound />
            </div>
        );
    }

    return (
        <div>
            <Header title="피드" />
            <br/>
            <div>
                <h1 style={{ textAlign: 'center' }}>피드에 대한 통계</h1>
                {feedCntByTag.labels.length > 0 ? (
                    <Line data={feedCntByTag} />
                ) : (
                    <p>Loading...</p>
                )}
            </div>
            <div>
                <div className="row">
                    {feeds.map((feed, index) => (
                        <div
                            key={feed.feedId}
                            className="col-lg-4 col-md-6 col-sm-12 mb-4"
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