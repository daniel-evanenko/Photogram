import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { StoryList } from "../cmps/StoryList";
import { loadStories } from "../store/actions/story.actions";
import { RootState } from "../store/store";

export function StoryIndex() {
    const stories = useSelector((storeState: RootState) => storeState.storyModule.stories);

    useEffect(() => {
        loadStories();
    }, []);

    return (
        <div className="story-index">
            <StoryList stories={stories}></StoryList>
        </div>
    );
}