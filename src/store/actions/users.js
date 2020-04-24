import {push} from 'react-router-redux';
import axios from '../../axios-api';
import {NotificationManager} from 'react-notifications';
import {
    LOGIN_USER_SUCCESS,
    LOGOUT_USER,
    REGISTER_USER_FAILURE,
    REGISTER_USER_SUCCESS
} from "./actionTypes";

export const registerUserSuccess = () => {
    return {type: REGISTER_USER_SUCCESS};
};

export const registerUserFailure = error => {
    return {type: REGISTER_USER_FAILURE, error}
};

export const registerUser = userData => {
    return dispatch => {
        return axios.post('auth/register/', userData).then(
            response => {
                dispatch(registerUserSuccess());
                // dispatch(push('/'));
                NotificationManager.success('Success', 'Registration successful');
            },
            error => {
                dispatch(registerUserFailure(error.response.data))
            }
        );
    };
};

const loginUserSuccess = (user, token) => {
    return {type: LOGIN_USER_SUCCESS, user, token};
};

const loginUserFailure = error => {
    return {type: REGISTER_USER_FAILURE, error};
};

export const loginUser = userData => {
    return dispatch => {
        return axios.post('/users/sessions', userData).then(
            response => {
                dispatch(loginUserSuccess(response.data.user, response.data.token));
                dispatch(push('/'));
                NotificationManager.success('Success', 'Login successful');
            },
            error => {
                const errorObj = error.response ? error.response.data : {error: 'No internet connection'};
                dispatch(loginUserFailure(errorObj));
            }
        )
    }
};

export const logoutUser = () => {
  return (dispatch, getState) => {
      const token = getState().users.user.token;
      const headers = {'Token': token};

      return axios.delete('/users/sessions', {headers}).then(
          response => {
              dispatch({type: LOGOUT_USER});
              dispatch(push('/'));
              NotificationManager.success('Success', 'Logout successful');
          },
          error => {
              NotificationManager.error('Error', 'Could not logout');
          }
      )
  }
};


export const logoutExpiredUser = () => {
  return dispatch => {
      dispatch({type: LOGOUT_USER});
      dispatch(push('/login'));
      NotificationManager.error('Error', 'Your session has expired, please login again');

  }
};

export const facebookLogin = data => {
    return dispatch => {
        axios.post('/users/facebookLogin', data).then(
            response => {
                dispatch(loginUserSuccess(response.data.user, response.data.token));
                dispatch(push('/'));
                NotificationManager.success('Logged in with Facebook!', 'Success');
            },
            error => {
                dispatch(loginUserFailure(error.response.data));
            }
        )
    };
};

