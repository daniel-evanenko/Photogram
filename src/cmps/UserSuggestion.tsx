import { Avatar } from "@mui/material";
import React from "react";

interface Props {
    username: string;
    subtext?: string;
    actionText?: string;
    onActionClick?: () => void;
    imgUrl?: string;
}

export function UserSuggestion({ username, subtext, actionText, onActionClick, imgUrl }: Props) {
    return (
        <div className="suggestion-row">
            <div className="user-info">
                <Avatar
                    src={imgUrl}
                    sx={{ width: 40, height: 40 }}
                />
                <div className="username">
                    <a>{username}</a>
                    {subtext && <span>{subtext}</span>}
                </div>
            </div>
            <a className="action" onClick={onActionClick}>{actionText}</a>
        </div>
    );
}
