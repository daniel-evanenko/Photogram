import React, { useState } from 'react';

import SentimentSatisfiedOutlinedIcon from '@mui/icons-material/SentimentSatisfiedOutlined';
import EmojiPicker, { EmojiClickData } from 'emoji-picker-react';
import { addComent } from '../store/actions/story.actions';
import { useForm } from '../customHooks/useForm';

interface AddCommentFormProps {
    storyId: string;
}

export function AddCommentForm({ storyId }: AddCommentFormProps) {

    const [newComment, setNewComment, handleChange] = useForm({ txt: '' });
    const [showPicker, setShowPicker] = useState(false);

    const onAddComment = (ev: React.FormEvent<HTMLFormElement>) => {
        ev.preventDefault();
        if (!newComment.txt.trim()) return;

        addComent(storyId, newComment.txt)
        setNewComment({ txt: '' });
    };

    const onEmojiClick = (emojiObject: EmojiClickData) => {
        setNewComment((prevComment: { txt: string; }) => ({ ...prevComment, txt: prevComment.txt + emojiObject.emoji }));
    };

    return (
        <form className="comments-form" onSubmit={onAddComment}>
            <button
                type="button"
                className="emoji-button"
                aria-label="Add emoji"
                onClick={() => setShowPicker(val => !val)}
            >
                <SentimentSatisfiedOutlinedIcon sx={{ width: 24, height: 24, color: '#737373' }} />
            </button>
            <div className="input-container">
                <input
                    type="text"
                    name="txt"
                    placeholder="Add a comment..."
                    value={newComment.txt}
                    onChange={handleChange}
                    autoComplete="off"
                />
                <button type="submit" className="input-button">Post</button>
            </div>
            {showPicker && (
                <div className="emoji-picker-wrapper">
                    <EmojiPicker onEmojiClick={onEmojiClick} height={350} />
                </div>
            )}
        </form>
    );
}