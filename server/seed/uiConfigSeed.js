const UiConfig = require('./../models/UiConfig');

let UiConfigSeed = (function () {
    let department = ['IT', 'HARDWARE', 'NETWORKING', 'INFRA', 'ADMIN', 'HR', 'ACCOUNT', 'OTHERS'];
    let category = ['ACITVITY', 'LOST_AND_FOUND']
    let userRole = ['EMPLOYEE', 'ADMIN'];
    let isExecuted = false;
    return () => {
        if (!isExecuted) {
            UiConfig.create({
                department: department,
                category: category,
                userRole: userRole
            })
            console.log('UICONFIG')
        }
    }
})();


module.exports = UiConfigSeed;