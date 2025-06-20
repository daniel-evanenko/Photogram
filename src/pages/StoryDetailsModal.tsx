import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { RootState } from '../store/store';
import { clearStory, loadStory } from '../store/actions/story.actions';
import { UserSuggestion } from '../cmps/UserSuggestion';
import { ReactSVG } from 'react-svg';
import { formatTimeAgo } from '../services/util.service';
import { CommentItem } from '../cmps/CommentItem';


export function StoryDetailsModal() {
    const story = useSelector((storeState: RootState) => storeState.storyModule.story);
    const isLoading = useSelector((storeState: RootState) => storeState.storyModule.isLoading);

    const navigate = useNavigate();
    const { storyId } = useParams();

    useEffect(() => {
        if (storyId) {
            loadStory(storyId)
        }

        return (() => {
            clearStory()
        })
    }, [storyId]);

    const handleClose = () => {
        navigate('/');
    };

    if (!storyId) {
        return null;
    }

    function moreOptionClicked() {
        console.log('moreOptionClicked')
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
                                <ul>
                                    {story.comments.map(c => <li>
                                        {
                                            <CommentItem user={c.by} text={c.txt} timestamp={formatTimeAgo(c.createdAt, false)}></CommentItem>
                                        }
                                    </li>)}
                                </ul>
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