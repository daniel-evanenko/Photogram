import { legacy_createStore as createStore, combineReducers } from 'redux';

import { storyReducer, StoryState } from './reducers/story.reducer';
import { userReducer, UserState } from './reducers/user.reducer';

export interface RootState {
    storyModule: StoryState;
    userModule: UserState;
}

const rootReducer = combineReducers({
    storyModule: storyReducer,
    userModule: userReducer,
});

const middleware = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ? (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__() : undefined;
export const store = createStore(rootReducer, middleware);