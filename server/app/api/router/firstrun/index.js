'strict'
// Intial_RUN - Router
// Intiate_db | Keep it minimal
const { INTIAL_RUN } = require('../../../config/modals/intialRun/intialRun_modal');
 // Response
const RESPONSE = {
    Title: null,
    status: null,
    message: null,
    data: null
}
const IntialRun = function (req, res, next) {
    const FirstRun_Response = Object.create(RESPONSE);
    FirstRun_Response.Title = "First run and Intial DB setups";
    async function FIRE() {
        try {
            const First_RUN = await INTIAL_RUN();
            FirstRun_Response.message = `Fetched with ${First_RUN} rows`;
            FirstRun_Response.status = true;
            FirstRun_Response.data = First_RUN;
        } catch (errr) {
            FirstRun_Response.message = `Error fetching`;
            FirstRun_Response.status = false;
            FirstRun_Response.data = errr;
        } finally { 
            res.send(FirstRun_Response);
        }
    } FIRE();
}
// Export
module.exports = IntialRun;