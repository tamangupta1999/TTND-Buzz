const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../app');


//Assertion Style
const should = chai.should();

chai.use(chaiHttp);

describe('Blog API Testing', () => {

    /**
     * Test the GET Route
     */
    describe('GET /buzz', () => {
        it('It Should return all the Buzz', (done) => {
            chai.request(app)
                .get('/buzz/all/1/10')
                .end((err, response) => {
                    should.not.exist(err);
                    response.should.have.status(200);
                    response.body.should.be.a('object');
                    response.body.data.should.be.a('array');
                    response.body.data.length.should.be.eq(10);
                    response.body.should.have.property('pages');
                    response.body.data[0].should.have.property('buzzMessage');
                    response.body.data[0].should.have.property('category');
                    response.body.data[0].should.have.property('createdBy');
                    response.body.data[0].should.have.property('buzzId');
                    response.body.data[0].should.have.property('buzzImage');
                    done();
                })
        });

        it('should throw error When API url is wrong Or Size is not valid', (done) => {
            chai.request(app)
                .get('/buzz/all/1/0')
                .end((err, response) => {
                    response.should.have.status(404);
                    response.body.should.have.property('error').eq(true);
                    response.body.should.have.property('message').eq('Page Number or Size Must Be Valid');
                    done();
                })
        });
        it('should throw error when we pass string instead of Number in PageNumber And Size', (done) => {
            chai.request(app)
                .get('/buzz/all/one/ten')
                .end((err, response) => {
                    response.should.have.status(404);
                    response.body.should.have.property('error').eq(true);
                    response.body.should.have.property('message').eq('Page Number or Size Must Be Valid');
                    done();
                })
        });

        it('Should throw error when url is mismatched', (done) => {
            chai.request(app)
                .get('/buzz/al/1/10')
                .send({ userId: 'dummy@email.com' })
                .end((err, response) => {
                    response.should.have.status(302);
                    done(err);
                });
        });
    });

    /**
    * Test the GET {by ID} Route
    */
    describe('GET buzz/myBuzz', () => {
        it('Should return all My Buzz', (done) => {
            chai.request(app)
                .get('/buzz/myBuzz')
                .send({ userId: 'dummy@email.com' })
                .end((err, response) => {
                    response.should.have.status(200);
                    response.body.should.be.a('object');
                    response.body.data.should.be.a('array');
                    response.body.data[0].should.have.property('buzzMessage');
                    response.body.data[0].should.have.property('category');
                    response.body.data[0].should.have.property('createdBy');
                    response.body.data[0].should.have.property('buzzId');
                    done();
                });
        });
        it('Should return empty data array when no records found with the given userId', (done) => {
            chai.request(app)
                .get('/buzz/myBuzz')
                .send({ userId: 'dummy@email.com' })
                .end((err, response) => {
                    response.should.have.status(200);
                    response.body.data.length.should.be.eq(0);
                    response.body.message.should.be.eq('No Buzz Found For this user');
                    response.body.error.should.be.a('boolean');
                    response.body.error.should.be.eq(false);
                    done(err);
                });
        });

        it('Should throw error when url is mismatched', (done) => {
            chai.request(app)
                .get('/buzz/myBuz')
                .send({ userId: 'dummy@email.com' })
                .end((err, response) => {
                    response.should.have.status(302);
                    done(err);
                });
        });
    })

    /**
     * Test the POST Route
     */
    describe('POST /buzz/create', () => {
        it('should post new buzz', (done) => {
            chai.request(app)
                .post('/buzz/create')
                .field('userId', 'dummy@email.com')
                .field('buzzMessage', 'Some random buzz message')
                .field('category', 'ACTIVITY')
                .field('Content-type', 'multipart/form-data')
                .end((err, response) => {
                    response.should.have.status(200);
                    response.body.message.should.be.eq('Buzz created Successfully');
                    response.body.data.should.be.a('object');
                    response.body.data.should.have.property('buzzId');
                    response.body.data.should.have.property('buzzMessage').eq('Some random buzz message');
                    response.body.data.should.have.property('createdOn');
                    response.body.data.should.have.property('category').eq('ACTIVITY');
                    response.body.data.buzzImage.length.should.be.eq(0);
                    done();
                })
        });
        it('should throw error when all the data is missing ', (done) => {
            chai.request(app)
                .post('/buzz/create')
                .end((err, response) => {
                    if (err) done(err)
                    response.should.have.status(400);
                    response.body.message.should.be.eq('Buzz Data Is Missing');
                    done();
                })
        })

        it('should throw error when data is missing', (done) => {
            chai.request(app)
                .post('/buzz/create')
                .field('userId', 'dummy@email.com')
                .field('buzzMessage', 'Some random buzz message')
                .field('Content-type', 'multipart/form-data')
                .end((err, response) => {
                    if (err) done(err)
                    response.should.have.status(400);
                    response.body.message.should.be.eq('Some fields is empty');
                    done();
                })
        });

        it('Should throw error when url is mismatched', (done) => {
            chai.request(app)
                .post('/buzz/creat')
                .end((err, response) => {
                    response.should.have.status(302);
                    done(err);
                });
        });
    })


    /**
     * Test the PATCH Route
     */
    describe('UPDATE /buzz/:buzzId', () => {
        it('should Update the existing buzz', (done) => {
            const buzzId = '8hcB9msa7'
            chai.request(app)
                .patch(`/buzz/update/${buzzId}`)
                .field('userId', 'dummy@email.com')
                .field('buzzMessage', 'Updated random buzz message once again')
                .field('category', 'LOST_AND_FOUND')
                .field('Content-type', 'multipart/form-data')
                .end((err, response) => {
                    response.should.have.status(200);
                    response.body.message.should.be.eq('Buzz Updated Successfully');
                    response.body.data.should.be.a('object');
                    response.body.data.should.have.property('buzzId');
                    response.body.data.should.have.property('buzzMessage').eq('Updated random buzz message once again');
                    response.body.data.should.have.property('createdOn');
                    response.body.data.should.have.property('category').eq('LOST_AND_FOUND');
                    response.body.data.should.have.property('buzzImage');
                    response.body.data.buzzImage.length.should.be.eq(0);
                    done();
                })
        });

        it('should throw error when buzzId is wrong', (done) => {
            const buzzId = '8hcB9msa';
            chai.request(app)
                .patch(`/buzz/update/${buzzId}`)
                .field('userId', 'dummy@email.com')
                .field('buzzMessage', 'Updated random buzz message once again')
                .field('category', 'ACTIVITY')
                .field('Content-type', 'multipart/form-data')
                .end((err, response) => {
                    response.should.have.status(502);
                    done();
                })
        });

        it('Should throw error when url is mismatched', (done) => {
            const buzzId = '8hcB9msa';
            chai.request(app)
                .patch(`/buz/updat/${buzzId}`)
                .end((err, response) => {
                    response.should.have.status(302);
                    done(err);
                });
        });
    })

    /**
     * Test the DELETE Route
    */
    describe('DELETE /buzz/:buzzId', () => {
        it('should delete the existing buzz', (done) => {
            const buzzId = 'b8Wo6IWV4';
            chai.request(app)
                .delete(`/buzz/${buzzId}`)
                .send({ userId: "dummy@email.com" })
                .end((err, response) => {
                    response.should.have.status(200);
                    response.body.error.should.be.eq(false);
                    response.body.message.should.be.eq('Buzz Deleted Successfully');
                    done();
                })
        });

        it('should throw error when buzzId is not valid', (done) => {
            const buzzId = 'zP-xS1A_';
            chai.request(app)
                .delete(`/buzz/${buzzId}`)
                .send({ userId: "dummy@email.com" })
                .end((err, response) => {
                    response.should.have.status(404);
                    response.body.error.should.be.eq(true);
                    response.body.message.should.be.eq('Invalid Buzz Id')
                    done();
                })
        });

        it('Should throw error when url is mismatched', (done) => {
            const buzzId = '8hcB9msa';
            chai.request(app)
                .patch(`/buzz/delte/${buzzId}`)
                .end((err, response) => {
                    response.should.have.status(302);
                    done(err);
                });
        });
    })
})