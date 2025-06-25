
import { storageService } from '../async-storage.service.js'
import { loadFromStorage, makeId, saveToStorage } from '../util.service'
import { userService } from '../user/index.js'
import { Comment, Story } from '../../types/types.js'

const STORAGE_KEY = 'story'
_fetchStories()

export const storyService = {
    query,
    getById,
    save,
    remove,
    addComment
}
window.cs = storyService

async function _fetchStories() {
    const data = await loadFromStorage(STORAGE_KEY)
    if (!data || !data.length) {
        let response = await fetch('/public/data/tempStoryData.json')
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`)
        }
        response = await response.json()
        saveToStorage(STORAGE_KEY, response)
    }
}

async function query(filterBy = {}) {
    var stories = await storageService.query(STORAGE_KEY)
    return stories
}

function getById(storyId: any) {
    return storageService.get(STORAGE_KEY, storyId)
}

async function remove(storyId: any) {
    // throw new Error('Nope')
    await storageService.remove(STORAGE_KEY, storyId)
}

async function save(story: { _id: any; txt: any; imgUrl: any }) {
    var savedstory
    if (story._id) {
        const storyToSave = {
            _id: story._id,
            txt: story.txt,
            imgUrl: story.imgUrl,
        }
        savedstory = await storageService.put(STORAGE_KEY, storyToSave)
    } else {
        const storyToSave = {
            _id: makeId(),
            txt: story.txt,
            imgUrl: story.imgUrl,
            // Later, owner is set by the backend
            by: userService.getLoggedinUser(),
            comments: [],
            likedBy: []

        }
        savedstory = await storageService.post(STORAGE_KEY, storyToSave)
    }
    return savedstory
}

async function addComment(storyId: string, txt: string) {
    const loggedinUser = userService.getLoggedinUser()
    if (!loggedinUser) throw new Error('Cannot add comment, no user logged in')
    const newComment: Comment = {
        id: makeId(),
        by: {
            _id: loggedinUser._id,
            fullname: loggedinUser.fullname,
            imgUrl: loggedinUser.imgUrl,
        },
        txt,
        createdAt: new Date().toISOString(),
        likedBy: [],
    }
    try {
        const story: Story = await getById(storyId)
        story.comments.push(newComment)
        await storageService.put(STORAGE_KEY, story)
        return newComment
    } catch (err) {
        console.error('Failed to add comment in local service:', err)
        throw err
    }
}
