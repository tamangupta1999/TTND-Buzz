import React, { useEffect } from 'react';
import { Redirect } from 'react-router';
import { connect } from 'react-redux';
import { logout } from './../../actions'

const LogoutComponent = ({ logout }) => {
    useEffect(() => {
        logout();
    }, [logout]);

    return <Redirect to="/" />
}

const mapDispatchToProps = {
    logout
}

export default connect(null, mapDispatchToProps)(LogoutComponent);
