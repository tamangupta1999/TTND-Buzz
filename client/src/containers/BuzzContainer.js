import React from 'react';
import { connect } from 'react-redux';
import { buzzPost, fetchBuzz, markLike, markDislike, updateCurrentPage } from './../actions';
import BuzzFormComponent from '../components/Buzz/BuzzFormComponent/BuzzFormComponent';
import RecentBuzzComponent from './../components/Buzz/RecentBuzzComponent/RecentBuzzComponent';

const BuzzContainer = ({ buzzPost, email, isLoading, markDislike, markLike,
    fetchBuzz, buzzs, category, totalPage, currentPage, size, updateCurrentPage }) => {


    const buzzPostHandler = async (formData) => {
        await buzzPost(formData);
        if (!isLoading) {
            await fetchBuzz(1, size)
        }
    }

    return (
        <div style={{ width: '90%' }}>
            <BuzzFormComponent email={email} buzzPostHandler={buzzPostHandler}
                uiCategory={category} />
            <RecentBuzzComponent isLoading={isLoading}
                buzzs={buzzs}
                email={email}
                size={size} fetchBuzz={fetchBuzz}
                totalPage={totalPage} currentPage={currentPage}
                markDislike={markDislike}
                markLike={markLike} updateCurrentPage={updateCurrentPage} />
        </div>
    )
}

const mapStateToProps = state => {
    return {
        isLoading: state.buzz.isLoading,
        isError: state.buzz.isError,
        buzzs: state.buzz.buzzs,
        totalPage: state.buzz.totalPage,
        currentPage: state.buzz.currentPage,
        size: state.buzz.size,
        email: state.login.userDetails.email,
        category: state.login.uiConfig.category
    }
}

const mapDispatchToProps = dispatch => {
    return {
        buzzPost: (formData) => dispatch(buzzPost(formData)),
        fetchBuzz: (currentPage, size) => dispatch(fetchBuzz(currentPage, size)),
        markLike: (buzzId) => dispatch(markLike(buzzId)),
        markDislike: (buzzId) => dispatch(markDislike(buzzId)),
        updateCurrentPage: (page) => dispatch(updateCurrentPage(page)),
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(BuzzContainer);
