import React, { useEffect } from 'react'
import { connect } from 'react-redux';
import ProfileView from './../components/Profile/ProfileComponent';
import { fetchUiConfig, autheticateUser } from './../actions';
import Spinner from './../components/UI/Spinner/Spinner';
import axios from 'axios';
import { toast } from 'react-toastify';

const UserContainer = ({ isError, isLoading, department, userDetails, fetchUiConfig, autheticateUser, history }) => {

    useEffect(() => {
        autheticateUser()
        fetchUiConfig()
    }, [fetchUiConfig, autheticateUser]);

    const onUpdateProfileHandler = (data) => {
        axios.patch('/user/update', {
            data: data
        }).then(response => {
            history.push('/buzz');
        }).catch(error => {
            toast.error(error.message)
        })
    }

    let view = <Spinner />;

    if (!isLoading) {
        if (!isError) {
            view = <ProfileView onUpdateProfileHandler={onUpdateProfileHandler} userDetails={userDetails} department={department} />
        }
    }
    return view;

}

const mapStateToProps = (state) => ({
    userDetails: state.login.userDetails,
    isLoading: state.login.isLoading,
    isError: state.login.isError,
    department: state.login.uiConfig.department
})

const mapDispatchToProps = {
    fetchUiConfig,
    autheticateUser
}

export default connect(mapStateToProps, mapDispatchToProps)(UserContainer)
