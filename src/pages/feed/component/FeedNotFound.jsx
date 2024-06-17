import React from 'react';
import { Link } from 'react-router-dom';
import '../css/FeedNotFound.css'

const NotFoundPage = () => {
  return (
    <div className="not-found-container">
      <h1 className="not-found-title">404 - Feed Not Found</h1>
      <p className="not-found-message">The feed you are looking for does not exist or has been removed.</p>
      <Link to="/" className="not-found-link">Go back to Feed List</Link>
    </div>
  );
};

export default NotFoundPage;