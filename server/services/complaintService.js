const Complaint = require('./../models/Complaint');
const shortid = require('shortid');
const moment = require('moment');
const cloudinary = require('cloudinary').v2;
const fs = require('fs');
const emailNotification = require('./../libs/emailNotification');
const { isEmpty } = require('./../libs/isEmpty');
const { generate } = require('./../libs/response');


/**
 * create Complaint Handler
 */
const createComplaint = async (req) => {
    try {
        let { body, files } = req;
        let filePath = '';
        if (isEmpty(body)) {
            return await generate(true, 'Complaints Fields Are Empty', 402, null);
        }
        body.email = req.user.userId;
        let { concern, department, issueTitle, name, email } = body;
        if (concern === '' || department === '' || issueTitle === '' || name === '' || email === '') {
            return await generate(true, 'Some Fields Are Empty', 402, null);
        }
        if (files.length > 0) {
            let { path } = files[0];
            let uploadedImageResult = await cloudinary.uploader.upload(path);
            filePath = uploadedImageResult.secure_url;
            fs.unlinkSync(path);
        }
        let newComplaint = new Complaint({
            concern,
            department,
            issueTitle,
            lockedBy: name,
            email,
            status: 'Open',
            attachement: filePath
        });
        let complaint = await newComplaint.save();
        return await generate(false, 'Complaint Created Successfully', 200, {
            complaintId: complaint.complaintId,
            concern: complaint.concern,
            department: complaint.department,
            issueTitle: complaint.issueTitle,
            lockedBy: complaint.lockedBy,
            email: complaint.email,
            status: complaint.status
        });


    } catch (error) {
        return await generate(true, error.message, 502, null);
    }
}

/**
 * Gell All Complaint Handler
 */
const getAllComplaint = async ({ pageNumber, size }) => {
    try {
        if (+pageNumber === 0 || +size === 0 || isNaN(+pageNumber) || isNaN(+size)) {
            return await generate(true, 'Page Number or Size Must Be Valid', 404, null)
        }
        let count = await Complaint.countDocuments();
        let totalPage = Math.ceil(count / size);
        let skip = size * (pageNumber - 1);
        let limit = size;

        let complaints = await Complaint.find().sort('-createdOn').skip(+skip).limit(+limit).select('-_id');
        return {
            error: false,
            message: 'All Complaints Found Successfully',
            status: 200,
            pages: totalPage,
            data: complaints
        }
    } catch (error) {
        return await generate(true, error.message, 502, null);
    }
}
/**
 * Gell All Users ComplaintHandler
 */
const getUserComplaints = async (email) => {
    try {
        let complaints = await Complaint.find({ email: email }).select('department complaintId assignedTo status -_id');
        return await generate(false, 'All Complaints Found', 200, complaints);

    } catch (error) {
        return await generate(true, error.message, 502, null);
    }
}

/**
 *  Get Complaint By ID Handler
 */
const getComplaintById = async ({ complaintId }) => {
    try {
        let check = await isEmpty(complaintId);
        if (check) return await generate(true, 'Complaint Id is missing', 404, null);
        let complaint = await Complaint.findOne({ complaintId }).select('-_id -__v');
        if (complaint) {
            return await generate(false, 'Complaint Found Successfully', 200, complaint);
        } else {
            return await generate(false, 'No Complaint Found With This ID', 404, null);
        }
    } catch (error) {
        return await generate(true, error.message, 502, null);
    }
}

/**
 *  Update Complaint by Complaint ID Handler
 */
const updateComplaintById = async ({ complaintId }, data) => {
    try {

        if (complaintId === '') return await generate(true, 'Complaint Id is missing', 404, null);
        let { estimatedTime, assignedTo, status } = data;
        if (isEmpty(estimatedTime) && isEmpty(assignedTo) && isEmpty(status)) {
            return await generate(true, 'Data is missing', 400, null);
        }
        let updatedComplaint = await Complaint.findOneAndUpdate({ complaintId: complaintId },
            {
                $set: {
                    estimatedTime,
                    assignedTo,
                    status,
                    updatedOn: moment.now()
                }
            },
            { new: true, useFindAndModify: false });
        if (updatedComplaint) {
            let subject = 'Your Complaint Is Assignee Has Been Updated';
            let text = `Your Complaint With Id $${complaintId} has been assigned to ${updatedComplaint.assignedTo}`;
            emailNotification(updatedComplaint.email, subject, text);
            return await generate(false, 'Complaint Updated Successfully', 200, updatedComplaint)
        } else {
            return await generate(false, 'No Complaint Found With This ID', 404, null);
        }
    } catch (error) {
        return await generate(true, error.message, 502, null);
    }

}

/**
 * Update Status Of Complaint by Complaint ID Handler
 */
const updateStatusOnComplaint = async ({ complaintId }, { status }) => {
    try {
        if (!complaintId || !status) return await generate(true, 'Complaint Id or Status is missing', 404, null);

        let updatedStatus = await Complaint.findOneAndUpdate({ complaintId }, {
            $set: { status: status, updatedOn: moment.now() }
        }, { new: true, useFindAndModify: false }).select('department complaintId lockedBy assignedTo status email -_id');
        if (updatedStatus) {
            //Notification Via Email..
            let subject = 'Your Complaint Status Is Updated';
            let text = `Your ComplaintId - ${updatedStatus.complaintId} status has been updated to ${updatedStatus.status}`;
            if (updatedStatus.status === 'Resolved') {
                emailNotification(updatedStatus.email, subject, text);
            }
            delete updatedStatus.email;
            return await generate(false, 'Status Updated Successfully', 200, updatedStatus);
        } else {
            return await generate(true, 'No Complaint Found With This Id', 404, null);
        }

    } catch (error) {
        return await generate(true, error.message, 502, null);

    }
}

/**
 * Delete Complaint By Id Handler
 */
const deleteComplaintById = async ({ complaintId }, { userId }) => {
    try {
        if (complaintId === '') {
            return await generate(true, 'Complaint Id is missing', 404, null);
        }
        let result = await Complaint.findOneAndRemove({ complaintId: complaintId, status: 'Open', email: userId });
        if (result) {
            return await generate(false, 'Complaint Deleted Successfully', 200, null);
        } else {
            return await generate(true, 'Only Open Compliaints Will Be Deleted By Its User', 403, null);
        }
    } catch (error) {
        return await generate(true, error.message, 502, null);
    }
}

/**
 * Add Comment To Complaint Handler
 */
const addCommentToComplaint = async ({ complaintId }, userId, { comment }) => {
    try {
        let check = await isEmpty(complaintId);
        if (check) return await generate(true, 'Complaint Id is missing', 404, null);
        let userComment = {
            commentId: shortid.generate(),
            commentedOn: moment.now(),
            comment: comment,
            commentedBy: userId
        }
        let response = await Complaint.findOneAndUpdate({ complaintId }, {
            $push: { comments: userComment }
        }, { new: true, useFindAndModify: false }).select('-_id -__v');

        return await generate(false, 'Comment Added Successfully', 200, response);
    } catch (error) {
        return await generate(true, error.message, 502, null);
    }
}

module.exports = {
    createComplaint: createComplaint,
    getAllComplaint: getAllComplaint,
    getComplaintById: getComplaintById,
    getUserComplaints: getUserComplaints,
    updateComplaintById: updateComplaintById,
    deleteComplaintById: deleteComplaintById,
    addCommentToComplaint: addCommentToComplaint,
    updateStatusOnComplaint: updateStatusOnComplaint
}