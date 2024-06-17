// import React, { useEffect, useState } from 'react';
// import FeedItem from './component/FeedItem';
// import Footer from '../../components/common/Footer';
// import './css/FeedList.css';
// import BasicNavbar from '../../components/common/BasicNavbar';
// import axios from 'axios';
// import { useSearchParams } from 'react-router-dom';
// import FeedNotFound from './component/FeedNotFound'

// const FeedListPage = () => {
//     const [searchParams, setSearchParams] = useSearchParams();
//     const memberId = searchParams.get('memberId')
//     const page = searchParams.get('page')

//     const [feeds, setFeeds] = useState(null);
//     const [loading, setLoading] = useState(false);

//     const fetchData = async () => {
//         setLoading(true);
//         try {
//             const response = await axios.get(
//                 'http://localhost:8080/feed/getFeedListByMember?memberId=' + memberId + '&page=' + page);
//             console.log(response);
//             setFeeds(response.data);
//         } catch (e) {
//             console.log(e);
//         }

//         setLoading(false);
//     }


//     useEffect(()=> {
//         fetchData();
//     }, []);

    
//     if(loading) {
//         return "대기중..."
//     }

//     if(!feeds) {
//         return (
//             <div>
//             <BasicNavbar />
//             <FeedNotFound/>
//             </div>
//         );
//     }

//     return (
//         <div>
//         <BasicNavbar />
//             <div className="container mt-4">
                
//                 <div className="row">
//                     {feeds.map((feed) => (
//                         <div key={feed.feedId} className="col-12 mb-4">
//                             <FeedItem data={feed} />
//                         </div>
//                     ))}
//                 </div>
//                 <div>
//                     {/* <Footer /> */}
//                 </div>
                
//             </div>
//         </div>
//     );
// };

// export default FeedListPage;

import React, { useEffect, useState, useRef, useCallback } from 'react';
import FeedItem from './component/FeedItem';
import Footer from '../../components/common/Footer';
import './css/FeedList.css';
import BasicNavbar from '../../components/common/BasicNavbar';
import axios from 'axios';
import { useSearchParams } from 'react-router-dom';
import FeedNotFound from './component/FeedNotFound';

const FeedListPage = () => {
    const [searchParams] = useSearchParams();
    const memberId = searchParams.get('memberId');
    const initialPage = searchParams.get('page') || 1;

    const [feeds, setFeeds] = useState([]);
    const [loading, setLoading] = useState(false);
    const [hasMore, setHasMore] = useState(true);
    const [page, setPage] = useState(Number(initialPage));
    const observer = useRef();

    const fetchData = async (page) => {
        setLoading(true);
        try {
            const response = await axios.get(
                `http://localhost:8080/feed/getFeedListByMember?memberId=${memberId}&page=${page}`
            );
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
        fetchData(page);
    }, [page]);

    const lastFeedElementRef = useCallback((node) => {
        if (observer.current) observer.current.disconnect();
        observer.current = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting && hasMore) {
                setPage((prevPage) => prevPage + 1);
            }
        });
        if (node) observer.current.observe(node);
    }, [hasMore]);

    if (loading && feeds.length === 0) {
        return "대기중...";
    }

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
            <div className="container mt-4">
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