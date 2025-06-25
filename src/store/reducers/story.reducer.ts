import { Comment, Story } from "../../types/types";

// --- Action Types ---
export const SET_STORIES = 'SET_STORIES';
export const SET_STORY = 'SET_STORY';
export const REMOVE_STORY = 'REMOVE_STORY';
export const ADD_STORY = 'ADD_STORY';
export const UPDATE_STORY = 'UPDATE_STORY';
export const SET_IS_LOADING = 'SET_IS_LOADING';
export const SET_ACTIVE_PICKER = 'SET_ACTIVE_PICKER';
export const ADD_COMMENT = 'ADD_COMMENT';
export const REMOVE_COMMENT = 'REMOVE_COMMENT';
export const ADD_COMMENT_FAILURE = 'ADD_COMMENT_FAILURE';

// --- State Interface ---
export interface StoryState {
    stories: Story[];
    story: Story | null;
    isLoading: boolean;
    activePickerId: string | null;

}

// --- Initial State ---
const initialState: StoryState = {
    stories: [],
    story: null,
    isLoading: false,
    activePickerId: null

};

// --- Action Interfaces ---
export interface SetStoriesAction { type: typeof SET_STORIES; stories: Story[] }
export interface SetStoryAction { type: typeof SET_STORY; story: Story | null }
export interface RemoveStoryAction { type: typeof REMOVE_STORY; storyId: string }
export interface AddStoryAction { type: typeof ADD_STORY; story: Story }
export interface UpdateStoryAction { type: typeof UPDATE_STORY; story: Story }
export interface SetIsLoadingAction { type: typeof SET_IS_LOADING; isLoading: boolean }
export interface SetActivePicker { type: typeof SET_ACTIVE_PICKER; storyId: string | null }
export interface AddComment { type: typeof ADD_COMMENT; storyId: string, comment: Comment }
export interface RemoveComment { type: typeof REMOVE_COMMENT; storyId: string, commentId: string }
export interface AddCommentFailure { type: typeof ADD_COMMENT_FAILURE; storyId: string, commentId: string }

// Union type for all possible story actions.
type StoryAction = SetStoriesAction | SetStoryAction | RemoveStoryAction | AddStoryAction | UpdateStoryAction | SetIsLoadingAction | SetActivePicker | AddComment | AddCommentFailure | RemoveComment;


// --- Reducer Function ---
export function storyReducer(state: StoryState = initialState, action: StoryAction): StoryState {
    switch (action.type) {
        case SET_IS_LOADING:
            return { ...state, isLoading: action.isLoading };

        case SET_STORIES:
            // Return a new state object with the updated stories array.
            return { ...state, stories: action.stories };

        case SET_STORY:
            return { ...state, story: action.story };

        case REMOVE_STORY:
            // Return a new state object with a new, filtered array.
            return {
                ...state,
                stories: state.stories.filter(story => story._id !== action.storyId)
            };

        case ADD_STORY:
            // Return a new state object with a new array including the added story.
            return {
                ...state,
                stories: [...state.stories, action.story]
            };

        case UPDATE_STORY:
            // Return a new state object with a new array where the specific story is updated.
            return {
                ...state,
                stories: state.stories.map(story =>
                    story._id === action.story._id ? action.story : story
                )
            };
        case SET_ACTIVE_PICKER:
            return {
                ...state,
                activePickerId: action.storyId,
            };
        case ADD_COMMENT:
            return {
                ...state,
                stories: state.stories.map(s =>
                    s._id === action.storyId
                        ? { ...s, comments: [action.comment, ...s.comments] }
                        : s
                ),

                story: state.story?._id === action.storyId
                    ? { ...state.story, comments: [action.comment, ...state.story.comments] }
                    : state.story,
            };
        case ADD_COMMENT_FAILURE:
            return {
                ...state,
                stories: state.stories.map(s =>
                    s._id === action.storyId
                        ? { ...s, comments: s.comments.filter(c => c.id !== action.commentId) }
                        : s
                ),
                story: state.story?._id === action.storyId
                    ? { ...state.story, comments: state.story.comments.filter(c => c.id !== action.commentId) }
                    : state.story
            }

        case REMOVE_COMMENT:
            return {
                ...state,
                stories: state.stories.map(s =>
                    s._id === action.storyId
                        ? { ...s, comments: s.comments.filter(c => c.id !== action.commentId) }
                        : s
                ),
                story: state.story?._id === action.storyId
                    ? { ...state.story, comments: state.story.comments.filter(c => c.id !== action.commentId) }
                    : state.story
            }
        default:
            // If the action doesn't match, return the existing state without changes.
            return state;
    }
}
