const { createComplaint, getAllComplaint, getComplaintById,
    getUserComplaints, updateComplaintById, addCommentToComplaint,
    updateStatusOnComplaint, deleteComplaintById } = require('./../services/complaintService');

const { generate } = require('./../libs/response');

const create = async (req, res) => {
    let response = await createComplaint(req);
    res.status(response.status).send(response);
}

const getAll = async (req, res) => {
    let response = await getAllComplaint(req.params);
    res.status(response.status).send(response);
}

const getUserComplaint = async (req, res) => {
    let response = await getUserComplaints(req.user.userId);
    res.status(response.status).send(response);
}

const getById = async (req, res) => {
    let response = await getComplaintById(req.params);
    res.status(response.status).send(response);
}

const updateComplaint = async (req, res) => {
    let response = await updateComplaintById(req.params, req.body.data);
    res.status(response.status).send(response);
}

const updateStatus = async (req, res) => {
    let response = await updateStatusOnComplaint(req.params, req.body.data);
    res.status(response.status).send(response);
}

const deleteComplaint = async (req, res) => {
    let response = await deleteComplaintById(req.params, req.user);
    res.status(response.status).send(response);
}

const addComment = async (req, res) => {
    let response = await addCommentToComplaint(req.params, req.user.userId, req.body.data);
    res.status(response.status).send(response);
}


module.exports = {
    create: create,
    getAll: getAll,
    getUserComplaint: getUserComplaint,
    getById: getById,
    updateComplaint: updateComplaint,
    deleteComplaint: deleteComplaint,
    addComment: addComment,
    updateStatus: updateStatus
}