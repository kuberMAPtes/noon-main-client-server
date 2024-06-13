import FeedDetailComponent from './component/FeedDetailComponent';
import Footer from '../../components/common/Footer';

// 피드 상세 보기 시 가져오는 데이터
const sampleData = {
    feedId: 10001,
    writerId: 'member_1',
    writerNickname: 'nickname_1',
    buildingId: 10002,
    buildingName: 'Building_3',
    publicRange: 'PUBLIC',
    title: 'Title_2',
    feedText: 'Feed text for feed 2',
    viewCnt: 2,
    writtenTime: '2024-06-10T20:24:59',
    feedCategory: 'POLL',
    modified: false,
    mainActivate: false,
    activate: true,
    attachments: [
        {
            attachmentId: 10001,
            feedId: 10001,
            fileUrl: 'https://example.com/file_2.jpg',
            fileType: 'PHOTO',
            blurredFileUrl: null,
            activated: false,
        },
        {
            attachmentId: 10011,
            feedId: 10001,
            fileUrl: 'https://example.com/file_12.jpg',
            fileType: 'PHOTO',
            blurredFileUrl: 'https://example.com/blurred_file_12.jpg',
            activated: false,
        },
        {
            attachmentId: 10021,
            feedId: 10001,
            fileUrl: 'https://example.com/file_22.jpg',
            fileType: 'PHOTO',
            blurredFileUrl: null,
            activated: false,
        },
        {
            attachmentId: 10031,
            feedId: 10001,
            fileUrl: 'https://example.com/file_32.jpg',
            fileType: 'PHOTO',
            blurredFileUrl: null,
            activated: false,
        },
        {
            attachmentId: 10041,
            feedId: 10001,
            fileUrl: 'https://example.com/file_42.jpg',
            fileType: 'PHOTO',
            blurredFileUrl: 'https://example.com/blurred_file_42.jpg',
            activated: false,
        },
        {
            attachmentId: 10051,
            feedId: 10001,
            fileUrl: 'https://example.com/file_52.jpg',
            fileType: 'PHOTO',
            blurredFileUrl: null,
            activated: false,
        },
        {
            attachmentId: 10061,
            feedId: 10001,
            fileUrl: 'https://example.com/file_62.jpg',
            fileType: 'PHOTO',
            blurredFileUrl: null,
            activated: false,
        },
        {
            attachmentId: 10071,
            feedId: 10001,
            fileUrl: 'https://example.com/file_72.jpg',
            fileType: 'PHOTO',
            blurredFileUrl: 'https://example.com/blurred_file_72.jpg',
            activated: false,
        },
        {
            attachmentId: 10081,
            feedId: 10001,
            fileUrl: 'https://example.com/file_82.jpg',
            fileType: 'PHOTO',
            blurredFileUrl: null,
            activated: false,
        },
        {
            attachmentId: 10091,
            feedId: 10001,
            fileUrl: 'https://example.com/file_92.jpg',
            fileType: 'PHOTO',
            blurredFileUrl: null,
            activated: false,
        },
    ],
    comments: [
        {
            feedId: 10001,
            commentId: 10001,
            memberId: 'member_1',
            commentText: 'Comment text for comment 2',
            writtenTime: '2024-06-10T20:25:00',
            activated: false,
        },
        {
            feedId: 10001,
            commentId: 10011,
            memberId: 'member_2',
            commentText: 'Comment text for comment 12',
            writtenTime: '2024-06-10T20:25:00',
            activated: false,
        },
        {
            feedId: 10001,
            commentId: 10021,
            memberId: 'member_3',
            commentText: 'Comment text for comment 22',
            writtenTime: '2024-06-10T20:25:00',
            activated: false,
        },
        {
            feedId: 10001,
            commentId: 10031,
            memberId: 'member_4',
            commentText: 'Comment text for comment 32',
            writtenTime: '2024-06-10T20:25:00',
            activated: false,
        },
        {
            feedId: 10001,
            commentId: 10041,
            memberId: 'member_5',
            commentText: 'Comment text for comment 42',
            writtenTime: '2024-06-10T20:25:00',
            activated: false,
        },
        {
            feedId: 10001,
            commentId: 10051,
            memberId: 'member_6',
            commentText: 'Comment text for comment 52',
            writtenTime: '2024-06-10T20:25:00',
            activated: false,
        },
        {
            feedId: 10001,
            commentId: 10061,
            memberId: 'member_7',
            commentText: 'Comment text for comment 62',
            writtenTime: '2024-06-10T20:25:00',
            activated: false,
        },
        {
            feedId: 10001,
            commentId: 10071,
            memberId: 'member_8',
            commentText: 'Comment text for comment 72',
            writtenTime: '2024-06-10T20:25:00',
            activated: false,
        },
        {
            feedId: 10001,
            commentId: 10081,
            memberId: 'member_9',
            commentText: 'Comment text for comment 82',
            writtenTime: '2024-06-10T20:25:00',
            activated: false,
        },
        {
            feedId: 10001,
            commentId: 10091,
            memberId: 'member_10',
            commentText: 'Comment text for comment 92',
            writtenTime: '2024-06-10T20:25:00',
            activated: false,
        },
        {
            feedId: 10001,
            commentId: 10100,
            memberId: 'member_1',
            commentText: '테스트 중입니다람쥐',
            writtenTime: '2023-06-10T15:58:00',
            activated: false,
        },
    ],
    tags: [
        {
            tagId: 10001,
            tagText: '슬픔',
        },
        {
            tagId: 10005,
            tagText: '따듯함',
        },
        {
            tagId: 10006,
            tagText: '낙관',
        },
        {
            tagId: 10010,
            tagText: '그렇다',
        },
        {
            tagId: 10000,
            tagText: '행복',
        },
    ],
    tagFeeds: [
        {
            tagFeedId: 10001,
            feedId: 10001,
            tagId: 10001,
        },
        {
            tagFeedId: 10101,
            feedId: 10001,
            tagId: 10005,
        },
        {
            tagFeedId: 10201,
            feedId: 10001,
            tagId: 10006,
        },
        {
            tagFeedId: 10300,
            feedId: 10001,
            tagId: 10010,
        },
        {
            tagFeedId: 10301,
            feedId: 10001,
            tagId: 10000,
        },
        {
            tagFeedId: 10302,
            feedId: 10001,
            tagId: 10000,
        },
    ],
};

const FeedDetailTestComponents = () => {
    return (
        <div>
            <FeedDetailComponent data={sampleData} />
            <Footer />
        </div>
    );
};

export default FeedDetailTestComponents;
