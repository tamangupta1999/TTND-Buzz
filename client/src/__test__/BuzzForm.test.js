import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { cleanup, fireEvent, render } from '@testing-library/react';

import BuzzFormComponent from '../components/Buzz/BuzzFormComponent/BuzzFormComponent';


const defaultProps = {
    email: 'dummy@email.com',
    buzzPostHandler: jest.fn(() => console.log('value')),
    uiCategory: ['ACTIVITY', 'LOST_AND_FOUND']
}

afterEach(cleanup);

describe('Rendering <BuzzFormComponent />', () => {
    // it('should Component render ', () => {
    //     const wrapper = render(<BuzzFormComponent {...defaultProps} />);
    //     expect(wrapper).toMatchSnapshot();
    // });

    it('verifying Category with default props', () => {
        const wrapper = render(<BuzzFormComponent {...defaultProps} />).getByTestId('category');
        expect(wrapper.querySelectorAll('option').length).toEqual(3);
    });

    it('check button enable', () => {
        const { getByTestId } = render(<BuzzFormComponent {...defaultProps} />);
        expect(getByTestId('submit')).not.toBeDisabled();
    });

    it('should submit Button is working', () => {
        const { getByTestId } = render(<BuzzFormComponent {...defaultProps} />);
        let val = fireEvent.click(getByTestId('submit'))
        expect(val).toBe(true)
    });
})