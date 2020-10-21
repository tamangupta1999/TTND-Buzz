import React from 'react';
import Styles from './UserComplaintComponent.module.css';
import Spinner from './../../UI/Spinner/Spinner';
import { NavLink } from 'react-router-dom';

const UserComplaintComponent = (props) => {
    const { complaints, isLoading, isError, errorMessage } = props;

    let tableData = (
        complaints.map(complaint => {
            let attachedClasses = [Styles.ComplaintTableRow];
            if (complaint.status === 'Open') {
                attachedClasses.push(Styles.StatusOpen)
            } else if (complaint.status === 'In Progress') {
                attachedClasses.push(Styles.StatusInProgress)
            } else {
                attachedClasses.push(Styles.StatusResolved)
            }
            return (
                <tr key={complaint.complaintId}>
                    <td className={Styles.ComplaintTableRow}>{complaint.department}</td>
                    <td className={Styles.ComplaintTableRow}><NavLink to={`complaint/${complaint.complaintId}`}>{complaint.complaintId}</NavLink></td>
                    <td className={Styles.ComplaintTableRow}>{complaint.assignedTo}</td>
                    <td className={attachedClasses.join(' ')}>{complaint.status}</td>
                </tr>
            );
        })
    );
    let complaintsView = <Spinner />
    if (!isLoading) {
        if (isError) complaintsView = <p className={Styles.Message}>Something Went Wrong ....{errorMessage}</p>
        else {
            complaintsView = <p className={Styles.Message}>No Complaints Available.</p>
            if (complaints.length !== 0) {
                complaintsView = (
                    <table className={Styles.ComplaintTable}>
                        <thead>
                            <tr>
                                <th className={Styles.ComplaintTableRow}>Department</th>
                                <th className={Styles.ComplaintTableRow}>IssueId</th>
                                <th className={Styles.ComplaintTableRow}>Assigned To</th>
                                <th className={Styles.ComplaintTableRow}>Status</th>
                            </tr>
                        </thead>
                        <tbody className={Styles.ComplaintTableBody}>
                            {tableData}
                        </tbody>
                    </table>
                )
            }
        }
    }
    return (
        <div className={Styles.UserComplaintComponent}>
            <h3 className={Styles.UserComplaintHeader}>Your Complaints</h3>
            <div className={Styles.TableWrapper}>
                {complaintsView}
            </div>
        </div >
    )
}

export default UserComplaintComponent;
