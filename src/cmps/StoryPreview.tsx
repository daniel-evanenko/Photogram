import { Avatar } from "@mui/material";
import React from "react";
import { ReactSVG } from "react-svg";
import { LongTxt } from "./LongText";
import { makeLorem } from "../services/util.service";
import { StoryDescription } from "./StoryDescription";

export function StoryPreview() {

    const lorem = makeLorem()

    return (
        <article className="story-preview">
            <header className="story-header">
                <div className="user-info">
                    <Avatar></Avatar>
                    <span>username</span>
                    <span> . 1h</span>
                </div>
                <ReactSVG src="/public/icons/more.svg"></ReactSVG>
            </header>
            <main>
                <img className="story-img" src="/public/img/download.jpeg"></img>
            </main>
            <footer>
                <div className="story-actions">
                    <div>
                        <ReactSVG src="/public/icons/heart.svg"></ReactSVG>
                        <ReactSVG src="/public/icons/comment.svg"></ReactSVG>
                        <ReactSVG src="/public/icons/share.svg"></ReactSVG>
                    </div>
                    <div className="save-action">
                        <ReactSVG src="/public/icons/save.svg"></ReactSVG>
                    </div>
                </div>
                <div>
                    <span className="likes">39 likes</span>
                </div>
                <div>
                    <StoryDescription
                        username="guest"
                        text={lorem}
                    />
                </div>

            </footer>
        </article>
    )

}