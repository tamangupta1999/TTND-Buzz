const { generate } = require('../libs/response');

const isAdmin = (req, res, next) => {
    if (req.user.userRole === 'ADMIN') {
        next();
    } else {
        res.status(401).send(generate(true, 'Only Selected User Can View This Resource', 401, null))
    }
}

module.exports = isAdmin;