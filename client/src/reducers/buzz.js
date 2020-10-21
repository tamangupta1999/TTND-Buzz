import * as actionTypes from './../actions/actionTypes';

const initialState = {
    isLoading: false,
    successMessage: '',
    isError: false,
    errorMessage: '',
    totalPage: null,
    currentPage: 1,
    size: 10,
    buzzs: [],
    myBuzz: []
}
const updateBuzz = (buzzs, likedBuzz) => {
    return buzzs.map(buzz => {
        if (buzz.buzzId === likedBuzz.buzzId) {
            return likedBuzz;
        }
        return buzz;
    })
}

const buzzReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.BUZZ_POST_START:
            return {
                ...state,
                isLoading: true
            }
        case actionTypes.BUZZ_POST_SUCCESS:
            return {
                ...state,
                isLoading: false,
                successMessage: action.payload.message
            }
        case actionTypes.BUZZ_POST_FAILED:
            return {
                ...state,
                isLoading: false,
                isError: true,
                errorMessage: action.payload.error
            }
        case actionTypes.BUZZ_FETCH_START:
            return {
                ...state,
                isLoading: true
            }
        case actionTypes.BUZZ_FETCH_SUCCESS:
            return {
                ...state,
                isLoading: false,
                totalPage: action.payload.totalPage,
                buzzs: [...action.payload.buzzs]
            }
        case actionTypes.BUZZ_FETCH_FAILED:
            return {
                ...state,
                isLoading: false,
                isError: true,
                errorMessage: action.payload.error
            }
        case actionTypes.UPDATE_CURRENT_PAGE:
            return {
                ...state,
                currentPage: action.payload.currentPage
            }
        case actionTypes.MY_BUZZ_FETCH_START:
            return {
                ...state,
                isLoading: true
            }
        case actionTypes.MY_BUZZ_FETCH_SUCCESS:
            return {
                ...state,
                isLoading: false,
                myBuzz: [...action.payload.buzzs]
            }
        case actionTypes.MY_BUZZ_FETCH_FAILED:
            return {
                ...state,
                isLoading: false,
                isError: true,
                errorMessage: action.payload.error
            }
        case actionTypes.BUZZ_UPDATE_START:
            return {
                ...state,
                isLoading: true
            }
        case actionTypes.BUZZ_UPDATE_SUCCESS:
            return {
                ...state,
                isLoading: false,
                myBuzz: updateBuzz(state.myBuzz, action.payload.buzz)
            }
        case actionTypes.BUZZ_UPDATE_FAILED:
            return {
                ...state,
                isError: true,
                isLoading: false,
                errorMessage: action.payload.error
            }
        case actionTypes.DELETE_BUZZ_START:
            return {
                ...state,
                isLoading: true
            }
        case actionTypes.DELETE_BUZZ_SUCCESS:
            return {
                ...state,
                isLoading: false,
                myBuzz: state.myBuzz.filter(buzz => buzz.buzzId !== action.payload.buzzId)
            }
        case actionTypes.DELETE_BUZZ_FAILED:
            return {
                isLoading: false,
                isError: true,
                errorMessage: action.payload.error
            }
        case actionTypes.LIKE_MARK_SUCCESS:
            return {
                ...state,
                buzzs: updateBuzz(state.buzzs, action.payload.buzz),
                myBuzz: updateBuzz(state.myBuzz, action.payload.buzz)
            }
        case actionTypes.LIKE_MARK_FAILED:
            return {
                ...state
            }
        case actionTypes.DISLIKE_MARK_SUCCESS:
            return {
                ...state,
                buzzs: updateBuzz(state.buzzs, action.payload.buzz),
                myBuzz: updateBuzz(state.myBuzz, action.payload.buzz)
            }
        case actionTypes.DISLIKE_MARK_FAILED:
            return {
                ...state
            }
        default:
            return state;
    }
}

export default buzzReducer;
