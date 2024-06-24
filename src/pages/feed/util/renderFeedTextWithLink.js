import React from "react";
import navigator from "./Navigator";

const renderFeedTextWithLink = (text) => {
  const { goToMemberProfile } = navigator();

  if (!text) return ""; // Exception 처리
  const parts = text.split(/(@\w+)/);

  return parts.map((part, index) => {
    if (part.startsWith("@")) {
      const userId = part.substring(1);
      return (
        <span
          key={index}
          onClick={() => goToMemberProfile(userId)}
          style={{ cursor: "pointer", color: "blue" }}
        >
          {part}
        </span>
      );
    } else {
      return part;
    }
  });
};

export default renderFeedTextWithLink;
