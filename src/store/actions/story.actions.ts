import { storyService } from '../../services/story/story.service.local.js'
import { userService } from '../../services/user/user.service.local.js'
import { makeId } from '../../services/util.service.js'
import { Comment, Story } from '../../types/types.js'
import { SET_STORIES, SET_STORY, REMOVE_STORY, ADD_STORY, UPDATE_STORY, SET_IS_LOADING, SetIsLoadingAction, SetStoriesAction, SetStoryAction, RemoveStoryAction, AddStoryAction, UpdateStoryAction, SetActivePicker, SET_ACTIVE_PICKER, AddComment, ADD_COMMENT, AddCommentFailure, ADD_COMMENT_FAILURE } from '../reducers/story.reducer.js'
import { store } from '../store.js'


export async function loadStories(filterBy?: any) {
    store.dispatch(getCmdSetIsLoading(true))
    try {
        const stories = await storyService.query(filterBy)

        store.dispatch(getCmdSetStories(stories))

    } catch (err) {
        console.error('Cannot load stories:', err)
        throw err
    } finally {
        store.dispatch(getCmdSetIsLoading(false))
    }
}

export async function loadStory(storyId: string) {
    store.dispatch(getCmdSetIsLoading(true))
    try {
        const story = await storyService.getById(storyId)
        store.dispatch(getCmdSetStory(story))
    } catch (err) {
        console.log('Cannot load story', err)
        throw err
    } finally {
        store.dispatch(getCmdSetIsLoading(false))
    }
}

export async function clearStory() {
    try {
        store.dispatch(getCmdClearStory())
    } catch (err) {
        console.log('Cannot clear story', err)
        throw err
    }
}


export async function removeStory(storyId: string) {
    try {
        await storyService.remove(storyId)
        store.dispatch(getCmdRemoveStory(storyId))
    } catch (err) {
        console.log('Cannot remove story', err)
        throw err
    }
}

export async function addStory(story: Story) {
    try {
        const savedStory = await storyService.save(story)
        store.dispatch(getCmdAddStory(savedStory))
        return savedStory
    } catch (err) {
        console.log('Cannot add story', err)
        throw err
    }
}

export async function updateStory(story: Story) {
    try {
        const savedStory = await storyService.save(story)
        store.dispatch(getCmdUpdateStory(savedStory))
        return savedStory
    } catch (err) {
        console.log('Cannot save story', err)
        throw err
    }
}
export function toggleEmojiPicker(storyId: string) {
    try {
        const { activePickerId } = store.getState().storyModule;
        const newActiveId = activePickerId === storyId ? null : storyId;
        store.dispatch(getCmdSetActivePicker(newActiveId))
    } catch (err) {
        console.log('Cannot toggle emoji picker', err)
    }
}

export async function addComent(storyId: string, comment: string) {
    const loggedinUser = userService.getLoggedinUser()
    if (!loggedinUser) throw new Error('Cannot add comment, no user logged in')
    const newComment: Comment = {
        id: makeId(),
        by: {
            _id: loggedinUser._id,
            fullname: loggedinUser.fullname,
            imgUrl: loggedinUser.imgUrl,
        },
        txt: comment,
        createdAt: new Date().toISOString(),
        likedBy: [],
    }
    try {
        store.dispatch(getCmdAddComment(storyId, newComment))
        await storyService.addComment(storyId, newComment)
    } catch (err) {
        store.dispatch(getCmdAddCommentFailure(storyId, newComment.id))
        console.error('Cannot add comment:', err);
    }
}

// Command Creators:
function getCmdAddCommentFailure(storyId: string, commentId: string): AddCommentFailure {
    return {
        type: ADD_COMMENT_FAILURE,
        storyId,
        commentId
    };
}
function getCmdAddComment(storyId: string, comment: Comment): AddComment {
    return {
        type: ADD_COMMENT,
        storyId,
        comment
    };
}
function getCmdSetActivePicker(storyId: string | null): SetActivePicker {
    return {
        type: SET_ACTIVE_PICKER,
        storyId
    };
}
function getCmdSetIsLoading(isLoading: boolean): SetIsLoadingAction {
    return {
        type: SET_IS_LOADING,
        isLoading
    };
}

function getCmdSetStories(stories: Story[]): SetStoriesAction {
    return {
        type: SET_STORIES,
        stories
    };
}
function getCmdSetStory(story: Story): SetStoryAction {
    return {
        type: SET_STORY,
        story
    }
}
function getCmdClearStory(story = null): SetStoryAction {
    return {
        type: SET_STORY,
        story
    }
}
function getCmdRemoveStory(storyId: string): RemoveStoryAction {
    return {
        type: REMOVE_STORY,
        storyId
    }
}
function getCmdAddStory(story: Story): AddStoryAction {
    return {
        type: ADD_STORY,
        story
    }
}
function getCmdUpdateStory(story: Story): UpdateStoryAction {
    return {
        type: UPDATE_STORY,
        story
    }
}

