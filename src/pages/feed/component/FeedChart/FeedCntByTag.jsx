import React, { useEffect, useState } from 'react';
import axios_api from '../../../../lib/axios_api';

const FeedCntByTag = () => {
    const [feedCntByTag, setFeedCntByTag] = useState({
        labels:[],
        datasets:[]
    });

    // 데이터 가져오기
    const popularTagData = async () => {
        try {
            const response =  await axios_api.get('/feed/feedCntByTag');
            if(response === null || response.data.length === 0) {
                setFeedCntByTag({
                    labels: [],
                    datasets: []
                });
                return;
            }

            const tagTexts = response.data.map(item => item.tagText);
            const counts = response.data.map(item => item.count);

            const data = {
                labels: tagTexts,
                datasets: [{
                type : 'bar',
                  label: '인기 태그의 피드 작성 수',
                  data: counts,
                  backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(255, 159, 64, 0.2)',
                    'rgba(255, 205, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(54, 162, 235, 0.2)'
                  ],
                  borderColor: [
                    'rgb(255, 99, 132)',
                    'rgb(255, 159, 64)',
                    'rgb(255, 205, 86)',
                    'rgb(75, 192, 192)',
                    'rgb(54, 162, 235)',
                  ],
                  borderWidth: 2
                }]
            };
            setFeedCntByTag(data);

        } catch (e) {
            console.log(e);
        }
    }

    useEffect(() => {
        popularTagData();
    }, []);

    return feedCntByTag;
};

export default FeedCntByTag;