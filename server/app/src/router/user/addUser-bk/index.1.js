/* Register user
 * Keep it minimal
 */
const async = require('async');
// #r
module.exports = {
    // POST
    // POST - add user module
    register: function (req, res, next) {
        // Register user - pageMessage
        let pageInfo = { pageCode: "", pageMessage: "" };
        if (!req.body.userName || !req.body.password || !req.body.fannyPack) {
            pageInfo.pageMesage = "Error! cannot be empty fields";
            console.log(pageInfo.pageMesage);
            res.send({ pageInfo: pageInfo });
        } else {

            let userName  = "asdas"
            let userEmail  = "123123asdadsas"
            let userPassword  = "123123"
            let userAuthID = "asdasdasdasdasd"
            let userData = {userFullName: "aaaaa", userEmail: "adasd@asdasdas"}

            const statement = require("../../../../config/statements/create/User");
            statement.add_user_to_userAuth(userName, userEmail, userPassword)
            statement.add_user_to_userDetails(userAuthID, userData)


            let pageInfo = { pageCode: "asdasd", pageMessage: "asdasd" };

            pageInfo.pageMesage = "_eeeeeeeeeee";
            console.log(JSON.stringify(statement));
            res.send({ pageInfo: pageInfo });

        }
    }
}
