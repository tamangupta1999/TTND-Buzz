import React, { useEffect, useState } from 'react';
import Styles from './ComplaintViewComponent.module.css';
import { connect } from 'react-redux';
import { toast } from 'react-toastify';
import moment from 'moment';
import Spinner from '../../UI/Spinner/Spinner';
import { fetchComplaint, updateComplaint, addComment, deleteComplaint } from '../../../actions';
import CommentComponent from './CommentComponent/CommentComponent';

const ComplaintViewComponent = ({ match, userRole, loggedInUserEmail, complaint,
    isLoading, fetchComplaint, updateComplaint,
    addComment, deleteComplaint, history }) => {

    const { issueTitle, department,
        email, assignedTo, status, estimatedTime,
        concern, attachement, createdOn, updatedOn, comments } = complaint;
    const complaintId = match.params.complaintId;

    const [isOpen, setIsOpen] = useState(false);
    const [newStatus, setNewStatus] = useState('');
    const [newassignee, setNewAssignee] = useState('');
    const [newEstimatedTime, setEstimatedTime] = useState('');

    const updatedData = {
        status: newStatus,
        assignedTo: newassignee,
        estimatedTime: newEstimatedTime
    }
    const onEditHandler = () => {
        setIsOpen(!isOpen)
    }
    const onDeleteHandler = () => {
        deleteComplaint(complaintId);
        history.push('/complaint');
    }
    const validateForm = ({ assignedTo, estimatedTime }) => {
        if (assignedTo === '') {
            toast.warning('Assigned To is required');
            return true;
        } else if (estimatedTime === '') {
            toast.warning('Estimated Time is required');
            return true;
        } else {
            return false;
        }
    }
    const onUpdateHandler = async (complaintId, updatedData) => {
        let isValid = await validateForm(updatedData);
        if (!isValid) {
            await updateComplaint(complaintId, updatedData);
            await fetchComplaint(complaintId);
            setIsOpen(false);
        }
    }
    useEffect(() => {
        fetchComplaint(complaintId)
        setNewStatus(status)
    }, [fetchComplaint, complaintId, status])

    //Set Css According to Status
    let attachedClasses = [];
    let attachedClassesSelect = [Styles.Select];
    if (status === 'Open') {
        attachedClasses.push(Styles.StatusOpen)
        attachedClassesSelect.push(Styles.StatusOpen)
    } else if (status === 'In Progress') {
        attachedClasses.push(Styles.StatusInProgress)
        attachedClassesSelect.push(Styles.StatusInProgress)

    } else {
        attachedClasses.push(Styles.StatusResolved)
        attachedClassesSelect.push(Styles.StatusResolved)
    }
    let complaintView = <Spinner />;
    let commentView = <Spinner />;
    if (!isLoading && Object.keys(complaint).length > 0) {
        complaintView = (
            <React.Fragment key={"2"}>
                <div className={Styles.ComplaintContent}>
                    <p style={{ color: 'blue' }}><span className={Styles.ComplaintHeading} >ComplaintId:</span> {complaintId}</p>
                    <p><span className={Styles.ComplaintHeading} >IssueTitle:</span> {issueTitle}</p>
                    <p><span className={Styles.ComplaintHeading} >Department:</span> {department}</p>
                </div>
                <div className={Styles.ComplaintContentOne}>
                    <p><span className={Styles.ComplaintHeading} >Estimated Time:</span>{isOpen ? <input className={Styles.Input} type="text" value={newEstimatedTime}
                        onChange={event => setEstimatedTime(event.target.value)} placeholder='Enter estimated time..' /> : [estimatedTime]}</p>
                    <p><span className={Styles.ComplaintHeading} >AssignedTo:</span>{isOpen ? <input className={Styles.Input} type="text" value={newassignee}
                        onChange={event => setNewAssignee(event.target.value)} placeholder='Enter assignee..' /> : [assignedTo]}
                    </p>
                    <p className={attachedClasses.join(' ')}><span className={Styles.ComplaintHeading} >Status:</span>
                        {isOpen ? <select className={attachedClassesSelect.join(' ')} name="Status" value={newStatus} onChange={event => setNewStatus(event.target.value)}>
                            <option key="Open" value="Open">Open</option>
                            <option key="In Progress" value="In Progress">In Progress</option>
                            <option key="Resolved" value="Resolved">Resolved</option>
                        </select> : [status]}</p>
                </div>
                <div className={Styles.ComplaintContentConcern}>
                    <p><span className={Styles.ComplaintHeading} >Concern:</span> {concern}</p>
                </div>
                {attachement.length > 0 ? <img className={Styles.ComplaintImage}
                    src={attachement} alt="ComplaintImage" /> : null}
                <div className={Styles.ComplaintContentOne}>
                    <p><span className={Styles.ComplaintHeading}>Email:</span> {email}</p>
                    <p><span className={Styles.ComplaintHeading} >CreatedOn:</span> {createdOn.split('T')[0]}</p>
                    <p><span className={Styles.ComplaintHeading} >Updated:</span> {updatedOn === null ? 'Not Updated' : moment(updatedOn).fromNow()}</p>
                </div>
                {status === 'Open' && email === loggedInUserEmail ? <div className={Styles.ComplaintDeleteButtonWrapper}>
                    <button className={Styles.DeleteBtn} onClick={onDeleteHandler}>Delete</button>
                </div> : null}
            </React.Fragment>)
        commentView = <CommentComponent addComment={addComment}
            complaintId={complaintId} comments={comments} />
    }

    let adminView = (
        <div className={Styles.AdminView} key={"1"}>
            <button className={Styles.EditButton}
                onClick={onEditHandler}>
                <i className="fas fa-pencil-alt"></i>
             Edit</button>
            {isOpen ? <button className={Styles.EditButton}
                type="submit" disabled={!isOpen}
                onClick={() => onUpdateHandler(complaintId, updatedData)} >Apply Changes</button> : null}
        </div>
    );
    return (
        <div className={Styles.ComplaintViewComponent}>
            <h3 className={Styles.ComplaintViewHeader}>Complaint</h3>
            {userRole === 'ADMIN' ? [adminView] : null}
            {complaintView}
            <hr></hr>
            <div>
                <p className={Styles.ComplaintComment} >
                    Comments :
                </p>
                {commentView}
            </div>
        </div>
    )
}

const mapStateToProps = state => {
    return {
        isLoading: state.complaint.isLoading,
        complaint: state.complaint.complaint,
        userRole: state.login.userDetails.userRole,
        loggedInUserEmail: state.login.userDetails.email
    }
}

const mapDispatchToProps = dispatch => {
    return {
        fetchComplaint: (complaintId) => dispatch(fetchComplaint(complaintId)),
        updateComplaint: (complaintId, updatedData) => dispatch(updateComplaint(complaintId, updatedData)),
        addComment: (complaintId, comment) => dispatch(addComment(complaintId, comment)),
        deleteComplaint: (complaintId) => dispatch(deleteComplaint(complaintId))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ComplaintViewComponent);
