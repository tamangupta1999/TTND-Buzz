import React from 'react';
import Styles from './DashboardNavigation.module.css';
import DashboardNavigationItem from './DashboardNavigationItem/DashboardNavigationItem';
import { NavLink } from 'react-router-dom';

const DashboardNavigation = ({ userRole }) => {
    let res = null;
    if (userRole === 'ADMIN') {
        res = (
            <div className={Styles.DashboardNavigationWrapper}>
                <ul className={Styles.DashboardNavigation}>
                    <DashboardNavigationItem link="/buzz">BUZZ</DashboardNavigationItem>
                    <DashboardNavigationItem link="/complaint">COMPLAINTS</DashboardNavigationItem>
                    <DashboardNavigationItem link="/resolve">RESOLVED</DashboardNavigationItem>
                    <DashboardNavigationItem link="/myBuzz">My Buzz</DashboardNavigationItem>
                </ul>
                <div className={Styles.BottomNavbarWrapper}>
                    <p className={Styles.CompanyName}>&copy;2020 To The New Digital</p>
                    <NavLink className={Styles.NavLink} to="/about">About</NavLink>
                    <NavLink className={Styles.NavLink} to="/help">Help</NavLink>
                </div>
            </div>
        )
    } else {
        res = (
            <div>
                <ul className={Styles.DashboardNavigation} >
                    <DashboardNavigationItem link="/buzz">BUZZ</DashboardNavigationItem>
                    <DashboardNavigationItem link="/complaint">COMPLAINTS</DashboardNavigationItem>
                    <DashboardNavigationItem link="/myBuzz">My Buzz</DashboardNavigationItem>
                </ul>
                <div className={Styles.BottomNavbarWrapper}>
                    <p className={Styles.CompanyName}>&copy;2020 To The New Digital</p>
                    <NavLink className={Styles.NavLink} to="/about">About</NavLink>
                    <NavLink className={Styles.NavLink} to="/help">Help</NavLink>
                </div>
            </div>
        )
    }

    return res;
}

export default DashboardNavigation;
