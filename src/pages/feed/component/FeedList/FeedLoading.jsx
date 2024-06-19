import React from 'react';
import { Spinner } from 'react-bootstrap';

const FeedLoading = () => {
    return (
        <div className="d-flex justify-content-center" style={{ height: '100vh' }}>
            <Spinner animation="border" role="status" />
            <div className="sr-only">Loading...</div>
        </div>
        
    );
};

export default FeedLoading;