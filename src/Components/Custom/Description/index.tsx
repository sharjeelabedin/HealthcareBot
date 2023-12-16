import React, { useState } from "react";

type Props = {
  text: string;
  maxLimit: number;
};

export const Description: React.FC<Props> = ({ text, maxLimit }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleExpand = () => setIsExpanded(true);
  const handleCollapse = () => setIsExpanded(false);

  if (!isExpanded && text && text.length > maxLimit) {
    return (
      <p>
        {text.substring(0, maxLimit) + "... "}
        <span
          onClick={handleExpand}
          style={{
            fontWeight: "bold",
            color: "black",
            cursor: "pointer",
          }}
        >
          See more
        </span>
      </p>
    );
  } else {
    return (
      <p>
        {text}
        {text && text.length > maxLimit && (
          <span
            onClick={handleCollapse}
            style={{
              fontWeight: "bold",
              color: "black",
              cursor: "pointer",
            }}
          >
            {" "}
            See less
          </span>
        )}
      </p>
    );
  }
};
