import React from 'react';
import { cleanup } from '@testing-library/react';
import { shallow } from 'enzyme';
import ComplaintForm from './../components/Complaint/ComplaintFormComponent/ComplaintFormComponent';

const defaultProps = {
    onComplaintFormSubmit: jest.fn(value => console.log(value)),
    userDetails: {
        name: "Taman Gupta",
        email: "dummy@email.com",
    },
    uiDepartment: ["ADMIN", "IT", "INFRA"]
};

afterEach(cleanup);

let wrapper;

beforeEach(() => {
    wrapper = shallow(<ComplaintForm {...defaultProps} />)
});

describe('Testing ComplaintForm Component', () => {
    test('Should Heading is Complaint Box', () => {
        expect(wrapper.find('h3').text()).toEqual('Complaint Box');
    })

    test('Should input name is disabled', () => {
        expect(wrapper.find('#YourName').is('[disabled]')).toBe(true);
    })

    test('Should email field is disabled', () => {
        expect(wrapper.find('#YourEmail').is('[disabled]')).toBe(true);
    })

    test('should select field is rendering same option as props', () => {
        expect(wrapper.find('select').text()).toBe('ADMINITINFRA')
    });

    test('should submit button is working', () => {
        const clicked = wrapper.find('button').simulate('click').length;
        expect(clicked).toEqual(1);
    });

    test('should OnComplaintFormSubmit fn is not invoked with empty field', () => {
        wrapper.find('button').simulate('click');
        expect(defaultProps.onComplaintFormSubmit).toHaveBeenCalledTimes(0);
    })

})