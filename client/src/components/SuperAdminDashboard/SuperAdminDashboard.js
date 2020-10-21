import React, { useState } from 'react';
import Styles from './SuperAdminDashboard.module.css';
import Spinner from './../UI/Spinner/Spinner';
import DashboardHeader from './../Dashboard/DashboardHeader/DashboardHeader';

const SuperAdminDashboard = ({ userDetails, uiConfig, loading, error, allUser,
    onUpdateUserRoleOrDepartment, onNewDepartmentAddHadler }) => {
    const { department, userRole } = uiConfig;
    const [newDepartment, setNewDepartment] = useState('');
    let attachedClasses = [Styles.Input];
    const onUpdateUserRole = (event, user) => {
        let data = {
            userRole: event.target.value,
            department: user.department
        }
        onUpdateUserRoleOrDepartment(data, user.email);
    }
    const onUpdateDepartment = (event, user) => {
        let data = {
            userRole: user.userRole,
            department: event.target.value
        }
        onUpdateUserRoleOrDepartment(data, user.email);
    }
    const onDepartmentAddHandler = (e) => {
        e.preventDefault();
        if (newDepartment.length > 0) {
            let data = {
                department: newDepartment
            }
            onNewDepartmentAddHadler(data);
            setNewDepartment('')
        } else {
            attachedClasses.push(Styles.Invalid)
        }
    }

    let allUserView = <Spinner />;
    if (!loading) {
        allUserView = (
            <table className={Styles.Table}>
                <thead>
                    <tr className={Styles.TableRow}>
                        <th className={Styles.TableHead}>ProfilePic</th>
                        <th className={Styles.TableHead}>Name</th>
                        <th className={Styles.TableHead}>Email</th>
                        <th className={Styles.TableHead}>UserRole</th>
                        <th className={Styles.TableHead}>Department</th>
                    </tr>
                </thead>
                <tbody>
                    {allUser.map(user => {
                        return (<tr key={user.email} className={Styles.TableRow}>
                            <td className={Styles.TableData}><img className={Styles.ProfileImage} src={user.profileUrl} alt='profilePic'></img></td>
                            <td className={Styles.TableData}>{user.name}</td>
                            <td className={Styles.TableData}>{user.email}</td>
                            <td className={Styles.TableData}>
                                <select className={Styles.Select} value={user.userRole} onChange={event => onUpdateUserRole(event, user)}>
                                    <option hidden value="">Select UserRole</option>
                                    {userRole.map(role => {
                                        return <option key={role} value={role}>{role}</option>
                                    })}
                                </select></td>
                            <td className={Styles.TableData}>
                                <select className={Styles.Select} value={user.department} onChange={event => onUpdateDepartment(event, user)}>
                                    <option hidden value="">Select Department</option>
                                    {department.map(depart => {
                                        return <option key={depart} value={depart}>{depart}</option>
                                    })}
                                </select>
                            </td>
                        </tr>)
                    })}
                </tbody>
            </table>
        )
    }

    return (
        <div className={Styles.SuperAdminDashboard}>
            <DashboardHeader userDetails={userDetails} />
            <div className={Styles.BoxWrapper}>
                <div className={Styles.TableWrapper}>
                    <h3 className={Styles.SuperAdminHeading}>All Users</h3>
                    {allUserView}
                </div>
                <div className={Styles.DepartmentWrapper}>
                    <h3 className={Styles.SuperAdminHeading}>Department</h3>
                    <p className={Styles.DepartmentHeading}>All Existing Department:</p>
                    {department.map((dept, index) => {
                        return <p key={dept}>{index + 1}.&nbsp;{dept}</p>
                    })}
                    <p className={Styles.DepartmentHeading}>Add New Department:</p>
                    <form onSubmit={onDepartmentAddHandler}>
                        <input className={attachedClasses.join(' ')} value={newDepartment}
                            onChange={event => setNewDepartment(event.target.value)}
                            placeholder='Enter New Dept...'
                        />
                        <button type='submit' className={Styles.DepartmentBtn}>Add Department</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default SuperAdminDashboard;
