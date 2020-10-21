import React from 'react';
import Styles from './SharedComponent.module.css';

const SharedComponent = () => {
    return (
        <div className={Styles.SharedComponent}>
            <h1 className={Styles.SharedComponentHeader}>{window.location.pathname === '/about' ? <span><i style={{ color: 'grey' }} className="fas fa-address-card"></i>About Us</span> : <span><i style={{ color: 'grey' }}
                className="fas fa-info-circle"></i>Help</span>}</h1>
            {window.location.pathname === '/about' ?
                <React.Fragment>
                    <p className={Styles.Heading}>Who We Are</p>
                    <p className={Styles.Para}>Some info about company.</p>
                    <p className={Styles.Para}>Some info about company</p>
                </React.Fragment> :
                <React.Fragment>
                    <p className={Styles.Heading}>For Help Contact To </p>
                    <p className={Styles.ContactHeading}>Write Us On-----</p>
                    <p className={Styles.Contact}>Contact - dummy@mail.com</p>
                    <p className={Styles.Contact}>Contact - dummy@mail.com</p>
                    <p className={Styles.Contact}>Contact - dummy@mail.com</p>
                    <p className={Styles.Contact}>Contact - dummy@mail.com</p>
                </React.Fragment>}
        </div>
    )
}

export default SharedComponent;
