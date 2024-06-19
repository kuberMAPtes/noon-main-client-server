import FeedDetail from './component/FeedDetail/FeedDetail';
import { useSearchParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import BasicNavbar from '../../components/common/BasicNavbar';
import FeedNotFound from './component/FeedNotFound'
import axios_api from '../../lib/axios_api';
import Loading from './component/FeedList/FeedLoading';
import Footer from '../../components/common/Footer';

/**
 * 피드 하나에 대한 상세보기를 진행한다.
 * @returns 
 */
const FeedDetailPage = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const feedId = searchParams.get('feedId');

    const [feed, setFeed] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(()=> {
        const fetchData = async () => {
            setLoading(true);
            try {
                const response = await axios_api.get('/feed/detail?feedId=' + feedId);
                console.log(response);
                setFeed(response.data);
            } catch (e) {
                console.log(e);
            }

            setLoading(false);
        }

        fetchData();
    }, []);

    if(loading) {
        return (
            <div>
                <Loading />
            </div>
        );
    }

    if(!feed) {
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
            <FeedDetail data={feed} />
            <div>
                <Footer />
            </div>
        </div>
    );
};

export default FeedDetailPage;
