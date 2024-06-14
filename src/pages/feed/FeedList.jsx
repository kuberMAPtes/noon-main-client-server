import React from 'react';
import FeedItem from './component/FeedItem';
import Footer from '../../components/common/Footer';
import './css/FeedList.css';

// Sample Data
const sampleData = [
    {
        feedId: 10000,
        writerId: 'member_1',
        writerNickname: 'nickname_1',
        title: 'Title_1',
        feedText: 'Feed text for feed 1',
        buildingId: 10001,
        buildingName: 'Building_2',
        writtenTime: '2024-06-10T20:24:59',
        feedAttachementURL: 'https://example.com/file_1.jpg',
    },
    {
        feedId: 10001,
        writerId: 'member_1',
        writerNickname: 'nickname_1',
        title: 'Title_2',
        feedText: 'Feed text for feed 2',
        buildingId: 10002,
        buildingName: 'Building_3',
        writtenTime: '2024-06-10T20:24:59',
        feedAttachementURL: 'https://example.com/file_2.jpg',
    },
    {
        feedId: 10002,
        writerId: 'member_1',
        writerNickname: 'nickname_1',
        title: 'Title_3',
        feedText: 'Feed text for feed 3',
        buildingId: 10003,
        buildingName: 'Building_4',
        writtenTime: '2024-06-10T20:24:59',
        feedAttachementURL: 'https://example.com/file_3.jpg',
    },
    {
        feedId: 10003,
        writerId: 'member_1',
        writerNickname: 'nickname_1',
        title: 'Title_4',
        feedText: 'Feed text for feed 4',
        buildingId: 10004,
        buildingName: 'Building_5',
        writtenTime: '2024-06-10T20:24:59',
        feedAttachementURL: 'https://example.com/file_4.jpg',
    },
    {
        feedId: 10005,
        writerId: 'member_1',
        writerNickname: 'nickname_1',
        title: 'Title_6',
        feedText: 'Feed text for feed 6',
        buildingId: 10006,
        buildingName: 'Building_7',
        writtenTime: '2024-06-10T20:24:59',
        feedAttachementURL: 'https://example.com/file_6.jpg',
    },
];

const FeedList = () => {
    return (
        <div className="container mt-4">
            <div className="row">
                {sampleData.map((sample) => (
                    <div key={sample.feedId} className="col-12 mb-4">
                        <FeedItem data={sample} />
                    </div>
                ))}
            </div>
            <div>
                {/* <Footer /> */}
            </div>
            
        </div>
    );
};

export default FeedList;
