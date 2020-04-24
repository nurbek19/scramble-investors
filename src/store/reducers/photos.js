import {FETCH_PHOTOS_SUCCESS, FETCH_USERS_PHOTOS_SUCCESS} from "../actions/actionTypes";

const initialState = {
    photos: [],
    userPhotos: []
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_PHOTOS_SUCCESS:
            return {...state, photos: action.photos};
        case FETCH_USERS_PHOTOS_SUCCESS:
            return {...state, userPhotos: action.userPhotos};
        default:
            return state;
    }
};

export default reducer;