import { Avatar } from '@mui/material';
import React, { ReactNode } from 'react';
import { ReactSVG } from 'react-svg';
import { Comment, DropdownItem } from '../types/types';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { useDropdown } from '../customHooks/useDropdown';
import { formatTimeAgo } from '../services/util.service';
import { DropdownOptions } from './DropdownOptions';
import { removeComment } from '../store/actions/story.actions';
interface Props {
    storyId: string;
    comment: Comment;
}
export function CommentItem({ storyId, comment }: Props) {
    const loggedInUser = useSelector((storeState: RootState) => storeState.userModule.loggedInUser);
    const { isDropdownOpen, handleToggleDropdown } = useDropdown(comment.id);

    const isOwner = loggedInUser?._id === comment.by._id;

    const { by: user, createdAt, txt } = comment
    const commentOptions: DropdownItem[] = isOwner
        ? [
            { label: 'Delete', action: () => removeComment(storyId, comment), style: 'danger' },
            { label: 'Cancel', action: () => handleToggleDropdown }
        ]
        : [
            { label: 'Report', action: () => console.log('report'), style: 'danger' },
            { label: 'Cancel', action: () => handleToggleDropdown }
        ]; return (
            <>
                <li className="comment-item">
                    <div className="comment-main-content">
                        <Avatar src={user.imgUrl} sx={{ width: 32, height: 32 }}></Avatar>
                        <div className="comment-body">
                            <a className="comment-text">
                                <strong>{user.fullname}</strong> {txt}
                            </a>
                            <div className="comment-actions">
                                <span>{formatTimeAgo(createdAt, false)}</span>
                                <span>
                                    <ReactSVG onClick={handleToggleDropdown} src='/public/icons/more.svg'></ReactSVG>
                                </span>

                            </div>
                        </div>
                    </div>

                    <button className="comment-like-btn" aria-label="Like comment">
                        <ReactSVG src='/public/icons/heart.svg'></ReactSVG>
                    </button>

                </li>
                {isDropdownOpen && (
                    <DropdownOptions
                        options={commentOptions}
                        handleClose={handleToggleDropdown}
                    />
                )}
            </>

        );
}
