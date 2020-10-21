import axios from 'axios';
import * as actionTypes from './actionTypes';
import { toast } from 'react-toastify';


//COMPLAINT Post Handler
const complaintPostStart = () => {
    return {
        type: actionTypes.COMPLAINT_POST_START
    }
}

const complaintPostSuccess = (data) => {
    return {
        type: actionTypes.COMPLAINT_POST_SUCCESS,
        payload: {
            message: data
        }
    }
}

const complaintPostFailed = (error) => {
    return {
        type: actionTypes.COMPLAINT_POST_FAILED,
        payload: {
            error: error
        }
    }
}

export const complaintPost = (formdata) => {
    return dispatch => {
        dispatch(complaintPostStart());
        axios.post('/complaint/create', formdata)
            .then(response => {
                toast.success(response.data.message);
                let message = response.data.message;
                dispatch(complaintPostSuccess(message));
                dispatch(fetchUserComplaints());
            })
            .catch(error => {
                toast.error(error.message)
                dispatch(complaintPostFailed(error.message))
            })
    }
}

//Fetch User Complaints
const startFetchingUserComplaints = () => {
    return {
        type: actionTypes.USER_COMPLAINT_FETCH_START
    }
}

const fetchingUserComplaintsSuccess = (complaints) => {
    return {
        type: actionTypes.USER_COMPLAINT_FETCH_SUCCESS,
        payload: {
            complaints: complaints
        }
    }
}

const fetchingUserComplaintsFailed = (error) => {
    return {
        type: actionTypes.USER_COMPLAINT_FETCH_FAILED,
        payload: {
            error: error
        }
    }
}

export const fetchUserComplaints = () => {
    return dispatch => {
        dispatch(startFetchingUserComplaints());
        axios.get('/complaint/userComplaint')
            .then(response => {
                let allComplaints = response.data.data;
                dispatch(fetchingUserComplaintsSuccess(allComplaints));
            })
            .catch(error => {
                toast.error(error.message);
                dispatch(fetchingUserComplaintsFailed(error.message))
            })
    }
}

//Fetch Single Complaint
const startFetchingComplaint = () => {
    return {
        type: actionTypes.COMPLAINT_FETCH_START
    }
}

const fetchingComplaintSuccess = (complaint) => {
    return {
        type: actionTypes.COMPLAINT_FETCH_SUCCESS,
        payload: {
            complaint: complaint
        }
    }
}

const fetchingComplaintFailed = (error) => {
    return {
        type: actionTypes.COMPLAINT_FETCH_FAILED,
        payload: {
            error: error
        }
    }
}

export const fetchComplaint = (complaintId) => {
    return dispatch => {
        dispatch(startFetchingComplaint());
        axios.get(`/complaint/${complaintId}`).then(response => {
            let complaint = response.data.data;
            dispatch(fetchingComplaintSuccess(complaint));
        })
            .catch(error => {
                toast.error(error.message);
                dispatch(fetchingComplaintFailed(error.message))
            })
    }
}
//Delete Complaint Handler
const deleteComplaintSuccess = () => {
    return {
        type: actionTypes.DELETE_COMPLAINT_SUCCESS
    }
}
const deleteComplaintFailed = () => {
    return {
        type: actionTypes.DELETE_COMPLAINT_FAILED
    }
}

export const deleteComplaint = (complaintId) => {
    return dispatch => {
        axios.delete(`/complaint/${complaintId}`)
            .then(response => {
                toast.success(response.data.message)
                dispatch(deleteComplaintSuccess());
            })
            .catch(error => {
                toast.error(error.message);
                dispatch(deleteComplaintFailed())
            })
    }
}
//Add Comment On Complaint Handler
const commentAddSuccess = (data) => {
    return {
        type: actionTypes.COMMENT_ADD_SUCCESS,
        payload: {
            data: data
        }
    }
}
const commentAddFailed = (error) => {
    return {
        type: actionTypes.COMMENT_ADD_FAILED,
        payload: {
            error: error
        }
    }
}

export const addComment = (complaintId, data) => {
    return dispatch => {
        axios.patch(`http://localhost:3000/complaint/add/comment/${complaintId}`, {
            data: data
        }).then(response => {
            toast.success(response.data.message)
            let updatedData = response.data.data;
            dispatch(commentAddSuccess(updatedData))
        }).catch(error => {
            toast.error(error.message)
            commentAddFailed(error.message)
        })
    }
}