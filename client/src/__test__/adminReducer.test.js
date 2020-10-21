import * as actionTypes from './../actions/actionTypes';

import adminReducer, { initialState } from './../reducers/adminComplaint';


describe('Testing AdminComplaint Reducer', () => {
    it('should initial state is same', () => {
        expect(adminReducer(initialState, {})).toEqual(initialState);
    })

    it('should loading in state is true when complaint fetch start', () => {
        let action = {
            type: actionTypes.ALL_COMPLAINT_FETCH_START
        }
        expect(adminReducer(initialState, action)).toEqual({ ...initialState, isLoading: true })
    })
    it('should error is true when complaint fetch failed ', () => {
        let action = {
            type: actionTypes.ALL_COMPLAINT_FETCH_FAILED,
            payload: {
                error: 'Some Database Error!'
            }
        };
        expect(adminReducer(initialState, action)).toEqual({ ...initialState, isError: true, errorMessage: 'Some Database Error!' });
    });
    it('should allComplaints is changes when allComplaintFetchSuccess dispatch', () => {
        let action = {
            type: actionTypes.ALL_COMPLAINT_FETCH_SUCCESS,
            payload: {
                complaints: [{ id: '1', concern: 'some random', status: 'open' }],
                totalPages: 1
            }
        };
        expect(adminReducer(initialState, action)).toEqual({ ...initialState, allComplaints: [{ id: '1', concern: 'some random', status: 'open' }], totalPage: 1 })
    })
})
