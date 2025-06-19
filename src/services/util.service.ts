export function makeId(length = 6) {
    var txt = ''
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'

    for (var i = 0; i < length; i++) {
        txt += possible.charAt(Math.floor(Math.random() * possible.length))
    }

    return txt
}

export function makeLorem(size = 100) {
    var words = ['The sky', 'above', 'the port', 'was', 'the color of television', 'tuned', 'to', 'a dead channel', '.', 'All', 'this happened', 'more or less', '.', 'I', 'had', 'the story', 'bit by bit', 'from various people', 'and', 'as generally', 'happens', 'in such cases', 'each time', 'it', 'was', 'a different story', '.', 'It', 'was', 'a pleasure', 'to', 'burn']
    var txt = ''
    while (size > 0) {
        size--
        txt += words[Math.floor(Math.random() * words.length)] + ' '
    }
    return txt
}

export function getRandomIntInclusive(min: number, max: number) {
    min = Math.ceil(min)
    max = Math.floor(max)
    return Math.floor(Math.random() * (max - min + 1)) + min //The maximum is inclusive and the minimum is inclusive 
}


export function randomPastTime() {
    const HOUR = 1000 * 60 * 60
    const DAY = 1000 * 60 * 60 * 24
    const WEEK = 1000 * 60 * 60 * 24 * 7

    const pastTime = getRandomIntInclusive(HOUR, WEEK)
    return Date.now() - pastTime
}

export function debounce(func: { apply: (arg0: any, arg1: any[]) => void }, timeout = 300) {
    let timer: number | undefined
    return (...args: any[]) => {
        clearTimeout(timer)
        timer = setTimeout(() => { func.apply(this, args) }, timeout)
    }
}

export function saveToStorage(key: string, value: any) {
    localStorage.setItem(key, JSON.stringify(value))
}

export function loadFromStorage(key: string) {
    const data = localStorage.getItem(key)
    return (data) ? JSON.parse(data) : undefined
}

export function formatTimeAgo(dateString: string, withAgoSuffix: boolean = true): string {
    if (!dateString) return '';

    const now = new Date();
    const past = new Date(dateString);

    if (isNaN(past.getTime())) {
        return 'Invalid date';
    }

    const SECONDS_IN_MINUTE = 60;
    const SECONDS_IN_HOUR = 3600;
    const SECONDS_IN_DAY = 86400;
    const SECONDS_IN_WEEK = 604800;

    const secondsPast = Math.floor((now.getTime() - past.getTime()) / 1000);

    if (secondsPast < 0) return 'in the future';
    if (secondsPast < 10) return withAgoSuffix ? 'just now' : 'now';

    let res: string;

    if (secondsPast < SECONDS_IN_MINUTE) {
        res = `${secondsPast}s`;
    } else if (secondsPast < SECONDS_IN_HOUR) {
        res = `${Math.floor(secondsPast / SECONDS_IN_MINUTE)}m`;
    } else if (secondsPast < SECONDS_IN_DAY) {
        res = `${Math.floor(secondsPast / SECONDS_IN_HOUR)}h`;
    } else if (secondsPast < SECONDS_IN_WEEK) {
        res = `${Math.floor(secondsPast / SECONDS_IN_DAY)}d`;
    } else {
        res = `${Math.floor(secondsPast / SECONDS_IN_WEEK)}w`;
    }

    return withAgoSuffix ? `${res} ago` : res;
}