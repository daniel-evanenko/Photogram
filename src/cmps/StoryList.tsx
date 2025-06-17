import React from "react";
import { Story } from "../types/types";
import { StoryPreview } from "./StoryPreview";

export function StoryList({ stories }: { stories: Story[] }) {
    return (
        <div className="story-list">
            {stories.map(s => <StoryPreview key={s._id} story={s} />)}
        </div>
    );
}