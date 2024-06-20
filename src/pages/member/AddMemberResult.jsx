import React from 'react';
import { Button } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const AddMemberResult = () => {

    const memberId = useSelector(state => state.auth.member.memberId);

    const navigate = useNavigate();


    return (
        <div>
            <h1>Add Member Result</h1>
            축하합니다 {memberId}님 회원가입이 완료되었습니다.

            <Button>
                확인
            </Button>
        </div>
    );
};

export default AddMemberResult;