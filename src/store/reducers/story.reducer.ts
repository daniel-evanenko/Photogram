import { Story } from "../../types/types";

// --- Action Types ---
export const SET_STORIES = 'SET_STORIES';
export const SET_STORY = 'SET_STORY';
export const REMOVE_STORY = 'REMOVE_STORY';
export const ADD_STORY = 'ADD_STORY';
export const UPDATE_STORY = 'UPDATE_STORY';
export const SET_IS_LOADING = 'SET_IS_LOADING';

// --- State Interface ---
export interface StoryState {
    stories: Story[];
    story: Story | null;
    isLoading: boolean;
}

// --- Initial State ---
const initialState: StoryState = {
    stories: [],
    story: null,
    isLoading: false
};

// --- Action Interfaces ---
export interface SetStoriesAction { type: typeof SET_STORIES; stories: Story[] }
export interface SetStoryAction { type: typeof SET_STORY; story: Story }
export interface RemoveStoryAction { type: typeof REMOVE_STORY; storyId: string }
export interface AddStoryAction { type: typeof ADD_STORY; story: Story }
export interface UpdateStoryAction { type: typeof UPDATE_STORY; story: Story }
export interface SetIsLoadingAction { type: typeof SET_IS_LOADING; isLoading: boolean }

// Union type for all possible story actions.
type StoryAction = SetStoriesAction | SetStoryAction | RemoveStoryAction | AddStoryAction | UpdateStoryAction | SetIsLoadingAction;


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

        default:
            // If the action doesn't match, return the existing state without changes.
            return state;
    }
}
