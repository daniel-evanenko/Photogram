import { storyService } from '../../services/story/story.service.local.js'
import { Story } from '../../types/types.js'
import { SET_STORIES, SET_STORY, REMOVE_STORY, ADD_STORY, UPDATE_STORY, SET_IS_LOADING, SetIsLoadingAction, SetStoriesAction, SetStoryAction, RemoveStoryAction, AddStoryAction, UpdateStoryAction } from '../reducers/story.reducer.js'
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
    try {
        const story = await storyService.getById(storyId)
        store.dispatch(getCmdSetStory(story))
    } catch (err) {
        console.log('Cannot load story', err)
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
        const savedCar = await storyService.save(story)
        store.dispatch(getCmdAddStory(savedCar))
        return savedCar
    } catch (err) {
        console.log('Cannot add story', err)
        throw err
    }
}

export async function updateStory(story: Story) {
    try {
        const savedCar = await storyService.save(story)
        store.dispatch(getCmdUpdateStory(savedCar))
        return savedCar
    } catch (err) {
        console.log('Cannot save story', err)
        throw err
    }
}

// Command Creators:
function getCmdSetIsLoading(isLoading: boolean): SetIsLoadingAction {
    return {
        type: SET_IS_LOADING,
        isLoading: isLoading
    };
}

function getCmdSetStories(stories: Story[]): SetStoriesAction {
    return {
        type: SET_STORIES,
        stories: stories
    };
}
function getCmdSetStory(story: Story): SetStoryAction {
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

