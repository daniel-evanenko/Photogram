import { Avatar } from "@mui/material";
import { ReactSVG } from "react-svg";
import { formatTimeAgo } from "../services/util.service";
import { StoryDescription } from "./StoryDescription";
import { Story } from "../types/types";
import React from "react";

export function StoryPreview({ story }: { story: Story }) {
    const likes = story.likedBy.length;

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
                        <ReactSVG src="/icons/comment.svg" />
                        <ReactSVG src="/icons/share.svg" />
                    </div>
                    <button className="save-action" aria-label="Save story">
                        <ReactSVG src="/icons/save.svg" />
                    </button>
                </div>

                <div className="likes">{likes} likes</div>

                <StoryDescription fullname={story.by.fullname} text={story.txt} />
            </footer>
        </article>
    );
}
