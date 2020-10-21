import * as actionTypes from './../actions/actionTypes';

export const initialState = {
    error: {
        isError: false,
        errorMessage: ''
    },
    isLoading: true,
    successMessage: '',
    userDetails: {
        name: '',
        email: '',
        profileUrl: '',
        userRole: '',
        department: ''
    },
    uiConfig: {
        id: '',
        department: [],
        category: [],
        userRole: []
    }
}

const loginReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.UI_CONFIG_FETCH_SUCCESS:
            return {
                ...state,
                isLoading: false,
                uiConfig: {
                    id: action.payload.data._id,
                    department: [...action.payload.data.department],
                    category: [...action.payload.data.category],
                    userRole: [...action.payload.data.userRole]
                }
            }
        case actionTypes.UI_CONFIG_FETCH_FAILED:
            return {
                ...state,
                error: {
                    isError: true,
                    errorMessage: action.payload.error
                }
            }
        case actionTypes.START_LOGIN_PROCESS:
            return {
                ...state,
                isLoading: true
            }
        case actionTypes.LOGIN_SUCCESS:
            return {
                ...state,
                successMessage: action.payload.message,
                userDetails: {
                    name: action.payload.data.name,
                    email: action.payload.data.email,
                    userRole: action.payload.data.userRole,
                    profileUrl: action.payload.data.profileUrl,
                    department: action.payload.data.department
                },
                isLoading: false
            }
        case actionTypes.LOGIN_FAILED:
            return {
                ...state,
                isLoading: false,
                error: {
                    isError: true,
                    errorMessage: action.payload.message
                }
            }
        case actionTypes.LOGOUT_SUCCESS:
            return {
                ...state,
                successMessage: action.payload.message,
                userDetails: {
                    name: '',
                    email: '',
                    token: '',
                    userId: '',
                    profileUrl: '',
                    userRole: ''
                }
            };

        case actionTypes.LOGOUT_FAILED:
            return {
                ...state,
                error: {
                    isError: true,
                    errorMessage: action.payload.error
                }
            }
        default:
            return state;
    }
}

export default loginReducer;