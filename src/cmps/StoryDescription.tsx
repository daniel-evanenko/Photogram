import React, { useState } from "react";
import parse from "html-react-parser";

type Props = {
    fullname: string;
    text: string; // text can include <a> for mentions
    maxLength?: number;
};

export const StoryDescription: React.FC<Props> = ({ fullname, text, maxLength = 120 }) => {
    const [isExpanded, setIsExpanded] = useState(false);

    const isLong = text.length > maxLength;
    const visibleText = isExpanded ? text : text.slice(0, maxLength) + (isLong ? "..." : "");

    return (
        <p className="post-description" dir="auto">
            <span className="username">
                {fullname}
            </span>{" "}
            {parse(visibleText)}
            {isLong && !isExpanded && (
                <button className="show-more-btn" onClick={() => setIsExpanded(true)}>more</button>
            )}
        </p>
    );
};
