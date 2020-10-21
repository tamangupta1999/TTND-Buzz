import axios from 'axios';
import * as actionTypes from './actionTypes';
import { toast } from 'react-toastify';

//Buzz Post Handler
const buzzPostStart = () => {
    return {
        type: actionTypes.BUZZ_POST_START
    }
}

const buzzPostSuccess = (message) => {
    return {
        type: actionTypes.BUZZ_POST_SUCCESS,
        payload: {
            message: message
        }
    }
}

const buzzPostFailed = (error) => {
    return {
        type: actionTypes.BUZZ_POST_FAILED,
        payload: {
            error: error
        }
    }
}

export const buzzPost = (formdata) => {
    return dispatch => {
        dispatch(buzzPostStart());
        axios.post('/buzz/create', formdata)
            .then(response => {
                toast.success(response.data.message);
                let message = response.data.message;
                dispatch(buzzPostSuccess(message));
            })
            .catch(error => {
                toast.error(error.message)
                dispatch(buzzPostFailed(error.message))
            })
    }
}

//Get All Buzz 
const startFetchingBuzz = () => {
    return {
        type: actionTypes.BUZZ_FETCH_START
    }
}

const fetchingBuzzSuccess = (buzzs, totalPage) => {
    return {
        type: actionTypes.BUZZ_FETCH_SUCCESS,
        payload: {
            totalPage: totalPage,
            buzzs: buzzs
        }
    }
}

const fetchingBuzzFailed = (error) => {
    return {
        type: actionTypes.BUZZ_FETCH_FAILED,
        payload: {
            error: error
        }
    }
}

export const fetchBuzz = (pageNumber, size) => {
    return dispatch => {
        dispatch(startFetchingBuzz());
        axios.get(`/buzz/all/${pageNumber}/${size}`)
            .then(response => {
                let allBuzz = response.data.data;
                let totalPage = response.data.pages;
                dispatch(fetchingBuzzSuccess(allBuzz, totalPage));
            })
            .catch(error => {
                toast.error(error.message);
                dispatch(fetchingBuzzFailed(error.message))
            })
    }
}

// Fetch My Buzz 
const startFetchingMyBuzz = () => {
    return {
        type: actionTypes.MY_BUZZ_FETCH_START
    }
}

const fetchingMyBuzzSuccess = (buzzs) => {
    return {
        type: actionTypes.MY_BUZZ_FETCH_SUCCESS,
        payload: {
            buzzs: buzzs
        }
    }
}

const fetchingMyBuzzFailed = (error) => {
    return {
        type: actionTypes.MY_BUZZ_FETCH_FAILED,
        payload: {
            error: error
        }
    }
}

export const fetchMyBuzz = () => {
    return dispatch => {
        dispatch(startFetchingMyBuzz());
        axios.get('/buzz/myBuzz').then(response => {
            let myBuzz = response.data.data;
            dispatch(fetchingMyBuzzSuccess(myBuzz));
        })
            .catch(error => {
                toast.error(error.message);
                dispatch(fetchingMyBuzzFailed(error.message))
            })
    }
}

// Delete Buzz By Id
const deleteBuzzStart = () => {
    return {
        type: actionTypes.DELETE_BUZZ_START
    }
}

const deleteBuzzSuccess = (buzzId) => {
    return {
        type: actionTypes.DELETE_BUZZ_SUCCESS,
        payload: {
            buzzId: buzzId
        }
    }
}

const deleteBuzzFailed = (error) => {
    return {
        type: actionTypes.DELETE_BUZZ_FAILED,
        payload: {
            error: error
        }
    }
}

export const deleteBuzz = (buzzId) => {
    return dispatch => {
        dispatch(deleteBuzzStart())
        axios.delete(`buzz/${buzzId}`).then(response => {
            toast.success(response.data.message);
            dispatch(deleteBuzzSuccess(buzzId))
        }).catch(error => {
            toast.error(error.message)
            dispatch(deleteBuzzFailed(error.message))
        })
    }
}

// Update Buzz Data 
const updateBuzzStart = () => {
    return {
        type: actionTypes.BUZZ_UPDATE_START
    }
}
const updateBuzzSuccess = (buzz) => {
    return {
        type: actionTypes.BUZZ_UPDATE_SUCCESS,
        payload: {
            buzz: buzz
        }
    }
}

const updateBuzzFailed = (error) => {
    return {
        type: actionTypes.BUZZ_UPDATE_FAILED,
        payload: {
            error: error
        }
    }
}

export const updateBuzz = (buzzId, data) => {
    return dispatch => {
        dispatch(updateBuzzStart())
        axios.patch(`buzz/update/${buzzId}`, data)
            .then(response => {
                toast.success(response.data.message)
                dispatch(updateBuzzSuccess(response.data.data))
            }).catch(error => {
                toast.error(error.message)
                dispatch(updateBuzzFailed(error.message))
            })
    }
}

//Mark Like 
const markLikeSuccess = (buzz) => {
    return {
        type: actionTypes.LIKE_MARK_SUCCESS,
        payload: {
            buzz: buzz
        }
    }
}

const markLikeFailed = (error) => {
    return {
        type: actionTypes.LIKE_MARK_FAILED,
        payload: {
            error: error
        }
    }
}

export const markLike = (buzzId) => {
    return dispatch => {
        axios.post(`buzz/like/${buzzId}`).then(response => {
            dispatch(markLikeSuccess(response.data.data))
        })
            .catch(error => {
                toast.error(error.message)
                dispatch(markLikeFailed(error.message))
            })
    }
}

//Mark Dislike 
const markDislikeSuccess = (buzz) => {
    return {
        type: actionTypes.DISLIKE_MARK_SUCCESS,
        payload: {
            buzz: buzz
        }
    }
}

const marklDisikeFailed = (error) => {
    return {
        type: actionTypes.DISLIKE_MARK_FAILED,
        payload: {
            error: error
        }
    }
}

export const markDislike = (buzzId) => {
    return dispatch => {
        axios.post(`buzz/dislike/${buzzId}`).then(response => dispatch(markDislikeSuccess(response.data.data)))
            .catch(error => dispatch(marklDisikeFailed(error.message)))
    }
}
