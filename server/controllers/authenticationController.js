const { generate } = require('./../libs/response');
const { fetchloggedInUserDetail, fetchUiConfigDetail, addDepartment } = require('./../services/authenticationService');

/*
    Fetching Logged In User Handler
*/
const fetchLoggedInUser = async (req, res) => {
    let response = await fetchloggedInUserDetail(req);
    res.status(response.status).send(response);
}

/*
    Logout Handler 
*/
const logout = async (req, res) => {
    await req.logout();
    // setting session value to null
    req.session = null;
    res.send(generate(false, 'Successfully Logged Out', 200, null));
}

/*
    Fetching Ui Config Handler 
*/
const fetchUiConfig = async (req, res) => {
    let response = await fetchUiConfigDetail();
    res.status(response.status).send(response);
}
/*
    Add More Deparment Handler 
*/
const addMoreDepartment = async (req, res) => {
    let response = await addDepartment(req.params.id, req.body.data);
    res.status(response.status).send(response);
}


module.exports = {
    fetchLoggedInUser: fetchLoggedInUser,
    fetchUiConfig: fetchUiConfig,
    addMoreDepartment: addMoreDepartment,
    logout: logout
}