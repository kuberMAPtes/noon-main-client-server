import React, { useRef } from 'react';
import module from '../css/profileFeedList.module.css';
import FeedItem from '../../../feed/component/FeedList/FeedItem';

const ProfileFeedList = ({ toId, feeds, lastFeedElementRef }) => {

  const setRef = (el, index) => {
    if (feeds.length === index + 1) {
      lastFeedElementRef.current = el;
    }
  };

  return (
    <>
      {feeds.map((feed, index) => (
        <div
          key={feed.feedId ?? `feed-${index}`}
          className={`col-12 mb-4`}
          ref={(el) => setRef(el, index)}
        >
          <FeedItem data={feed} memberId={toId} />
        </div>
      ))}
    </>
  );
};

export default ProfileFeedList;
