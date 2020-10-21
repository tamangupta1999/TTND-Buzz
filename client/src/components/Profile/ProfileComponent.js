import React, { useState } from 'react';
import Styles from './ProfileComponent.module.css';
import DashboardHeader from './../Dashboard/DashboardHeader/DashboardHeader';

const ProfileComponent = ({ userDetails, department, onUpdateProfileHandler }) => {
    let { email, name, profileUrl } = userDetails;
    const [userName, setUserName] = useState(name);
    const [newDepartment, setNewDepartment] = useState(userDetails.department);
    const [error, setError] = useState(false);

    //UpdateProfileHandler
    const onUpdateProfile = () => {
        let data = {
            name: userName,
            department: newDepartment
        }
        if (newDepartment.length > 0 && userName.length > 0) {
            setError(false)
            onUpdateProfileHandler(data);
        } else {
            setError(true)
        }
    }
    return (
        <div className={Styles.ProfileComponent}>
            <DashboardHeader userDetails={userDetails} />
            <h2 className={Styles.DisplayHeading}>Update Your Profile...</h2>
            <div className={Styles.ProfileEditContainer}>
                <div className={Styles.ProfileHeader}>
                    <h3>Your Profile</h3>
                    <img className={Styles.UserImage} src={profileUrl} alt='profile-pic'></img>
                </div>
                <span className={Styles.ProfileValue}><p>Email:</p><p>{email}</p></span>
                <span className={Styles.ProfileValue}><p>Name: </p>
                    <input value={userName} onChange={event => setUserName(event.target.value)} /></span>
                <span className={Styles.ProfileValue}><p>Department:</p>
                    <select value={newDepartment} onChange={event => setNewDepartment(event.target.value)}>
                        <option hidden value="">Select Department</option>
                        {department.map(depart => {
                            return <option key={depart} value={depart}>{depart}</option>
                        })}
                    </select>
                </span>
                <div className={Styles.ProfileFooter}>
                    <button className={Styles.UpdateBtn} onClick={onUpdateProfile}>Update</button>
                    {error ? <p className={Styles.Invalid}>Please Select Department To Continue</p> : null}
                </div>
            </div>
        </div>
    )
}

export default ProfileComponent;
