import React from 'react';
import { Dropdown, DropdownButton } from 'react-bootstrap';

const FeedDropdown = ({onSelect}) => {

    const handleSelect = (option) => {
        let temp = '';
        switch (option) {
            case 'member':
                temp = 'http://localhost:8080/feed/getFeedListByMember';
                break;
            case 'subscriptionBuilding':
                temp = 'http://localhost:8080/feed/getFeedListByMemberSubscription';
                break;
            case 'like':
                temp = 'http://localhost:8080/feed/getFeedListByMemberLike';
                break;
            case 'bookmark':
                temp = 'http://localhost:8080/feed/getFeedListByMemberBookmark';
                break;
            default:
                temp = 'http://localhost:8080/feed/getFeedListByMember';
        }

        onSelect(temp);
    }

    return (
        <div className="row justify-content-center">
            <DropdownButton
                id="dropdown-basic-button"
                title="피드 목록"
                onSelect={handleSelect}
                size="sm" 
                variant="primary" 
            >
                <Dropdown.Item eventKey="member">내 피드</Dropdown.Item>
                <Dropdown.Item eventKey="subscriptionBuilding">건물 구독별 피드</Dropdown.Item>
                <Dropdown.Item eventKey="like">좋아요를 누른 피드</Dropdown.Item>
                <Dropdown.Item eventKey="bookmark">북마크한 피드</Dropdown.Item>
            </DropdownButton>
        </div>
    );
};

export default FeedDropdown;