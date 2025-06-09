
import { storageService } from '../async-storage.service'
import { makeId } from '../util.service'
import { userService } from '../user'

const STORAGE_KEY = 'story'

export const storyService = {
    query,
    getById,
    save,
    remove,
}
window.cs = storyService


async function query(filterBy = {}) {
    var storys = await storageService.query(STORAGE_KEY)
    return storys
}

function getById(storyId) {
    return storageService.get(STORAGE_KEY, storyId)
}

async function remove(storyId) {
    // throw new Error('Nope')
    await storageService.remove(STORAGE_KEY, storyId)
}

async function save(story) {
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
