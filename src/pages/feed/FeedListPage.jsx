import React, { useEffect, useState } from 'react';
import FeedItem from './component/FeedItem';
import Footer from '../../components/common/Footer';
import './css/FeedList.css';
import BasicNavbar from '../../components/common/BasicNavbar';
import axios from 'axios';
import { useSearchParams } from 'react-router-dom';
import FeedNotFound from './component/FeedNotFound'

const FeedListPage = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const memberId = searchParams.get('memberId')
    const page = searchParams.get('page')

    const [feeds, setFeeds] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(()=> {
        const fetchData = async () => {
            setLoading(true);
            try {
                const response = await axios.get(
                    'http://localhost:8080/feed/getFeedListByMember?memberId=' + memberId + '&page=' + page);
                console.log(response);
                setFeeds(response.data);
            } catch (e) {
                console.log(e);
            }

            setLoading(false);
        }

        fetchData();
    }, []);

    if(loading) {
        return "대기중..."
    }

    if(!feeds) {
        return (
            <div>
            <BasicNavbar />
            <FeedNotFound/>
            </div>
        );
    }

    return (
        <div>
        <BasicNavbar />
            <div className="container mt-4">
                
                <div className="row">
                    {feeds.map((feed) => (
                        <div key={feed.feedId} className="col-12 mb-4">
                            <FeedItem data={feed} />
                        </div>
                    ))}
                </div>
                <div>
                    {/* <Footer /> */}
                </div>
                
            </div>
        </div>
    );
};

export default FeedListPage;
