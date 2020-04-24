import axios from '../../axios-api';
import {push} from 'react-router-redux';
import {
    CREATE_PHOTO_SUCCESS,
    FETCH_PHOTOS_SUCCESS,
    FETCH_USERS_PHOTOS_SUCCESS,
    REMOVE_PHOTO_SUCCESS
} from "./actionTypes";


export const fetchPhotosSuccess = photos => {
    return {type: FETCH_PHOTOS_SUCCESS, photos}
};

export const fetchPhotos = () => {
  return dispatch => {
      return axios.get('/photos').then(response => {
          dispatch(fetchPhotosSuccess(response.data));
      })
  }
};

export const fetchUserPhotosSuccess = userPhotos => {
  return {type: FETCH_USERS_PHOTOS_SUCCESS, userPhotos}
};

export const fetchUserPhotos = id => {
  return dispatch => {
      return axios.get(`/photos?user=${id}`).then(response => {
          dispatch(fetchUserPhotosSuccess(response.data));
      })
  }
};

export const removePhotoSuccess = () => {
  return {type: REMOVE_PHOTO_SUCCESS}
};

export const removePhoto = id => {
  return dispatch => {
      return axios.delete(`/photos/${id}`).then(() => {
          dispatch(removePhotoSuccess());
      })
  }
};

export const createPhotoSuccess = () => {
  return {type: CREATE_PHOTO_SUCCESS}
};

export const createPhoto = photoData => {
  return dispatch => {
      return axios.post('/photos', photoData).then(() => {
          dispatch(createPhotoSuccess());
          dispatch(push('/'));
      })
  }
};