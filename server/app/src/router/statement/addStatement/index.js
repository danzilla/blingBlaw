/* No Var - let and const
 * try ES6
 * NodeJS + Monk + Session = keep it minimal
 */
// config.config.config.pageInfo | flashData |
const config = require("../../../modules/config");

module.exports = {
    // POST
    // POST - add Category module
    addStatement: function (req, res, next) {
        // get session info and set config.pageInfo
        config.pageInfo.request = "POST";
        config.pageInfo.page = "addStatement-react";
        console.log("\n" + config.pageInfo.page + "(" + config.pageInfo.request + ")");

        /*
            CREATE TABLE transaction_DB.transactions(
            transaction_Id SERIAL PRIMARY KEY NOT NULL UNIQUE,
            transaction_serial VARCHAR(36) NOT NULL UNIQUE,
            transaction_Date DATE NOT NULL,
            transaction_Desc VARCHAR(254) NOT NULL,
            transaction_Withdrawls VARCHAR(254) NOT NULL,
            transaction_Deposits VARCHAR(254) NOT NULL,
            transaction_Balance VARCHAR(254) NOT NULL,
            transaction_Category JSONB,
            transaction_Comments JSONB,
            transaction_Updated TIMESTAMP,
            transaction_UpdateUser VARCHAR(254),
            statement_serial VARCHAR(36) REFERENCES statement_DB.statement_details(statement_serial),
            statement_id INTEGER REFERENCES statement_DB.statement_details(statement_Id)
            );
        */
       
        console.log("Trans: " + JSON.stringify(req.body.reviewTransactionData));
        let transactionData = [
            transaction_serial,
            transaction_Desc,
            transaction_Date,
            transaction_Desc,
            transaction_Withdrawls,
            transaction_Deposits,
            transaction_Balance,
            transaction_Category,
            transaction_Comments,
            transaction_Updated,
            transaction_UpdateUser
        ]

        /*
            statement_Id SERIAL PRIMARY KEY NOT NULL UNIQUE,
            statement_serial VARCHAR(36) NOT NULL UNIQUE,
            statement_Name VARCHAR(254) NOT NULL,
            statement_Type VARCHAR(254) NOT NULL,
            statement_Date DATE NOT NULL,
            statement_Desc VARCHAR(254),
            statement_Created TIMESTAMP,
            statement_Modified TIMESTAMP,
            statement_ModifiedtUser VARCHAR(254),
            statement_FileInfo JSONB,
            statement_owner_id INTEGER REFERENCES user_DB.user_auth(user_id),
            statement_owner_serial VARCHAR(36) UNIQUE REFERENCES user_DB.user_auth(user_serial)
        */

        console.log("Sta: " + JSON.stringify(req.body.statementInfo));


        let statementData = [
            statement_serial, 
            statement_Name, 
            statement_Type, 
            statement_Date, 
            statement_Desc, 
            statement_Created, 
            statement_ModifiedtUser
        ]


    }
}
