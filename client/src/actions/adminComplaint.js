import axios from 'axios';
import * as actionTypes from './actionTypes';
import { toast } from 'react-toastify';


//Fetch User Complaints
const startFetchingAllComplaints = () => {
    return {
        type: actionTypes.ALL_COMPLAINT_FETCH_START
    }
}

export const fetchingAllComplaintsSuccess = (complaints, totalPages) => {
    return {
        type: actionTypes.ALL_COMPLAINT_FETCH_SUCCESS,
        payload: {
            complaints: complaints,
            totalPages: totalPages
        }
    }
}

export const fetchingAllComplaintsFailed = (error) => {
    return {
        type: actionTypes.ALL_COMPLAINT_FETCH_FAILED,
        payload: {
            error: error
        }
    }
}

export const fetchAllComplaints = (pageNumber, size) => {
    return dispatch => {
        dispatch(startFetchingAllComplaints());
        axios.get(`/complaint/all/${pageNumber}/${size}`)
            .then(response => {
                let allComplaints = response.data.data;
                let totalPages = response.data.pages;
                dispatch(fetchingAllComplaintsSuccess(allComplaints, totalPages));
            })
            .catch(error => {
                dispatch(fetchingAllComplaintsFailed(error.message))
            })
    }
}

// Update Some Fields Of Complaints
const updateComplaintSuccess = () => {
    return {
        type: actionTypes.COMPLAINT_UPDATE_SUCCESS
    }
}
const updateComplaintFailed = (error) => {
    return {
        type: actionTypes.COMPLAINT_UPDATE_FAILED,
        payload: {
            error: error
        }
    }
}

export const updateComplaint = (complaintId, data) => {
    return dispatch => {
        axios.patch(`/complaint/update/${complaintId}`, {
            data: data
        }).then(response => {
            toast.success(response.data.message)
            dispatch(updateComplaintSuccess())
        }).catch(error => {
            toast.error(error.message)
            updateComplaintFailed(error.message)
        })
    }
}

//Update Status On Complaint Handler
const updateStatusOnComplaintSuccess = (data) => {
    return {
        type: actionTypes.UPDATE_STATUS_COMPLAINT_SUCCESS,
        payload: {
            complaint: data
        }
    }
}
const updateStatusOnComplaintFailed = () => {
    return {
        type: actionTypes.UPDATE_STATUS_COMPLAINT_FAILED
    }
}

export const updateStatus = (complaintId, status) => {
    return dispatch => {
        axios.patch(`/complaint/update/status/${complaintId}`, {
            data: {
                status: status
            }
        }).then(response => {
            toast.success(response.data.message);
            let updatedStatusComplaint = response.data.data;
            dispatch(updateStatusOnComplaintSuccess(updatedStatusComplaint))
        }).catch(error => {
            toast.error(error.message);
            dispatch(updateStatusOnComplaintFailed(error.message))
        })
    }
}

//Update Current Page
export const updateCurrentPage = (currentPage) => {
    return {
        type: actionTypes.UPDATE_CURRENT_PAGE,
        payload: {
            currentPage: currentPage
        }
    }
}
