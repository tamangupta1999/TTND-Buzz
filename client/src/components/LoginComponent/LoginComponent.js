import React from 'react';
import Styles from './LoginComponent.module.css';
import Logo from './../../assets/image/logo.png';


const LoginComponent = (props) => {
    console.log(props)
    return (
        <React.Fragment>
            <div className={Styles.LoginComponent}> </div>
            <div className={Styles.CenterCard} >
                <div className={Styles.CardContainer}>
                    <img className={Styles.Logo} src={Logo} alt="TTN_Logo"></img>
                    <p className={Styles.LoginText}>Create Your Own Buzz</p>
                    <a className={Styles.LoginLink} href="/auth/google"><i className="fab fa-google"></i>Sign In with Gmail</a>
                </div>
            </div>
        </React.Fragment>

    )
}

export default LoginComponent;
