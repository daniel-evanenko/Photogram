import React, { useEffect } from "react";
import { useParams } from "react-router";
import { clearStory, loadStory } from "../store/actions/story.actions";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";


export function StoryDetails() {
    const story = useSelector((storeState: RootState) => storeState.storyModule.story);

    const { storyId } = useParams<{ storyId: string }>()

    useEffect(() => {
        if (storyId) {
            loadStory(storyId);
        }

        return () => {
            clearStory()
        }
    }, [storyId]);

    return (
        <div className="story-details">
            <h1>{story?.txt}</h1>
        </div>
    )

}