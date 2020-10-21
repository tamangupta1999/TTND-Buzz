const User = require('./../models/User');
const { generate } = require('./../libs/response');
const { isEmpty } = require('././../libs/isEmpty');

/*
    Update User Profile Handler
*/
const updateProfileData = async (data, email) => {
    try {
        if (isEmpty(data)) {
            return await generate(true, 'Profile Update Fields Is Missing', 404, null);
        }
        let { name, department } = data;
        if (name === '' || department === '') {
            return await generate(true, 'Name Or Department Is Missing', 404, null);
        }
        let updatedProfile = await User.findOneAndUpdate({ email: email }, {
            $set: {
                name: name,
                department: department
            }
        }, { new: true, useFindAndModify: false });
        if (updatedProfile) {
            return await generate(false, 'User Details Updated Successfully', 200, updatedProfile);
        } else {
            return await generate(true, 'No User Found With This Email', 404, null);
        }
    } catch (error) {
        return await generate(true, error.message, 502, null);
    }

}

/*
    Fetch All Existing User Handler
*/
const fetchAllUserDetails = async () => {
    try {
        let allUsers = await User.find().select('-_id -__v -token')
        return await generate(false, 'All User Details Found', 200, allUsers);
    } catch (error) {
        return await generate(true, error.message, 502, null);
    }
}

const updateUserRoleOrDepartment = async (email, data) => {
    try {
        if (isEmpty(data)) {
            return await generate(true, 'Profile Update Fields Is Missing', 404, null);
        }
        let { userRole, department } = data;
        if (userRole === '') {
            return await generate(true, 'UserRole Or Department Is Missing', 404, null);
        }
        let updatedProfile = await User.findOneAndUpdate({ email: email }, {
            $set: {
                userRole: userRole,
                department: department
            }
        }, { new: true, useFindAndModify: false }).select('-__v -_id');
        if (updatedProfile) {
            return await generate(false, 'User Role Or Dept Updated Successfully', 200, updatedProfile);
        } else {
            return await generate(true, 'No User Found With This Email', 404, null);
        }
    } catch (error) {
        return await generate(true, error.message, 502, null);
    }
}

module.exports = {
    updateProfileData: updateProfileData,
    fetchAllUserDetails: fetchAllUserDetails,
    updateUserRoleOrDepartment: updateUserRoleOrDepartment
}