
/** A basic user reference */
export interface User {
    _id: string;
    fullname: string;
    imgUrl: string;
}

/** Geolocation information */
export interface Location {
    lat: number;
    lng: number;
    name: string;
}

/** A comment on a story */
export interface Comment {
    id: string;
    by: User;
    txt: string;
    /** Who liked this comment (optional) */
    likedBy?: User[];
}

/** The full Story type */
export interface Story {
    _id: string;
    createdAt: string;     // ISO date string
    txt: string;
    imgUrl: string;
    by: User;
    loc: Location;
    comments: Comment[];
    likedBy: User[];
    tags: string[];
}
