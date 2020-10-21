import React from 'react';
import configureStore from 'redux-mock-store'
import { cleanup } from '@testing-library/react';
import { mount } from 'enzyme';
import thunk from 'redux-thunk';
import rootReducer from './../reducers';
// import { fetchAllComplaints } from './../actions';
// import { initialState } from './../reducers/adminComplaint';
// import ResolveContainer from './../containers/ResolveContainer';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);


afterEach(cleanup);

it('some', () => {
    // expect(rootReducer({}, {})).toEqual({})
})

// it('checks fetch Complaint', () => {
//     const store = mockStore(initialState);
//     return store.dispatch(fetchAllComplaints())
//         .then(() => {
//             const actions = store.getActions();
//             console.log(actions);
//         })
// })

// You would import the action from your codebase in a real scenario
// function success() {
//     return {
//         type: 'FETCH_DATA_SUCCESS'
//     }
// }

// function fetchData() {
//     return dispatch => {
//         return fetch('https://jsonplaceholder.typicode.com/todos') // Some async action with promise
//             .then(() => dispatch(success()))
//     };
// }

// it('should execute fetch data', () => {
//     const store = mockStore({})

//     // Return the promise
//     return store.dispatch(fetchData())
//         .then(() => {
//             const actions = store.getActions()
//             expect(actions[0]).toEqual(success())
//         })
// })