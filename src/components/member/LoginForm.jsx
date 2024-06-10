import React, { useState } from 'react';

const LoginForm = ({ onSubmit }) => {
    const [memberId, setMemberId] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        onSubmit({ memberId, password });
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label htmlFor="memberId">Member ID:</label>
                <input
                    type="text"
                    id="memberId"
                    value={memberId}
                    onChange={(e) => setMemberId(e.target.value)}
                    required
                />
            </div>
            <div>
                <label htmlFor="password">Password:</label>
                <input
                    type="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
            </div>
            <button type="submit">로그인</button>
        </form>
    );
};

export default LoginForm;
