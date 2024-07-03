import React, { useEffect, useState, useRef, useCallback } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';

import FeedItem from './component/FeedList/FeedItem';
import FeedNotFound from './component/FeedNotFound';
import Loading from './component/FeedList/FeedLoading';

import Footer from '../../components/common/Footer';
import FeedDisplayBoard from './component/FeedList/FeedDisplayBoard';

// import './css/FeedList.css';
import lineStyles from './css/common/FeedLine.module.css'
import axios_api from '../../lib/axios_api';
import FeedPopularyRanking from './component/FeedList/FeedPopularyRanking';
import { useSelector } from 'react-redux';
import FeedCalendar from './component/FeedList/FeedCalendar';

/**
 * 건물별 피드 목록을 보여준다. FeedListPage와 그 성질이 달라서 분리하였다.
 * @returns 건물별 피드 목록
 */

const FeedBuildingListPage = () => {
    const [searchParams] = useSearchParams();
    const memberIdFromStore = useSelector((state) => state.auth.member.memberId);
    const memberIdFromURL = searchParams.get('memberId');
    const memberId = memberIdFromStore || memberIdFromURL;
    const { buildingId } = useParams();
    const initialPage = searchParams.get('page') || 1;

    const [feeds, setFeeds] = useState([]);
    const [loading, setLoading] = useState(false);
    const [hasMore, setHasMore] = useState(true);
    const [page, setPage] = useState(Number(initialPage));
    const [fetchUrl, setFetchUrl] = useState('/feed/getFeedListByBuilding')
    const observer = useRef();

    // 건물별 피드 목록 가져오기
    const fetchData = async (url, page) => {
        setLoading(true);
    
        // QueryString 설정
        let queryString = `?memberId=${memberId}&buildingId=${buildingId}&page=${page}`;

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
            {/* <FeedDisplayBoard buildingId={buildingId} /> */}
            <FeedCalendar memberId={memberId} buildingId={buildingId}/>
            <hr className={lineStyles.calenderHr}/>
            <FeedPopularyRanking buildingId={buildingId} />
            <hr className={lineStyles.calenderHr}/>
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

export default FeedBuildingListPage;