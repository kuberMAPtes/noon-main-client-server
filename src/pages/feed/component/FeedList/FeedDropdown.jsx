import React from 'react';
import { ButtonGroup, Button } from 'react-bootstrap';
import { FaBookmark, FaBuilding, FaHeart, FaUser } from 'react-icons/fa';
import styles from "../../css/FeedList/FeedDropdown.module.css"

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
            <ButtonGroup className={styles.buttonGroup}>
                <Button className={styles.customButton} onClick={() => handleSelect('member')} title="내 피드">
                    <FaUser />
                </Button>
                <div className={styles.separator}></div>
                <Button className={styles.customButton} onClick={() => handleSelect('subscriptionBuilding')} title="구독한 건물 피드">
                    <FaBuilding />
                </Button>
                <div className={styles.separator}></div>
                <Button className={styles.customButton} onClick={() => handleSelect('like')} title="좋아요를 한 피드">
                    <FaHeart />
                </Button>
                <div className={styles.separator}></div>
                <Button className={styles.customButton} onClick={() => handleSelect('bookmark')} title="북마크한 피드">
                    <FaBookmark />
                </Button>
            </ButtonGroup>
        </div>
    );
};

export default FeedDropdown;
