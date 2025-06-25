import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { RootState } from '../store/store';
import { clearStory, loadStory } from '../store/actions/story.actions';
import { UserSuggestion } from '../cmps/UserSuggestion';
import { ReactSVG } from 'react-svg';
import { formatTimeAgo } from '../services/util.service';
import { CommentItem } from '../cmps/CommentItem';

import LoadingCircle from '../cmps/LoadingCircle';
import { AddCommentForm } from '../cmps/AddCommentForm';


export function StoryDetailsModal() {
    const story = useSelector((storeState: RootState) => storeState.storyModule.story);
    const isLoading = useSelector((storeState: RootState) => storeState.storyModule.isLoading);
    const loggedInUser = useSelector((storeState: RootState) => storeState.userModule.loggedInUser);

    const navigate = useNavigate();
    const { storyId = '' } = useParams<{ storyId: string }>();

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

    function moreOptionClicked() {
        console.log('moreOptionClicked')
    }




    const { comments = [], likedBy = [] } = story || {};

    return (
        <div className="story-details-backdrop" onClick={handleClose}>
            {isLoading && <LoadingCircle></LoadingCircle>}
            <div className="story-details-modal" onClick={(e) => e.stopPropagation()}>
                {story &&
                    <>
                        <div className="modal-image-column">
                            <img src={story?.imgUrl} alt="" />
                        </div>
                        <div className='modal-content-column'>
                            <header className='modal-header'>
                                <UserSuggestion
                                    username={loggedInUser?.username}
                                    imgUrl={loggedInUser?.imgUrl}
                                    actionText={<ReactSVG src='/public/icons/more.svg'></ReactSVG>}
                                    avatarSize={32}
                                />
                            </header>
                            <section className='modal-comments-area'>
                                <ul>
                                    {comments.map(c => <li>
                                        {
                                            <CommentItem key={c.id} user={c.by} text={c.txt} timestamp={formatTimeAgo(c.createdAt, false)}></CommentItem>
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
                                <div className="likes">{likedBy.length} likes</div>
                                <div className="time-ago">{formatTimeAgo(story.createdAt)}</div>


                                <div className='comments'>
                                    <AddCommentForm storyId={storyId}></AddCommentForm>
                                </div>
                            </footer>
                        </div>
                    </>}
            </div>
        </div>
    );
}