import React, { useState } from "react";
import parse from "html-react-parser";

type Props = {
    username: string;
    text: string; // text can include <a> for mentions
    maxLength?: number;
};

export const StoryDescription: React.FC<Props> = ({ username, text, maxLength = 120 }) => {
    const [isExpanded, setIsExpanded] = useState(false);

    const isLong = text.length > maxLength;
    const visibleText = isExpanded ? text : text.slice(0, maxLength) + (isLong ? "..." : "");

    return (
        <p className="post-description" dir="auto">
            <span className="username">
                {username}
            </span>{" "}
            {parse(visibleText)}
            {isLong && !isExpanded && (
                <button className="show-more-btn" onClick={() => setIsExpanded(true)}>more</button>
            )}
        </p>
    );
};
