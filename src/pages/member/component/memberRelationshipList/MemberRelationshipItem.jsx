import React from 'react';
import { ListGroup, Button } from 'react-bootstrap';

const MemberRelationshipItem = ({ memberRelationship, lastElementRef }) => {
    return (
        <ListGroup.Item ref={lastElementRef}>
            <div className="d-flex justify-content-between align-items-center">
                <div>
                    <strong>{memberRelationship.fromMember.nickname}</strong> ➔ <strong>{memberRelationship.toMember.nickname}</strong>
                    <div>{memberRelationship.relationshipType}</div>
                </div>
                <div>
                    {memberRelationship.relationshipType === "FOLLOW" && (
                        <Button variant="secondary" size="sm" className="mr-2">맞팔로우</Button>
                    )}
                    <Button variant="primary" size="sm">1대1 채팅 신청하기</Button>
                </div>
            </div>
        </ListGroup.Item>
    );
};

export default MemberRelationshipItem;
