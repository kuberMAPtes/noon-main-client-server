import React, { useState } from 'react';

const UpdateMember = () => {

    const [nickname, setNickname] = useState('');
    const [memberId, setMemberId] = useState('');
    const [pwd, setPwd] = useState('');
    const [address, setAddress] = useState('');

    return (
        <div>
            <h1>UpdateMember</h1>
        </div>
    );
};

export default UpdateMember;