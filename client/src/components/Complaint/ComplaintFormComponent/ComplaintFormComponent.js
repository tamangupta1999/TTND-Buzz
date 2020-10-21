import React, { useState } from 'react';
import Styles from './ComplaintFormComponent.module.css';
import { toast } from 'react-toastify';

const ComplaintFormComponent = ({ onComplaintFormSubmit, userDetails, uiDepartment }) => {
    const [department, setDepatment] = useState('');
    const [issueTitle, setIssueTitle] = useState('');
    const [concern, setConcern] = useState('');
    const [image, setImage] = useState('');
    let attachedClasses = [Styles.ImageLabel];
    if (typeof image === 'object') {
        attachedClasses.push(Styles.Dark)
    }
    const validateForm = () => {
        if (department.length === 0) {
            toast.warning('Department Is Required');
            return true;
        } else if (issueTitle.length === 0) {
            toast.warning('Issue Title Is Required');
            return true;
        } else if (concern.length === 0) {
            toast.warning('Your Concern Is Required');
            return true;
        } else {
            return false;
        }
    }

    const formSubmitHandler = (event) => {
        event.preventDefault();
        let isValid = validateForm();
        if (!isValid) {
            const formdata = new FormData();
            formdata.append('concern', concern);
            formdata.append('department', department);
            formdata.append('issueTitle', issueTitle);
            formdata.append('name', userDetails.name);
            formdata.append('email', userDetails.email);
            formdata.append('complaintImage', image);
            onComplaintFormSubmit(formdata);
            setDepatment('');
            setIssueTitle('');
            setImage('');
            setConcern('');
        }
    }

    return (
        <div className={Styles.ComplaintFormComponent}>
            <h3 className={Styles.ComplaintHeader}>Complaint Box</h3>
            <form onSubmit={formSubmitHandler} encType="multipart/form-data">
                <div className={Styles.FormRow}>
                    <div className={Styles.FormColumn}>
                        <label className={Styles.Label} htmlFor="Department">Department*</label>
                        <select id="department" className={Styles.Select} name="Department" value={department} onChange={event => setDepatment(event.target.value)}>
                            <option hidden></option>
                            {uiDepartment.map(dept => {
                                return <option key={dept} value={dept}>{dept}</option>
                            })}
                        </select>
                    </div>
                    <div className={Styles.FormColumn}>
                        <label className={Styles.Label} htmlFor="Issue Title">Issue Title*</label>
                        <input className={Styles.Input} type="text" id="Issue Title" value={issueTitle} onChange={event => setIssueTitle(event.target.value)} />
                    </div>
                </div>
                <div className={Styles.FormRow}>
                    <div className={Styles.FormColumn}>
                        <label className={Styles.Label} htmlFor="Your Name">Your Name*</label>
                        <input className={Styles.Input} disabled type="text" id="YourName" value={userDetails.name} />

                    </div>
                    <div className={Styles.FormColumn}>
                        <label className={Styles.Label} htmlFor="Your Email">Your Email*</label>
                        <input className={Styles.Input} disabled type="email" id="YourEmail" value={userDetails.email} />
                    </div>
                </div>
                <div className={Styles.FormRow}>
                    <div className={Styles.FormColumn}>
                        <label className={Styles.Label} htmlFor="Your Concern">Your Concern*</label>
                        <textarea className={Styles.TextArea} type="text" id="Your Concern" value={concern} onChange={event => setConcern(event.target.value)} />
                    </div>
                </div>
                <div className={Styles.Attachement}>
                    <label htmlFor="file" className={attachedClasses.join(' ')}>Attachement(optional)&nbsp;&nbsp;<i className="far fa-images fa-2x"></i></label>
                    <input type="file" id="file" name='attachement'
                        className={Styles.InputFile}
                        accept="image/*"
                        onChange={event => setImage(event.target.files[0])} />
                </div>
                <div className={Styles.Submit}>
                    <button className={Styles.SubmitBtn} type="submit">Submit</button>
                </div>
            </form>
        </div>
    )
}

export default ComplaintFormComponent
