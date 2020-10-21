import React from 'react'
import Styles from './DashboardHeader.module.css';
import { NavLink } from 'react-router-dom';
import TTN_Logo from './../../../assets/image/logo.png';

const DashboardHeader = props => {
    const { userDetails } = props;
    return (
        <div className={Styles.DashboardHeader}>
            <img className={Styles.Logo_Image} src={TTN_Logo} alt="ttn_logo" />
            <div className={Styles.UserContent}>
                <button className={Styles.ProfileView}> <img className={Styles.ProfileImage} src={userDetails.profileUrl} alt="ProfileImage" /></button>
                <div className={Styles.ProfileViewer}>
                    <img className={Styles.ProfileImage} src={userDetails.profileUrl} alt="ProfileImage" />
                    <p className={Styles.UserName}>{userDetails.name}</p>
                    {userDetails.userRole === 'ADMIN' ? <p className={Styles.UserType}>(Admin)</p> : null}
                    {userDetails.userRole !== 'SUPER_ADMIN' ? <NavLink className={Styles.ProfileBtn} to="/profile">Profile</NavLink> : null}
                    <NavLink className={Styles.LogoutBtn} to="/logout">Logout<i style={{ paddingLeft: '5px' }} className="fas fa-sign-out-alt"></i></NavLink>
                </div>
            </div>

        </div>
    );

}


export default DashboardHeader;
