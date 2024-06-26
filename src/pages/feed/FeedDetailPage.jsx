import FeedDetail from './component/FeedDetail/FeedDetail';
import { useSearchParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import BasicNavbar from '../../components/common/BasicNavbar';
import FeedNotFound from './component/FeedNotFound'
import axios_api from '../../lib/axios_api';
import Loading from './component/FeedList/FeedLoading';
import Footer from '../../components/common/Footer';
import navigator from './util/Navigator'
import { useSelector } from 'react-redux';
import { Button } from 'react-bootstrap';
import Header from '../../components/common/Header';


/**
 * 피드 하나에 대한 상세보기를 진행한다.
 * @returns 
 */
const FeedDetailPage = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    
    const feedId = searchParams.get('feedId');

    const memberIdFromStore = useSelector((state) => state.auth.member.memberId);
    const memberIdFromURL = searchParams.get('memberId');
    const memberId = memberIdFromStore || memberIdFromURL;

    const [feed, setFeed] = useState(null);
    const [buildingId, setBuildingId] = useState(0);
    const [loading, setLoading] = useState(false);

    useEffect(()=> {
        const fetchData = async () => {
            setLoading(true);
            try {
                const response = await axios_api.get(`/feed/detail?memberId=${memberId}&feedId=${feedId}`);
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
                <FeedNotFound/>
            </div>
        );
    }

    return (
        <div>
            {/* <BasicNavbar /> */}
            <Header title="피드 상세 보기" />
            <FeedDetail data={feed} memberId = {memberId} />
            <div>
                <Footer />
            </div>
        </div>
    );
};

export default FeedDetailPage;
