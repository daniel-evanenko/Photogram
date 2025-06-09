import { httpService } from '../http.service'

export const storyService = {
    query,
    getById,
    save,
    remove,
}

async function query(filterBy = {}) {
    return httpService.get(`story`, filterBy)
}

function getById(storyId) {
    return httpService.get(`story/${storyId}`)
}

async function remove(storyId) {
    return httpService.delete(`story/${storyId}`)
}
async function save(story) {
    var savedstory
    if (story._id) {
        savedstory = await httpService.put(`story/${story._id}`, story)
    } else {
        savedstory = await httpService.post('story', story)
    }
    return savedstory
}
