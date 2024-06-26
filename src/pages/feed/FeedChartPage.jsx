import React, { useEffect, useState } from 'react';
import BasicNavbar from '../../components/common/BasicNavbar';
import Footer from '../../components/common/Footer';
import { Line } from 'react-chartjs-2';
import FeedCntByTag from './component/FeedChart/FeedCntByTag';

/**
 * 피드에 대한 통계를 보여줍니다.
 * @returns 피드 관련 통계
 */
const FeedChartPage = () => {
    const feedCntByTag = FeedCntByTag();

    return (
        <div>
            {/* <BasicNavbar /> */}
            <div className="container mt-4">
                {feedCntByTag.labels.length > 0 ? (
                    <Line data={feedCntByTag} />
                ) : (
                    <p>Loading...</p>
                )}
            </div>
            <Footer />
        </div>
    );
};

export default FeedChartPage;