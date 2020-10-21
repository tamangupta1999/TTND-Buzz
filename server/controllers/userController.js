const { updateProfileData, fetchAllUserDetails,
    updateUserRoleOrDepartment } = require('./../services/userService');


/*
    Update User Profile Handler
*/
const updateProfile = async (req, res) => {
    let response = await updateProfileData(req.body.data, req.user.userId);
    res.status(response.status).send(response);
}

/*
    Fetch All User Handler
*/
const fetchAllUser = async (req, res) => {
    let response = await fetchAllUserDetails();
    res.status(response.status).send(response);
}
/*
    Update User Role And Department Handler
*/
const updateExistingUserProfile = async (req, res) => {
    let response = await updateUserRoleOrDepartment(req.params.email, req.body.data);
    res.status(response.status).send(response);
}

module.exports = {
    updateProfile: updateProfile,
    fetchAllUser: fetchAllUser,
    updateExistingUserProfile: updateExistingUserProfile
}