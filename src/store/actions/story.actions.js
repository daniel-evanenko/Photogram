import { storyService } from '../../services/story/story.service.local'
import { ADD_STORY, REMOVE_STORY, SET_STORIES, SET_STORY, UPDATE_STORY } from '../reducers/story.reducer'
import { store } from '../store'

export async function loadStories(filterBy) {
    try {
        const stories = await storyService.query(filterBy)
        store.dispatch(getCmdSetCars(stories))
    } catch (err) {
        console.log('Cannot load stories', err)
        throw err
    }
}

export async function loadStory(storyId) {
    try {
        const story = await storyService.getById(storyId)
        store.dispatch(getCmdSetStory(story))
    } catch (err) {
        console.log('Cannot load story', err)
        throw err
    }
}


export async function removeStory(storyId) {
    try {
        await storyService.remove(storyId)
        store.dispatch(getCmdRemoveStory(storyId))
    } catch (err) {
        console.log('Cannot remove story', err)
        throw err
    }
}

export async function addStory(story) {
    try {
        const savedCar = await storyService.save(story)
        store.dispatch(getCmdAddStory(savedCar))
        return savedCar
    } catch (err) {
        console.log('Cannot add story', err)
        throw err
    }
}

export async function updateStory(story) {
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
function getCmdSetCars(stories) {
    return {
        type: SET_STORIES,
        stories
    }
}
function getCmdSetStory(story) {
    return {
        type: SET_STORY,
        story
    }
}
function getCmdRemoveStory(storyId) {
    return {
        type: REMOVE_STORY,
        storyId
    }
}
function getCmdAddStory(story) {
    return {
        type: ADD_STORY,
        story
    }
}
function getCmdUpdateStory(story) {
    return {
        type: UPDATE_STORY,
        story
    }
}

