import React from 'react';
import { cleanup, fireEvent, render } from '@testing-library/react';
import { shallow } from 'enzyme';
import BuzzView from './../components/Buzz/BuzzViewComponent/BuzzViewComponent';
import { markLike } from './../actions';


const defaultProps = {
    email: "dummy@email.com",
    clickLike: jest.fn(() => console.log('like')),
    clickDislike: jest.fn(() => console.log('Dislike')),
    buzz: {
        createdOn: "2020-06-24T09:07:43.861Z",
        buzzImage: [],
        likes: ["dummy@email.com"],
        dislikes: [],
        createdBy: "dummy@email.com",
        category: "ACITVITY",
        buzzMessage: `Bringing unlocked me an striking ye perceive. Mr by wound hours oh happy. Me in resolution pianoforte continuing we. Most my no spot felt by no. He he in forfeited furniture sweetness he arranging. Me tedious so to behaved written account ferrars moments. Too objection for elsewhere her preferred allowance her. Marianne shutters mr steepest to me.
    Bringing unlocked me an striking ye perceive. Mr by wound hours oh happy. Me in resolution pianoforte continuing we. Most my no spot felt by no. He he in forfeited furniture sweetness he arranging. Me tedious so to behaved written account ferrars moments. Too objection for elsewhere her preferred allowance her. Marianne shutters mr steepest to me.
    Bringing unlocked me an striking ye perceive. Mr by wound hours oh happy. Me in resolution pianoforte continuing we. Most my no spot felt by no. He he in forfeited furniture sweetness he arranging. Me tedious so to behaved written account ferrars moments. Too objection for elsewhere her preferred allowance her. Marianne shutters mr steepest to me.
    Bringing unlocked me an striking ye perceive. Mr by wound hours oh happy. Me in resolution pianoforte continuing we. Most my no spot felt by no. He he in forfeited furniture sweetness he arranging. Me tedious so to behaved written account ferrars moments. Too objection for elsewhere her preferred allowance her. Marianne shutters mr steepest to me.
    Bringing unlocked me an striking ye perceive. Mr by wound hours oh happy. Me in resolution pianoforte continuing we. Most my no spot felt by no. He he in forfeited furniture sweetness he arranging. Me tedious so to behaved written account ferrars moments. Too objection for elsewhere her preferred allowance her. Marianne shutters mr steepest to me.
    Bringing unlocked me an striking ye perceive. Mr by wound hours oh happy. Me in resolution pianoforte continuing we. Most my no spot felt by no. He he in forfeited furniture sweetness he arranging. Me tedious so to behaved written account ferrars moments. Too objection for elsewhere her preferred allowance her. Marianne shutters mr steepest to me.
    Bringing unlocked me an striking ye perceive. Mr by wound hours oh happy. Me in resolution pianoforte continuing we. Most my no spot felt by no. He he in forfeited furniture sweetness he arranging. Me tedious so to behaved written account ferrars moments. Too objection for elsewhere her preferred allowance her. Marianne shutters mr steepest to me.`,
        buzzId: "zi_rZIz1T",
    }

}

afterEach(cleanup);

describe('<BuzzViewComponent />', () => {
    // it('testing a <BuzzView /> Snapshot', () => {
    //     const { asFragment } = render(<BuzzView {...defaultProps} />);
    //     expect(asFragment(<BuzzView {...defaultProps} />)).toMatchSnapshot();
    // });

    it('should Created By is same as Default Props createdBy', () => {
        const { getByTestId } = render(<BuzzView {...defaultProps} />);
        expect(getByTestId('createdBy').textContent).toBe(defaultProps.buzz.createdBy)
    });

    it('should like button is working', () => {
        const { getByTestId } = render(<BuzzView {...defaultProps} />);

        let fired = fireEvent.click(getByTestId('like'));
        expect(fired).toBeTruthy();
    })
    it('verify class on like', () => {
        const wrapper = render(<BuzzView {...defaultProps} />).getByTestId('like');
        expect(wrapper.className).toEqual('Like AfterLike');
    })

    it('should buzzMessage is changed if length greater then 500 words', () => {
        const wrapper = render(<BuzzView {...defaultProps} />).getByTestId('buzzMessage');
        expect(wrapper.textContent).toEqual(`@taman.gupta${defaultProps.buzz.buzzMessage.substring(0, 500)}...`);
    })

    it('should like count is 1', async () => {
        await markLike('zi_rZIz1T');
        const wrapper = shallow(<BuzzView {...defaultProps} />);
        expect(wrapper.find('#like-count').text()).toEqual("1");
    });

    it('should dislike count is 0 ', () => {
        const wrapper = shallow(<BuzzView {...defaultProps} />);
        expect(wrapper.find('#dislike-count').text()).toEqual("0");
    });

})

