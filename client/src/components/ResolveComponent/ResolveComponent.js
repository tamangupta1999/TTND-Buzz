import React from 'react';
import Styles from './ResolveComponent.module.css';
import { NavLink } from 'react-router-dom';

const ResolveComponent = (props) => {
    let tableHeading = ['Department', 'IssueId', 'Locked By', 'Assigned To', 'Status'];
    const { allComplaints, updateStatus, totalPage, updateCurrentPage } = props;
    let totalPageCount = Array.from({ length: totalPage }, () => Math.floor(Math.random() * totalPage));

    const onFindNextData = (pageNumber) => {
        updateCurrentPage(pageNumber)
    }
    const onUpdateStatus = (status, Id) => {
        updateStatus(Id, status);
    }

    let tableData = <tr><td><p>No Complaints Available</p></td></tr>
    if (allComplaints.length !== 0) {
        tableData = (
            allComplaints.map(complaint => {
                let attachedClasses = [Styles.SelectTable];
                if (complaint.status === 'Open') {
                    attachedClasses.push(Styles.StatusOpen)
                } else if (complaint.status === 'In Progress') {
                    attachedClasses.push(Styles.StatusInProgress)
                } else {
                    attachedClasses.push(Styles.StatusResolved)
                }
                return (<tr key={complaint.complaintId}>
                    <td className={Styles.TableData}>{complaint.department}</td>
                    <td className={Styles.TableData}><NavLink to={`complaint/${complaint.complaintId}`}>{complaint.complaintId}</NavLink></td>
                    <td className={Styles.TableData}>{complaint.lockedBy}</td>
                    <td className={Styles.TableData}>{complaint.assignedTo}</td>
                    <td className={Styles.TableData}><select className={attachedClasses.join(' ')} name="Status"
                        value={complaint.status}
                        onChange={event => onUpdateStatus(event.target.value, complaint.complaintId)}>
                        <option key="Open" value="Open">Open</option>
                        <option key="In Progress" value="In Progress">In Progress</option>
                        <option key="Resolved" value="Resolved">Resolved</option>
                    </select></td>
                </tr>
                );
            })
        );
    }
    return (
        <div className={Styles.ResolveComponent}>
            <div className={Styles.ResolveComponentTopBar}>
                <h3 className={Styles.ResolveComponentHeader}>All Complaints</h3>
                <div>
                    <select className={Styles.Select} >
                        <option value='filterBy'>Filter By</option>
                        <option key='Open' value='Open'>Open</option>
                        <option key='In Progress' value='In Progress'>In Progress</option>
                        <option key='Resolved' value='Resolved'>Resolved</option>
                    </select>
                    <i className="fas fa-filter"></i>
                </div>
            </div>
            <div className={Styles.TableWrapper}>
                <table className={Styles.ResolveComponentTable}>
                    <thead>
                        <tr>
                            {tableHeading.map(head => {
                                return <th key={head} className={Styles.TableHeading}>{head}</th>
                            })}
                        </tr>
                    </thead>
                    <tbody className={Styles.TableBody}>
                        {tableData}
                    </tbody>
                </table>
                <div className={Styles.PaginationWrapper}>
                    {totalPageCount.map((page, index) => {
                        return <button key={index} className={Styles.PaginationBtn}
                            onClick={() => onFindNextData(index + 1)}>{index + 1}</button>
                    })}
                </div>
            </div>
        </div >
    )
}

export default ResolveComponent;
