const roles = require("../models/roleModel");
const handleError = require("./handleError");


module.exports.roleCheck = async (res, data, privilegde_needed) => {
    try {
        console.log(data.role);
        const access = await roles.findOne({name: data.role})
        // console.log(access+ ' roles');
        console.log(access.privileges.includes(privilegde_needed));
        return access.privileges.includes(privilegde_needed);
    } catch (error) {
        // return handleError(res, 400, 'Error in fetching role-' + error)
        return false
    }
}