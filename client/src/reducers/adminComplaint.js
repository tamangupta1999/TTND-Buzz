import * as actionTypes from './../actions/actionTypes';

export const initialState = {
    isLoading: false,
    successMessage: '',
    isError: false,
    errorMessage: '',
    allComplaints: [],
    totalPage: 0,
    currentPage: 1,
    size: 10
}
const updateComplaints = (oldComplaints, updatedComplaint) => {
    return oldComplaints.map(complaint => {
        if (complaint.complaintId === updatedComplaint.complaintId) {
            return updatedComplaint;
        }
        return complaint;
    })
}

const adminComplaintReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.ALL_COMPLAINT_FETCH_START:
            return {
                ...state,
                isLoading: true
            }
        case actionTypes.ALL_COMPLAINT_FETCH_SUCCESS:
            return {
                ...state,
                isLoading: false,
                allComplaints: action.payload.complaints,
                totalPage: action.payload.totalPages
            }
        case actionTypes.ALL_COMPLAINT_FETCH_FAILED:
            return {
                ...state,
                isLoading: false,
                isError: true,
                errorMessage: action.payload.error
            }
        case actionTypes.COMPLAINT_UPDATE_SUCCESS:
            return {
                ...state
            }
        case actionTypes.COMPLAINT_UPDATE_FAILED:
            return {
                ...state,
                isError: true,
                errorMessage: action.payload.error
            }
        case actionTypes.UPDATE_STATUS_COMPLAINT_SUCCESS:
            return {
                ...state,
                allComplaints: updateComplaints(state.allComplaints, action.payload.complaint)
            }
        case actionTypes.UPDATE_STATUS_COMPLAINT_FAILED:
            return {
                ...state
            }
        case actionTypes.UPDATE_CURRENT_PAGE:
            return {
                ...state,
                currentPage: action.payload.currentPage
            }
        default:
            return state;
    }
}

export default adminComplaintReducer;
