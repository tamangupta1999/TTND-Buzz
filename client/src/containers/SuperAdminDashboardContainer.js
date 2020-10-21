import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { autheticateUser, fetchUiConfig } from './../actions';
import Spinner from './../components/UI/Spinner/Spinner';
import SuperAdminDashboard from './../components/SuperAdminDashboard/SuperAdminDashboard';
import axios from 'axios';
import { toast } from 'react-toastify';
import { Redirect } from 'react-router';

export const SuperAdminDashboardContainer = (
    { isLoading, isError, uiConfig, userDetails,
        fetchUiConfig, autheticateUser }) => {

    const [allUser, setallUser] = useState([]);
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchUiConfig();
        autheticateUser();
    }, [fetchUiConfig, autheticateUser]);

    useEffect(() => {
        axios.get('/user/all')
            .then(response => {
                setLoading(false);
                setallUser(response.data.data);
            })
            .catch(error => {
                setLoading(false)
                setError(true)
            })
    }, []);


    // User Role Or Department Udpate Handler
    const onUpdateUserRoleOrDepartment = (data, email) => {
        axios.patch(`/user/update/${email}`, {
            data: data
        }).then(response => {
            let updatedUser = allUser.map(user => {
                if (user.email === response.data.data.email) {
                    return response.data.data;
                }
                return user;
            })
            setallUser(updatedUser);
            toast.success(response.data.message)
        })
            .catch(error => setError(true))
    }

    const onNewDepartmentAddHadler = (data) => {
        console.log(data)
        axios.patch(`/uiConfig/update/${uiConfig.id}`, {
            data: data
        }).then(response => {
            toast.success(response.data.message)
            fetchUiConfig()
        }).catch(error => setError(true))
    }

    let view = <Spinner />;
    console.log(isLoading)
    if (!isLoading) {
        console.log(userDetails)
        if (isError) {
            view = <Redirect to="/" />
        } else {
            view = <SuperAdminDashboard loading={loading} error={error} allUser={allUser}
                userDetails={userDetails} uiConfig={uiConfig}
                onUpdateUserRoleOrDepartment={onUpdateUserRoleOrDepartment}
                onNewDepartmentAddHadler={onNewDepartmentAddHadler} />
        }
    }



    return view;

}

const mapStateToProps = (state) => ({
    userDetails: state.login.userDetails,
    isLoading: state.login.isLoading,
    isError: state.login.error.isError,
    uiConfig: state.login.uiConfig
})

const mapDispatchToProps = {
    autheticateUser,
    fetchUiConfig
}

export default connect(mapStateToProps, mapDispatchToProps)(SuperAdminDashboardContainer)
