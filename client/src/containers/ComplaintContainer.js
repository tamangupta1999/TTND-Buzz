import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { complaintPost, fetchUserComplaints } from './../actions';
import ComplaintFormComponent from './../components/Complaint/ComplaintFormComponent/ComplaintFormComponent';
import UserComplaintComponent from '../components/Complaint/UserComplaintComponent/UserComplaintComponent';

const ComplaintContainer = ({ complaintPost, fetchUserComplaints, complaints,
    isLoading, isError, errorMessage, userDetails, uiDepartment }) => {
    const onComplaintFormSubmit = (formData) => {
        complaintPost(formData);
    }
    useEffect(() => {
        fetchUserComplaints()
    }, [fetchUserComplaints])
    return (
        <div style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <ComplaintFormComponent uiDepartment={uiDepartment} userDetails={userDetails} onComplaintFormSubmit={onComplaintFormSubmit} />
            <UserComplaintComponent isError={isError}
                isLoading={isLoading} errorMessage={errorMessage} complaints={complaints} />
        </div>
    )
}

const mapStateToProps = state => {
    return {
        complaints: state.complaint.complaints,
        isLoading: state.complaint.isLoading,
        isError: state.complaint.isError,
        errorMessage: state.complaint.errorMessage,
        userDetails: state.login.userDetails,
        uiDepartment: state.login.uiConfig.department
    }
}

const mapDispatchToProps = dispatch => {
    return {
        complaintPost: (formData) => dispatch(complaintPost(formData)),
        fetchUserComplaints: () => dispatch(fetchUserComplaints())
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(ComplaintContainer);
