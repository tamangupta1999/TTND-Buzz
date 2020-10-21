const { generate } = require('./../libs/response');
const jwt = require('jsonwebtoken');

const isAutheticated = async (req, res, next) => {
    try {
        let token = req.body.token || req.session.token || req.headers.token || req.user.token;
        let verify = await jwt.verify(token, process.env.JWT_SECRET);
        console.log(verify)
        if (!req.user) {
            req.user = {
                userId: verify.id,
                userRole: verify.userRole
            }
        }
        req.user.userId = verify.id;
        req.user.userRole = verify.userRole;
        next();
    } catch (error) {
        let response = generate(true, 'token is not valid or required', 401, null);
        res.status(response.status).send(response);
    }
}

module.exports = isAutheticated;