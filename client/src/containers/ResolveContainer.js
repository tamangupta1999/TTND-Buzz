import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { updateStatus, fetchAllComplaints, updateCurrentPage } from './../actions';
import Spinner from './../components/UI/Spinner/Spinner';
import ResolveComponent from './../components/ResolveComponent/ResolveComponent';

export const ResolveContainer = ({ isError, isLoading, allComplaints,
    fetchAllComplaints, updateStatus, totalPage, size,
    currentPage, updateCurrentPage }) => {

    useEffect(() => {
        fetchAllComplaints(currentPage, size);
    }, [fetchAllComplaints, currentPage, size]);

    let resolveView = <Spinner />;
    if (!isLoading) {
        if (isError) {
            resolveView = <p>Something Went Wrong....</p>
        } else {
            resolveView = <ResolveComponent allComplaints={allComplaints}
                updateStatus={updateStatus} fetchAllComplaints={fetchAllComplaints}
                totalPage={totalPage}
                currentPage={currentPage} updateCurrentPage={updateCurrentPage} />
        }
    }
    return resolveView;
}

const mapStateToProps = (state) => ({
    isLoading: state.adminComplaint.isLoading,
    isError: state.adminComplaint.isError,
    allComplaints: state.adminComplaint.allComplaints,
    totalPage: state.adminComplaint.totalPage,
    currentPage: state.adminComplaint.currentPage,
    size: state.adminComplaint.size,
})

const mapDispatchToProps = dispatch => ({
    fetchAllComplaints: (pageNumber, size) => dispatch(fetchAllComplaints(pageNumber, size)),
    updateStatus: (complaintId, status) => dispatch(updateStatus(complaintId, status)),
    updateCurrentPage: (currentPage) => dispatch(updateCurrentPage(currentPage)),
})

export default connect(mapStateToProps, mapDispatchToProps)(ResolveContainer);

