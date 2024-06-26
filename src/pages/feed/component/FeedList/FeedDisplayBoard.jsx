import React, { useEffect, useState } from 'react';
import '../../css/FeedDisplayBoard.css';
import axios_api from '../../../../lib/axios_api';

/**
 * 전광판 컴포넌트
 */
const Marquee = ({ buildingId }) => {
    const [megaphone, setMegaphone] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);

    const fetchMegaphone = async (buildingId) => {
        let url = `/feed/getFeedListByBuildingAndMegaphone?buildingId=${buildingId}`;

        try {
            const response = await axios_api.get(url);
            if (response.data.length === 0) {
                // 데이터가 없다면 데이터 넣기
                setMegaphone([
                    {
                        writerNickname: "관리자",
                        feedText: "확성기를 사용해보세요!"
                    }
                ]);
            } else {
                setMegaphone(response.data);
            }
        } catch (e) {
            console.log(e);
        }
    }

    useEffect(() => {
        fetchMegaphone(buildingId);
    }, [buildingId])


    useEffect(() => {
        if (megaphone.length > 0) {
          const interval = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % megaphone.length);
          }, 10000); // Change text every 10 seconds
    
          return () => clearInterval(interval);
        }
      }, [megaphone]);

    return (
        <div className="marquee-container">
        <div className="marquee">
            {megaphone.length > 0 ? 
                megaphone[currentIndex].writerNickname + " : " + megaphone[currentIndex].feedText 
                : ""}
        </div>
        </div>
    );
};

export default Marquee;