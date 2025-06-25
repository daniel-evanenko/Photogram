import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { RootState } from '../store/store';
import { addComent, clearStory, loadStory, toggleEmojiPicker } from '../store/actions/story.actions';
import { UserSuggestion } from '../cmps/UserSuggestion';
import { ReactSVG } from 'react-svg';
import { formatTimeAgo } from '../services/util.service';
import { CommentItem } from '../cmps/CommentItem';
import SentimentSatisfiedOutlinedIcon from '@mui/icons-material/SentimentSatisfiedOutlined';
import EmojiPicker from 'emoji-picker-react';
import { useForm } from '../customHooks/useForm';
import LoadingCircle from '../cmps/LoadingCircle';


export function StoryDetailsModal() {
    const story = useSelector((storeState: RootState) => storeState.storyModule.story);
    const isLoading = useSelector((storeState: RootState) => storeState.storyModule.isLoading);
    const activePickerId = useSelector((storeState: RootState) => storeState.storyModule.activePickerId);
    const loggedInUser = useSelector((storeState: RootState) => storeState.userModule.loggedInUser);

    const navigate = useNavigate();
    const { storyId = '' } = useParams();
    const [newComment, setNewComment, handleChange] = useForm({ txt: '' });
    const isPickerOpen = activePickerId === story?._id;

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

    const onAddComment = (ev: React.FormEvent) => {
        ev.preventDefault();
        if (!newComment.txt) return;
        setNewComment({ txt: '' });
        addComent(storyId, newComment.txt)

        toggleEmojiPicker('')
    };
    function moreOptionClicked() {
        console.log('moreOptionClicked')
    }

    const onEmojiClick = (emojiObject: { emoji: string; }) => {
        setNewComment((prevComment: { txt: string; }) => ({ ...prevComment, txt: prevComment.txt + emojiObject.emoji }));
    };


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
                                    <form className="comments-form" onSubmit={onAddComment}>
                                        <button
                                            type="button"
                                            className="emoji-button"
                                            onClick={() => toggleEmojiPicker(story._id)}
                                        >
                                            <SentimentSatisfiedOutlinedIcon sx={{ width: 24, height: 24, color: '#737373' }} />
                                        </button>
                                        <div className="input-container">
                                            <input
                                                type="text"
                                                placeholder="Add a comment..."
                                                name="txt"
                                                value={newComment.txt}
                                                onChange={handleChange}
                                            />
                                            <button type="submit" className="input-button">Post</button>
                                        </div>
                                        {isPickerOpen && (
                                            <div className="emoji-picker-wrapper">
                                                <EmojiPicker onEmojiClick={onEmojiClick} />
                                            </div>
                                        )}
                                    </form>
                                </div>
                            </footer>
                        </div>
                    </>}
            </div>
        </div>
    );
}