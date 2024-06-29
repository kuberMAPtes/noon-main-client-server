import React from 'react';
import { ButtonGroup, Button } from 'react-bootstrap';

const FeedDropdown = ({ onSelect }) => {

    // 각 버튼을 클릭할 때 관련 URL을 설정
    const handleSelect = (option) => {
        let temp = '';
        switch (option) {
            case 'member':
                temp = '/feed/getFeedListByMember';
                break;
            case 'subscriptionBuilding':
                temp = '/feed/getFeedListByMemberSubscription';
                break;
            case 'like':
                temp = '/feed/getFeedListByMemberLike';
                break;
            case 'bookmark':
                temp = '/feed/getFeedListByMemberBookmark';
                break;
            default:
                temp = '/feed/getFeedListByMember';
        }

        onSelect(temp);
    }

    return (
        <div className="row justify-content-center">
            <ButtonGroup>
                <Button variant="primary" onClick={() => handleSelect('member')}>내 피드</Button>
                <Button variant="primary" onClick={() => handleSelect('subscriptionBuilding')}>구독한 건물 피드</Button>
                <Button variant="primary" onClick={() => handleSelect('like')}>좋아요를 한 피드</Button>
                <Button variant="primary" onClick={() => handleSelect('bookmark')}>북마크한 피드</Button>
            </ButtonGroup>
        </div>
    );
};

export default FeedDropdown;
