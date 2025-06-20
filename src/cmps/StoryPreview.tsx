import { Avatar } from "@mui/material";
import { ReactSVG } from "react-svg";
import { formatTimeAgo } from "../services/util.service";
import { StoryDescription } from "./StoryDescription";
import { Story } from "../types/types";
import React from "react";
import SentimentSatisfiedOutlinedIcon from '@mui/icons-material/SentimentSatisfiedOutlined';
import { Link } from "react-router-dom";

export function StoryPreview({ story }: { story: Story }) {
    const likes = story.likedBy.length;
    const comments = story.comments.length;

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
                    <ReactSVG src="/icons/more.svg" />
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
                    <form className="comments-form">
                        <div className="input-container">
                            <input type="text" placeholder="Add a comment..." />
                            <button type="button" className="input-button">Post</button>
                        </div>
                        <button type="button" className="emoji-button" aria-label="Add emoji">
                            <SentimentSatisfiedOutlinedIcon sx={{ width: 13, height: 13, color: '#737373' }} />
                        </button>
                    </form>
                </div>
            </footer>
        </article>
    );
}
