import axios from 'axios';
import * as actionTypes from './actionTypes';
import { toast } from 'react-toastify';


//login process
const loginStart = () => {
    return {
        type: actionTypes.START_LOGIN_PROCESS
    }

}
const autheticationSuccess = (response) => {
    return {
        type: actionTypes.LOGIN_SUCCESS,
        payload: response
    }
}
const autheticationFailed = (error) => {
    return {
        type: actionTypes.LOGIN_FAILED,
        payload: error
    }
}

export const autheticateUser = () => {
    return dispatch => {
        dispatch(loginStart());
        axios.get('/currentUser')
            .then(response => {
                if (response.data.error) {
                    toast.error(response.data.message)
                    dispatch(autheticationFailed(response.data))
                }
                else {
                    dispatch(autheticationSuccess(response.data))
                }

            })
            .catch(error => dispatch(autheticationFailed(error)))

    }
}

//Logout Process
const logoutSuccess = (message) => {
    console.log(message)
    return {
        type: actionTypes.LOGOUT_SUCCESS,
        payload: {
            message: message
        }
    }
}
const logoutFailed = (error) => {
    return {
        type: actionTypes.LOGOUT_FAILED,
        payload: {
            error: error
        }
    }
}

export const logout = () => {
    return dispatch => {
        axios({
            method: 'post',
            url: '/logout',
        }).then(response => {
            toast.success(response.data.message)
            dispatch(logoutSuccess(response.data.message))
        })
            .catch(error => {
                toast.error('Some Error Occured');
                dispatch(logoutFailed(error.message))
            })
    }
}

// Ui Config

const uiConfigFetchSuccess = (data) => {
    return {
        type: actionTypes.UI_CONFIG_FETCH_SUCCESS,
        payload: {
            data: data
        }
    }
}

const uiConfigFetchFailed = (error) => {
    return {
        type: actionTypes.UI_CONFIG_FETCH_FAILED,
        payload: {
            error: error
        }
    }
}

export const fetchUiConfig = () => {
    return dispatch => {
        axios.get('/uiconfig')
            .then(response => dispatch(uiConfigFetchSuccess(response.data.data)))
            .catch(error => dispatch(uiConfigFetchFailed(error.message)))
    }
}