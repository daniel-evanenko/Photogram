import React, { useState, useRef } from 'react';
import SentimentSatisfiedOutlinedIcon from '@mui/icons-material/SentimentSatisfiedOutlined';
import EmojiPicker, { EmojiClickData } from 'emoji-picker-react';
import { addComent } from '../store/actions/story.actions';
import { useForm } from '../customHooks/useForm';

interface AddCommentFormProps {
    storyId: string;
    isPreview?: boolean;
}

export function AddCommentForm({ storyId, isPreview = false }: AddCommentFormProps) {
    const [fields, setFields, handleChange] = useForm({ txt: '' });
    const [showPicker, setShowPicker] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null);
    const currentComments = []
    const onAddComment = (ev: React.FormEvent<HTMLFormElement>) => {
        ev.preventDefault();
        const { txt } = fields;
        if (!txt.trim()) return;

        addComent(storyId, txt);
        currentComments.push(txt)
        setFields({ txt: '' });
        setShowPicker(false);
    };

    const onEmojiClick = (emojiObject: EmojiClickData) => {
        const { txt } = fields;
        setFields({ txt: txt + emojiObject.emoji });
        inputRef.current?.focus();
    };

    const toggleEmojiPicker = () => {
        setShowPicker(prevShowPicker => !prevShowPicker);
    };
    const iconStyle = {
        color: '#737373',
        width: isPreview ? 13 : 24,
        height: isPreview ? 13 : 24,
    };

    const emojiButton = (
        <button
            type="button"
            className="emoji-button"
            aria-label="Add emoji"
            onClick={toggleEmojiPicker}
        >
            <SentimentSatisfiedOutlinedIcon sx={iconStyle} />
        </button>
    );

    return (
        <form className="comments-form" onSubmit={onAddComment}>
            {!isPreview && emojiButton}
            <div className="input-container">
                <input
                    ref={inputRef}
                    type="text"
                    name="txt"
                    placeholder="Add a comment..."
                    value={fields.txt}
                    onChange={handleChange}
                    autoComplete="off"
                />
                <button type="submit" className="input-button" disabled={!fields.txt.trim()}>
                    Post
                </button>
            </div>
            {isPreview && emojiButton}
            {showPicker && (
                <div className="emoji-picker-wrapper">
                    <EmojiPicker onEmojiClick={onEmojiClick}  />
                </div>
            )}
        </form>
    );
}