import * as actionTypes from './../actions/actionTypes';

const initialState = {
    isLoading: true,
    successMessage: '',
    isError: false,
    errorMessage: '',
    complaints: [],
    complaint: {}
}

const complaintReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.COMPLAINT_POST_START:
            return {
                ...state,
                isLoading: true
            }
        case actionTypes.COMPLAINT_POST_SUCCESS:
            return {
                ...state,
                isLoading: false,
                successMessage: action.payload.message
            }
        case actionTypes.COMPLAINT_POST_FAILED:
            return {
                ...state,
                isLoading: false,
                errorMessage: action.payload.error
            }
        case actionTypes.USER_COMPLAINT_FETCH_START:
            return {
                ...state,
                isLoading: true
            }
        case actionTypes.USER_COMPLAINT_FETCH_SUCCESS:
            return {
                ...state,
                isLoading: false,
                complaints: [...action.payload.complaints]
            }
        case actionTypes.USER_COMPLAINT_FETCH_FAILED:
            return {
                ...state,
                isLoading: false,
                isError: true,
                errorMessage: action.payload.error
            }
        case actionTypes.COMPLAINT_FETCH_START:
            return {
                ...state,
                isLoading: true
            }
        case actionTypes.COMPLAINT_FETCH_SUCCESS:
            return {
                ...state,
                complaint: { ...action.payload.complaint },
                isLoading: false
            }
        case actionTypes.COMPLAINT_FETCH_FAILED:
            return {
                ...state,
                isLoading: false,
                isError: true,
                errorMessage: action.payload.error
            }
        case actionTypes.COMMENT_ADD_SUCCESS:
            return {
                ...state,
                complaint: action.payload.data
            }
        case actionTypes.COMMENT_ADD_FAILED:
            return {
                ...state,
                errorMessage: action.payload.error
            }
        case actionTypes.DELETE_COMPLAINT_SUCCESS:
            return {
                ...state
            }
        case actionTypes.DELETE_COMPLAINT_FAILED:
            return {
                ...state,
                isError: true
            }
        default:
            return state;
    }
}


export default complaintReducer;