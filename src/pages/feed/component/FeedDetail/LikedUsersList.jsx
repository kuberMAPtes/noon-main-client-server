import React, { useEffect, useState } from 'react';
import axios_api from '../../../../lib/axios_api';
import { ListGroup, ListGroupItem } from 'react-bootstrap';

const LikedUsersList = (props) => {

    const [likeUserList, setLikeUserList] = useState([]);

    const likedUser = async () => {
        try {
            const response = await axios_api.get(`/feed/getFeedLikeList?feedId=${props.feedId}`)
            setLikeUserList(response.data);
        } catch (e) {
            console.log(e);
        }
    }

    useEffect(() => {
        likedUser();
    }, []);

    return (
        <div className="liked-users-list">
            <ListGroup>
                {likeUserList.map((user, index) => (
                    <ListGroupItem key={index}>
                        {user.memberNickname}
                    </ListGroupItem>
                ))}
            </ListGroup>
        </div>
    );
};

export default LikedUsersList;