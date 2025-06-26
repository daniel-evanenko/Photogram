import { Avatar } from "@mui/material";
import { ReactSVG } from "react-svg";
import { formatTimeAgo } from "../services/util.service";
import { StoryDescription } from "./StoryDescription";
import { DropdownItem, Story } from "../types/types";
import React, { useState } from "react";
import SentimentSatisfiedOutlinedIcon from '@mui/icons-material/SentimentSatisfiedOutlined';
import { Link } from "react-router-dom";
import { useForm } from "../customHooks/useForm";
import EmojiPicker from "emoji-picker-react";
import { removeStory, toggleDropdownOptions, toggleEmojiPicker } from "../store/actions/story.actions";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import { DropdownOptions } from "./DropdownOptions";

export function StoryPreview({ story }: { story: Story }) {
    const activePickerId = useSelector((storeState: RootState) => storeState.storyModule.activePickerId);
    const activeDropdownId = useSelector((storeState: RootState) => storeState.storyModule.activeDropdownId);
    const loggedInUser = useSelector((storeState: RootState) => storeState.userModule.loggedInUser);

    const [newComment, setNewComment, handleChange] = useForm({ txt: '' });
    const likes = story.likedBy.length;
    const comments = story.comments.length;
    const isPickerOpen = activePickerId === story?._id;
    const isDropdownOpen = activeDropdownId === story?._id;
    const isOwner = loggedInUser?._id === story.by._id;

    const options: DropdownItem[] = isOwner
        ? [
            { label: 'Delete', action: () => (removeStory(story._id)), style: 'danger' },
            { label: 'Edit', action: () => console.log('Editing story...') }
        ]
        : [
            { label: 'Report', action: () => console.log('Reporting story...'), style: 'danger' },
            { label: 'Unfollow', action: () => console.log('Unfollowing user...') }
        ];

    const onAddComment = (ev: React.FormEvent) => {
        ev.preventDefault();
        if (!newComment.txt) return;
        setNewComment({ txt: '' });
        toggleEmojiPicker(story._id)
    };
    function moreOptionClicked() {
        toggleDropdownOptions(story?._id)
    }

    const onEmojiClick = (emojiObject: { emoji: string; }) => {
        setNewComment((prevComment: { txt: string; }) => ({ ...prevComment, txt: prevComment.txt + emojiObject.emoji }));
    };
    return (
        <article className="story-preview">
            <header className="story-header">
                <div className="user-info">
                    <Avatar src={story.by.imgUrl} alt={story.by.fullname} sx={{ width: 32, height: 32 }} />
                    <div className="user-meta">
                        <span className="fullname">{story.by.fullname}</span>
                        <span className="time-ago">• {formatTimeAgo(story.createdAt)}</span>
                    </div>
                </div>
                <button className="icon-button" aria-label="More options">
                    <ReactSVG onClick={moreOptionClicked} src="/icons/more.svg" />
                </button>
            </header>

            <main className="story-main">
                <img className="story-img" src={story.imgUrl} alt="Story visual content" />
            </main>

            <footer className="story-footer">
                <div className="story-actions">
                    <div className="left-actions">
                        <ReactSVG src="/icons/heart.svg" />
                        <Link
                            to={`/story/${story._id}`}
                        >
                            <ReactSVG src="/icons/comment.svg" />
                        </Link>
                        <ReactSVG src="/icons/share.svg" />
                    </div>
                    <button className="save-action" aria-label="Save story">
                        <ReactSVG src="/icons/save.svg" />
                    </button>
                </div>

                <div className="likes">{likes} likes</div>

                <StoryDescription fullname={story.by.fullname} text={story.txt} />

                <div className="comments">
                    {comments > 0 && (
                        <div className="comment-tag">
                            <Link to={`/story/${story._id}`}>
                                View {comments >= 5 ? 'all' : ''} {comments} comments
                            </Link>
                        </div>
                    )}
                    <div>
                    </div>
                </div>
                <div>
                    <form className="comments-form" onSubmit={onAddComment}>
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
                        <button
                            type="button"
                            className="emoji-button"
                            onClick={() => toggleEmojiPicker(story._id)}>
                            <SentimentSatisfiedOutlinedIcon sx={{ width: 13, height: 13, color: '#737373' }} />
                        </button>
                        {isPickerOpen && (
                            <div className="emoji-picker-wrapper">
                                <EmojiPicker onEmojiClick={onEmojiClick} />
                            </div>
                        )}
                        {isDropdownOpen && (
                            <DropdownOptions options={options} handleClose={moreOptionClicked}></DropdownOptions>

                        )}
                    </form>

                </div>
            </footer>
        </article>
    );
}
