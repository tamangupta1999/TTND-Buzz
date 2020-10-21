const router = require('express').Router();
const multerUploads = require('./../config/multerConfig');
const isAuthenticated = require('./../middleware/isAuthenticated');
const isAdmin = require('./../middleware/isAdmin');

const { create, getAll, getUserComplaint,
    getById, updateComplaint, addComment,
    updateStatus, deleteComplaint } = require('./../controllers/complaintController');

router.use(isAuthenticated)

router.post('/create', multerUploads, create);

router.get('/all/:pageNumber/:size', isAdmin, getAll);

router.get('/userComplaint', getUserComplaint);

router.get('/:complaintId', getById);

router.patch('/update/:complaintId', isAdmin, updateComplaint);

router.patch('/update/status/:complaintId', isAdmin, updateStatus);

router.delete('/:complaintId', deleteComplaint)

router.patch('/add/comment/:complaintId', addComment);

module.exports = router;