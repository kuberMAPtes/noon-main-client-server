import React, { useCallback, useRef } from "react";
import FeedItemByMember from "../FeedItemByMember";

const ProfileFeedList = ({ feeds, lastFeedElementRef }) => {
  return (
    <>
      {feeds.map((feed, index) => (
        <div
          key={feed.feedId}
          className="col-12 mb-4"
          ref={feeds.length === index + 1 ? lastFeedElementRef : null}
        >
          <FeedItemByMember data={feed} />
        </div>
      ))}
    </>
  );
};

export default ProfileFeedList;
