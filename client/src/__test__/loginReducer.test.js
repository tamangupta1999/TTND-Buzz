import * as actionTypes from './../actions/actionTypes';

import loginReducer, { initialState } from './../reducers/login';


describe('Testing Login Reducer', () => {
    it('should initial state is same', () => {
        expect(loginReducer(initialState, {})).toEqual(initialState);
    });

    it('should state values same when uiConfigFetch  Dispatched', () => {
        let action = {
            type: actionTypes.UI_CONFIG_FETCH_SUCCESS,
            payload: {
                data: {
                    _id: 1,
                    department: ['IT'],
                    category: ['ACTIVITY'],
                    userRole: ['ADMIN']
                }
            }
        }
        expect(loginReducer(initialState, action)).toEqual({
            ...initialState, isLoading: false, uiConfig: {
                id: 1,
                department: ['IT'],
                category: ['ACTIVITY'],
                userRole: ['ADMIN']
            }
        });
    });

    it('should state is changed after logoutfailed dispatch', () => {
        let action = {
            type: actionTypes.LOGOUT_FAILED,
            payload: {
                error: 'Internal Server Error !'
            }
        }
        expect(loginReducer(initialState, action)).toEqual({ ...initialState, error: { isError: true, errorMessage: 'Internal Server Error !' } })
    });

    it('should state is changed after loginfailed dispatch', () => {
        let action = {
            type: actionTypes.LOGIN_FAILED,
            payload: {
                message: 'Unauthorized !'
            }
        }
        expect(loginReducer(initialState, action)).toEqual({ ...initialState, isLoading: false, error: { isError: true, errorMessage: 'Unauthorized !' } })
    })
})