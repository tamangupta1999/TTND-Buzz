const UiConfig = require('./../models/UiConfig');
const { generate } = require('./../libs/response');

const fetchloggedInUserDetail = (req) => {
    if (req.user) {
        delete req.user._doc._id;
        delete req.user._doc.__v;
        delete req.user._doc.token;
        // setting token in session
        req.session.token = req.user.token;
        return generate(false, `${req.user.name} is successfully logged In`, 200, req.user)
    } else {
        // error handling
        return generate(true, 'Login To Access This Resource', 200, null)
    }
}


const fetchUiConfigDetail = async () => {
    try {
        let uiConfig = await UiConfig.find();
        return await generate(false, 'Ui Config Fetched Successfully', 200, uiConfig[0]);
    } catch (error) {
        return await generate(true, error.message, 502, null);

    }
}

const addDepartment = async (id, { department }) => {
    try {
        let upperCaseConversion = department.toUpperCase()
        if (department === '') {
            return await generate(true, 'Department Is Required', 400, null)
        }
        let updatedData = await UiConfig.findByIdAndUpdate({ _id: id }, {
            $push: { department: upperCaseConversion }
        }, {
            new: true,
            useFindAndModify: false
        })
        return await generate(false, 'Department Is Added', 200, updatedData);
    } catch (error) {
        return await generate(true, error.message, 502, null);
    }
}

module.exports = {
    fetchloggedInUserDetail: fetchloggedInUserDetail,
    fetchUiConfigDetail: fetchUiConfigDetail,
    addDepartment: addDepartment
}