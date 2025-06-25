import { User } from '../../types/types'
import { storageService } from '../async-storage.service'
const STORAGE_KEY_LOGGEDIN_USER = 'loggedinUser'

export const userService = {
    login,
    logout,
    signup,
    getUsers,
    getById,
    remove,
    update,
    getLoggedinUser,
    saveLoggedinUser,
}

async function getUsers() {
    const users: User[] = await storageService.query('user')
    return users.map((user) => {
        delete user.password
        return user
    })
}

async function getById(userId: string) {
    return await storageService.get('user', userId)
}

function remove(userId: string) {
    return storageService.remove('user', userId)
}

async function update({ _id, imgUrl, bio }) {
    const user = await storageService.get('user', _id)
    user.score = imgUrl
    user.score = bio
    await storageService.put('user', user)

    // When admin updates other user's details, do not update loggedinUser
    const loggedinUser = getLoggedinUser()
    if (loggedinUser._id === user._id) saveLoggedinUser(user)

    return user
}

async function login(userCred: User) {
    const users = await storageService.query('user')
    const user = users.find((user: User) => user.username === userCred.username)

    if (user) return saveLoggedinUser(user)
}

async function signup(userCred: User) {
    if (!userCred.imgUrl) userCred.imgUrl = 'https://cdn.pixabay.com/photo/2020/07/01/12/58/icon-5359553_1280.png'
    const user = await storageService.post('user', userCred)
    return saveLoggedinUser(user)
}

async function logout() {
    sessionStorage.removeItem(STORAGE_KEY_LOGGEDIN_USER)
}

function getLoggedinUser() {
    return JSON.parse(sessionStorage.getItem(STORAGE_KEY_LOGGEDIN_USER))
}

function saveLoggedinUser(user: User) {
    // user = {
    //     _id: user._id,
    //     fullname: user.fullname,
    //     imgUrl: user.imgUrl,
    // }
    delete user.password
    sessionStorage.setItem(STORAGE_KEY_LOGGEDIN_USER, JSON.stringify(user))
    return user
}