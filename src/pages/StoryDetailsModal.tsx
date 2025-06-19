import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import { RootState } from '../store/store';
import { clearStory, loadStory } from '../store/actions/story.actions';
import { UserSuggestion } from '../cmps/UserSuggestion';
import { ReactSVG } from 'react-svg';


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
                {story &&
                    <>
                        <div className="modal-image-column">
                            <img src={story?.imgUrl} alt="" />
                        </div>
                        <div className='modal-content-column'>
                            <header className='modal-header'>
                                <UserSuggestion
                                    username="daniel__evanenko"
                                    imgUrl="/avatars/daniel.jpg"
                                    actionText={<ReactSVG src='/public/icons/more.svg'></ReactSVG>}
                                    avatarSize={32}
                                />
                            </header>
                            <section className='modal-comments-area'>
                                <h2>Section</h2>
                            </section>
                            <footer className='modal-actions-footer'>
                                <h3>Footer</h3>
                            </footer>
                        </div>
                    </>}
            </div>
        </div>
    );
}