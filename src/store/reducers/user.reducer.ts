import { User } from "../../types/types";

// --- Action Types ---
export const SET_USER = 'SET_USER';
export const SET_USERS = 'SET_USERS';

// --- State Interface ---
export interface UserState {
    loggedInUser: User | null;
    users: User[];
}

// --- Initial State ---
const initialState: UserState = {
    loggedInUser: null,
    users: []
};

// --- Action Interfaces ---
interface SetLoggedInUserAction { type: typeof SET_USER; user: User | null }
interface SetUsersAction { type: typeof SET_USERS; users: User[] }

// --- Action Union Type ---
type UserAction = SetLoggedInUserAction | SetUsersAction;

// --- Reducer Function ---
export function userReducer(state: UserState = initialState, action: UserAction): UserState {
    switch (action.type) {
        case SET_USER:
            return { ...state, loggedInUser: action.user };

        case SET_USERS:
            return { ...state, users: action.users };

        default:
            return state;
    }
}