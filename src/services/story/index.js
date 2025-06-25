const { DEV, VITE_LOCAL } = import.meta.env

import { storyService as local } from './story.service.local'
import { storyService as remote } from './story.service.remote'
console.log(`VITE_LOCAL is: "${VITE_LOCAL}" (type: ${typeof VITE_LOCAL})`);

function getEmptyStory() {
    return {
        txt: '',
        imgUrl: '',
        by: {},
        comments: [],
        likedBy: [],
    }
}

function getDefaultFilter() {
    return {}
}

const service = VITE_LOCAL === 'true' ? local : remote
console.log("🚀 ~ VITE_LOCAL:", VITE_LOCAL)
export const storyService = { getEmptyStory, getDefaultFilter, ...service }

// Easy access to this service from the dev tools console
// when using script - dev / dev:local

if (DEV) window.storyService = storyService
