import React, { useEffect, useState } from 'react';
import axios_api from '../../../../lib/axios_api';
import { Image, ListGroup, ListGroupItem } from 'react-bootstrap';
import navigator from '../../util/Navigator';

const LikedUsersList = (props) => {

    const [likeUserList, setLikeUserList] = useState([]);
    const {goToMemberProfile} = navigator();

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
            <br/>
            <ListGroup>
                {likeUserList.map((user, index) => (
                    <ListGroupItem 
                        key={index} 
                        className="d-flex align-items-center"
                        onClick={() => goToMemberProfile(user.memberId)}>
                        <Image
                            src={user.memberProfile || 'https://via.placeholder.com/40'}
                            roundedCircle
                            width="40"
                            height="40"
                            className="me-3"
                        />
                        <div>
                            <strong>{user.memberNickname}</strong>
                            {user.points && (
                                <span className="text-muted ms-2">
                                    ({user.points} pts)
                                </span>
                            )}
                        </div>
                    </ListGroupItem>
                ))}
            </ListGroup>
        </div>
    );
};

export default LikedUsersList;