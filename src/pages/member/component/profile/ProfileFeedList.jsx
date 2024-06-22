import React, { useCallback, useRef } from "react";
import FeedItemByMember from "../FeedItemByMember";
import module from "../css/profileFeedList.module.css";
const ProfileFeedList = ({ feeds, lastFeedElementRef }) => {
  return (
    <>
      {feeds.map((feed, index) => (
        <div
          key={feed.feedId ?? `feed-${index}`}
          className={`col-12 mb-4 ${module.heightSize}`}
          ref={feeds.length === index + 1 ? lastFeedElementRef : null}
        >
          <FeedItemByMember data={feed} />
        </div>
      ))}
    </>
  );
};

export default ProfileFeedList;
