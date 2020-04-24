import {applyMiddleware, combineReducers, compose, createStore} from "redux";
import {routerMiddleware, routerReducer} from "react-router-redux";
import thunkMiddleware from "redux-thunk";
import createHistory from "history/createBrowserHistory";

import {saveState, loadState} from "./localStorage";
import usersReducer from "./reducers/users";
import photosReducer from "./reducers/photos";

const rootReducer = combineReducers({
    users: usersReducer,
    photos: photosReducer,
    routing: routerReducer
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const history = createHistory();

const middleware = [
    thunkMiddleware,
    routerMiddleware(history),
];

const enhancers = composeEnhancers(applyMiddleware(...middleware));



const persistedState = loadState();

const store = createStore(rootReducer, persistedState, enhancers);

store.subscribe(() => {
    saveState({
        users: store.getState().users
    })
});

export default store;
