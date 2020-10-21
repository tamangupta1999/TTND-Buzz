import * as actionTypes from './../actions/actionTypes';
import {
    fetchingAllComplaintsSuccess, fetchingAllComplaintsFailed
    , updateCurrentPage
} from './../actions/adminComplaint';

describe('AdminComplaint action test', () => {
    it('should fetchComplaintsSuccess action is dispatching Same Object As Expected', () => {
        const expectedResult = {
            type: actionTypes.ALL_COMPLAINT_FETCH_SUCCESS,
            payload: {
                complaints: [],
                totalPages: 0
            }
        }
        expect(fetchingAllComplaintsSuccess([], 0)).toEqual(expectedResult);
    });

    it('should fetchComplaintsFailes action is dispatching Same Object As Expected', () => {
        const expectedResult = {
            type: actionTypes.ALL_COMPLAINT_FETCH_FAILED,
            payload: {
                error: 'Some Error Occured!'
            }
        }
        expect(fetchingAllComplaintsFailed('Some Error Occured!')).toEqual(expectedResult);
    });

    it('should updateCurrentPage action is dispatching same Object and Type As Expected', () => {
        const expectedResult = {
            type: actionTypes.UPDATE_CURRENT_PAGE,
            payload: {
                currentPage: 1
            }
        }
        expect(updateCurrentPage(1)).toEqual(expectedResult);

    })
})