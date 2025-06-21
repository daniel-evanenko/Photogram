import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { RootState } from '../store/store';
import { clearStory, loadStory } from '../store/actions/story.actions';
import { UserSuggestion } from '../cmps/UserSuggestion';
import { ReactSVG } from 'react-svg';
import { formatTimeAgo } from '../services/util.service';
import { CommentItem } from '../cmps/CommentItem';
import SentimentSatisfiedOutlinedIcon from '@mui/icons-material/SentimentSatisfiedOutlined';


export function StoryDetailsModal() {
    const story = useSelector((storeState: RootState) => storeState.storyModule.story);
    const isLoading = useSelector((storeState: RootState) => storeState.storyModule.isLoading);
    const likes = story?.likedBy.length;

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
                            <footer className="story-footer">
                                <div className="story-actions">
                                    <div className="left-actions">
                                        <ReactSVG src="/icons/heart.svg" />
                                        <ReactSVG src="/icons/comment.svg" />
                                        <ReactSVG src="/icons/share.svg" />
                                    </div>
                                    <button className="save-action" aria-label="Save story">
                                        <ReactSVG src="/icons/save.svg" />
                                    </button>
                                </div>
                                <div className="likes">{likes} likes</div>
                                <div className="time-ago">{formatTimeAgo(story.createdAt)}</div>


                                <div className='comments'>
                                    <form className="comments-form">
                                        <button type="button" className="emoji-button" aria-label="Add emoji">
                                            <SentimentSatisfiedOutlinedIcon sx={{ width: 24, height: 24, color: '#737373' }} />
                                        </button>
                                        <div className="input-container">
                                            <input type="text" placeholder="Add a comment..." />
                                            <button type="button" className="input-button">Post</button>
                                        </div>

                                    </form>
                                </div>
                            </footer>
                        </div>
                    </>}
            </div>
        </div>
    );
}