import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import { RootState } from '../store/store';
import { clearStory, loadStory } from '../store/actions/story.actions';


export function StoryDetailsModal() {
    const story = useSelector((storeState: RootState) => storeState.storyModule.story);
    const isLoading = useSelector((storeState: RootState) => storeState.storyModule.isLoading);

    const [searchParams, setSearchParams] = useSearchParams();

    const storyId = searchParams.get('storyId');

    useEffect(() => {
        if (storyId) {
            loadStory(storyId)
        }

        return (() => {
            clearStory()
        })
    }, [storyId]);

    const handleClose = () => {
        setSearchParams({});
    };

    if (!storyId) {
        return null;
    }

    return (
        <div className="story-details-backdrop" onClick={handleClose}>
            <div className="story-details-modal" onClick={(e) => e.stopPropagation()}>
                {isLoading && <p>Loading...</p>}
                {story && (
                    <>
                        <h2>{story.txt}</h2>
                        <button onClick={handleClose}>Close</button>
                    </>
                )}
            </div>
        </div>
    );
}