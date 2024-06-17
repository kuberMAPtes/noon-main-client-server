import FeedDetail from './component/FeedDetail';
import Footer from '../../components/common/Footer';
import { useSearchParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import BasicNavbar from '../../components/common/BasicNavbar';
import FeedNotFound from './component/FeedNotFound'
import axios from 'axios';

const FeedDetailPage = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const feedId = searchParams.get('feedId');

    const [feed, setFeed] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(()=> {
        const fetchData = async () => {
            setLoading(true);
            try {
                const response = await axios.get(
                    'http://localhost:8080/feed/detail?feedId=' + feedId);
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
        return "대기중..."
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
            <FeedDetail data={feed} />
            <div>
                {/* <Footer /> */}
            </div>
        </div>
    );
};

export default FeedDetailPage;
