import React, { useEffect } from 'react';
import Styles from './DashboardComponent.module.css';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';
import { autheticateUser, fetchUiConfig } from './../../actions';
import Spinner from './../UI/Spinner/Spinner';
import DashboardHeader from './DashboardHeader/DashboardHeader';
import DashboardNavigation from './DashboardNavigation/DashboardNavigation';

const Dashboard = (props) => {
    const { autheticateUser, userDetails, isLoading, isError, fetchUiConfig } = props;
    useEffect(() => {
        autheticateUser()
        fetchUiConfig()
    }, [autheticateUser, fetchUiConfig])
    let view = <Spinner />;
    if (!isLoading) {
        if (isError) {
            view = <Redirect to="/" />
        } else {
            view = (
                <div>
                    <DashboardHeader {...props} userDetails={userDetails} />
                    <div className={Styles.RoadImage}>
                        <div className={Styles.Overlay}>
                            <h1 className={Styles.DashboardHeader}>
                                {window.location.pathname === '/complaint' ? <span>CREATING BUZZ AROUND YOU<br></br> NEVER BEEN SO EASY..</span> : <span>POSTING YOUR THOUGHTS <br></br> NEVER BEEN SO EASY..</span>}
                            </h1>
                        </div>
                    </div>
                    <main className={Styles.Main}>
                        <DashboardNavigation userRole={userDetails.userRole} />
                        {props.children}
                    </main>
                </div>
            );
        }
    }
    return view;
}
const mapStateToProps = state => {
    return {
        userDetails: state.login.userDetails,
        isLoading: state.login.isLoading,
        isError: state.login.error.isError,
        successMessage: state.login.successMessage
    }
}
const mapDispatchToProps = {
    autheticateUser,
    fetchUiConfig
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
