import React, { useRef } from 'react';
import FeedItemByMember from '../FeedItemByMember';
import module from '../css/profileFeedList.module.css';

const ProfileFeedList = ({ feeds, lastFeedElementRef }) => {

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
          className={`col-12 mb-4 ${module.heightSize}`}
          ref={(el) => setRef(el, index)}
        >
          <FeedItemByMember data={feed} />
        </div>
      ))}
    </>
  );
};

export default ProfileFeedList;
