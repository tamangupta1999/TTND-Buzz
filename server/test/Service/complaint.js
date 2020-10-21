const chai = require('chai');
const mongoose = require('mongoose');

const Complaint = require('./../../services/complaintService');

const should = chai.should();

/** DB Config */
before(() => {
    // db config  
    mongoose.connect('mongodb://127.0.0.1:27017/ttnd_buzz', {
        useNewUrlParser: "true",
        useUnifiedTopology: "true"
    });
});


describe('Complaint Service', () => {

    /*
    * Get All Complaints..
    */
    describe('Get All Complaint----Complaint', () => {
        it('should return all the complaints', async () => {
            const query = {
                pageNumber: 1,
                size: 10
            }
            let response = await Complaint.getAllComplaint(query)
            response.should.be.a('object');
            response.should.have.property('error').eq(false);
            response.should.have.property('message').eq('All Complaints Found Successfully');
            response.should.have.property('status').eq(200);
            response.should.have.property('data').to.be.a('array');
            response.data[0].should.have.property('complaintId');
            response.data[0].should.have.property('concern');
            response.data[0].should.have.property('department');
            response.data[0].should.have.property('lockedBy');
            response.data[0].should.have.property('assignedTo');
            response.data[0].should.have.property('comments');
            response.data.length.should.eq(10)
        });

        it('should throw error when pageNumber is wrong', async () => {
            const query = {
                pageNumber: 0,
                size: 10
            }
            let response = await Complaint.getAllComplaint(query)
            response.should.have.property('error').eq(true);
            response.should.have.property('message').eq('Page Number or Size Must Be Valid');
            response.should.have.property('status').eq(404);

        });
    });

    /*
    * Get All Complaints..
    */
    describe('Get User Complaints----Complaint', () => {
        it('should return provide email related complaint', async () => {
            let response = await Complaint.getUserComplaints('dummy@email.com');
            response.should.have.property('error').eq(false);
            response.should.have.property('message').eq('All Complaints Found');
            response.should.have.property('status').eq(200);
            response.should.have.property('data').to.be.a('array');
            response.data[0].should.have.property('complaintId');
            response.data[0].should.have.property('assignedTo');
            response.data[0].should.have.property('department');
            response.data[0].should.have.property('status');
        })
        it('should return provide email related complaint if not found any complaint', async () => {
            let response = await Complaint.getUserComplaints('dummy@email.com');
            response.should.have.property('error').eq(false);
            response.should.have.property('message').eq('All Complaints Found');
            response.should.have.property('status').eq(200);
            response.should.have.property('data').to.be.a('array');
            response.data.length.should.be.eq(0);
        })
    });

    /*
    * Update Status Of Complaint..
    */
    describe('Update Status Of Complaints----Complaint', () => {
        it('should return updated Status complaint', async () => {
            let response = await Complaint.updateStatusOnComplaint({ complaintId: 'F5T3Xvjpq' }, { status: 'Open' });
            response.should.have.property('error').eq(false);
            response.should.have.property('message').eq('Status Updated Successfully');
            response.status.should.be.eq(200);
            response.data.should.have.property('status').eq('Open');
        })
        it('should throw error when id or email is empty', async () => {
            let response = await Complaint.updateStatusOnComplaint({}, { status: '' });
            response.should.have.property('error').eq(true);
            response.should.have.property('message').eq('Complaint Id or Status is missing');
            response.status.should.be.eq(404);
        })
    });

    /*
    * Delete Complaint..
    */
    describe('Delete Complaint----Complaint', () => {
        it('should delete the existng complaint', async () => {
            let response = await Complaint.deleteComplaintById({ complaintId: 'KIfvgDoKP' }, { userId: 'dummy@email.com' });
            response.should.have.property('error').eq(false);
            response.should.have.property('message').eq('Complaint Deleted Successfully');
            response.status.should.be.eq(200);
        })
        it('should throw error when other then creator try to delete his complaint', async () => {
            let response = await Complaint.deleteComplaintById({ complaintId: 'KIfvgDoKP' }, { userId: 'dummy@email.com' });
            response.should.have.property('error').eq(true);
            response.should.have.property('message').eq('Only Open Compliaints Will Be Deleted By Its User');
            response.status.should.be.eq(403);
        })

        it('should only delete when complaint is open else throw error', async () => {
            let response = await Complaint.deleteComplaintById({ complaintId: 'HNA49UG9r' }, { userId: 'dummy@email.com' });
            response.should.have.property('error').eq(true);
            response.should.have.property('message').eq('Only Open Compliaints Will Be Deleted By Its User');
            response.status.should.be.eq(403);
        })
    });
})