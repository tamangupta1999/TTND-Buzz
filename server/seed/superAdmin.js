const User = require('./../models/User');

const initializeSuperAdmin = async () => {
    let data = {
        email: 'dummy@email.com',
        name: 'Taman Gupta',
        userRole: 'SUPER_ADMIN',
        profileUrl: 'unknown',
        token: 'unknown',
        department: '',
    }
    await User.findOneAndUpdate({ email: data.email }, data, { upsert: true, useFindAndModify: false });
    console.log('Admin Initialized')
}

module.exports = initializeSuperAdmin;