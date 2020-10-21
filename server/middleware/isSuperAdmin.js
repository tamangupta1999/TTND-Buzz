const { generate } = require('../libs/response');

const isSuperAdmin = (req, res, next) => {
    if (req.user.userRole === 'SUPER_ADMIN') {
        next();
    } else {
        res.status(401).send(generate(true, 'Only Selected User Can View This Resource', 401, null))
    }
}

module.exports = isSuperAdmin;