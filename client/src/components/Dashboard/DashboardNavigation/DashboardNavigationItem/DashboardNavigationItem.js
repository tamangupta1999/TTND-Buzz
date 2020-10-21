import React from 'react';
import { NavLink } from 'react-router-dom';
import Styles from './DashboardNavigationItem.module.css';

const DashboardNavigationItem = (props) => {
    return (
        <li className={Styles.DashboardNavigationItem}>
            <NavLink to={props.link} activeClassName={Styles.Active} className={Styles.Navlink}>
                {props.children}
            </NavLink>
            <i className="fas fa-chevron-right" style={{ paddingLeft: '5rem' }}></i>
        </li>
    )
}

export default DashboardNavigationItem;