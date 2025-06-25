import { Avatar } from "@mui/material";
import React, { ReactNode } from "react";

interface Props {
    username: string | undefined;
    subtext?: string | ReactNode;
    actionText?: string | ReactNode;
    onActionClick?: () => void;
    imgUrl?: string;
    avatarSize?: number;
}

export function UserSuggestion({ username, subtext, actionText, onActionClick, imgUrl, avatarSize = 40 }: Props) {
    return (
        <div className="suggestion-row">
            <div className="user-info">
                <Avatar
                    src={imgUrl}
                    sx={{ width: avatarSize, height: avatarSize }}
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
