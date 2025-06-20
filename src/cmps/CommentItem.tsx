import { Avatar } from '@mui/material';
import React, { ReactNode } from 'react';
import { ReactSVG } from 'react-svg';
import { User } from '../types/types';
interface Props {
    user: User;
    text: string | ReactNode;
    timestamp: string;
    onMoreActionClick?: () => void;
}
export function CommentItem({ user, text, timestamp, onMoreActionClick }: Props) {
    return (
        <li className="comment-item">
            <div className="comment-main-content">
                <Avatar src={user.imgUrl} sx={{ width: 32, height: 32 }}></Avatar>
                <div className="comment-body">
                    <a className="comment-text">
                        <strong>{user.fullname}</strong> {text}
                    </a>
                    <div className="comment-actions">
                        <span>{timestamp}</span>
                        <span>
                            <ReactSVG onClick={onMoreActionClick} src='/public/icons/more.svg'></ReactSVG>
                        </span>

                    </div>
                </div>
            </div>

            <button className="comment-like-btn" aria-label="Like comment">
                <ReactSVG src='/public/icons/heart.svg'></ReactSVG>
            </button>
        </li>
    );
}
