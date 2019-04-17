/* No Var - let and const
 * try ES6
 * NodeJS + Monk + Session = keep it minimal
 */
// config.config.config.pageInfo | flashData |

const config = require("../../../modules/config");

const uuidv1 = require('uuid/v1'); //Time_based - saltTime
const moment = require('moment'); // Time
const async = require('async');

const danzillaDB = require("../../../modules/danzillaDB");


module.exports = {
    // POST
    // POST - add Category module
    addStatement: function (req, res, next) {
        // get session info and set config.pageInfo
        config.pageInfo.request = "POST";
        config.pageInfo.page = "addStatement-react";
        console.log("\n" + config.pageInfo.page + "(" + config.pageInfo.request + ")");

        // must be session serial - Danzilla
        let statementAddUser = "b47a6a7a-fc45-5356-ae3d-782e513bfc25"
        
        /*  statement_DB.statement_details

            statement_Id SERIAL PRIMARY KEY NOT NULL UNIQUE,
            statement_serial VARCHAR(36) NOT NULL UNIQUE,
            statement_Name VARCHAR(254),
            statement_Type VARCHAR(254) NOT NULL,
            statement_Date DATE NOT NULL,
            statement_Desc VARCHAR(254),
            statement_Created TIMESTAMP,
            statement_Modified VARCHAR(36),
            statement_owner_id INTEGER REFERENCES user_DB.user_auth(user_id),
            statement_owner_serial VARCHAR(36) UNIQUE REFERENCES user_DB.user_auth(user_serial)
        */
        // prepare data
        let statement_serial = uuidv1();
        let statement_Type = req.body.statementInfo.staType;
        let statement_Date = req.body.statementInfo.staDate;
        let statement_Desc = req.body.statementInfo.staComment;
        let statement_Created = moment(new Date()).format("YYYY-MM-DD HH:mm:ss");
        let statement_owner_serial = statementAddUser;
        // sql Data
        statementData = [
            statement_serial,
            statement_Type,
            statement_Date,
            statement_Desc,
            statement_Created,
            statement_owner_serial
        ]
        // Query Insert 
        const statementAddQuery = 'INSERT INTO statement_DB.statement_details(' +
            'statement_serial, statement_Type, statement_Date, statement_Desc, statement_Created, statement_owner_serial' +
            ') VALUES($1, $2, $3, $4, $5, $6) RETURNING *';

            /*
            transaction_DB.transactions

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
        */
        // prepare data
        const transactionData = [];
        const reviewTransactionData = req.body.reviewTransactionData;
        // loop through array and prepare data
        for (let i = 0; i < reviewTransactionData.length; i++) {
            transactionData.push([
                uuidv1(),
                reviewTransactionData[i].field1,
                reviewTransactionData[i].field2,
                reviewTransactionData[i].field3,
                reviewTransactionData[i].field4,
                reviewTransactionData[i].field5,
                moment(new Date()).format("YYYY-MM-DD HH:mm:ss"),
                statement_serial
            ])
        }
        // console.log("transaction: " + JSON.stringify(transactionData[0]));
        // Query Insert 
        const transactionAddQuery = 'INSERT INTO transaction_DB.transactions(' +
            'transaction_serial, transaction_Date, transaction_Desc, ' +
            'transaction_Withdrawls, transaction_Deposits, transaction_Balance, transaction_Updated, statement_serial' +
            ') VALUES($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *';

        // async - 2 queries 
        async.parallel({
            statementUpload: function (callback) {
                // statementData Insert
                danzillaDB.pool.query(statementAddQuery, statementData, function (err, statementResults) {
                    if (err) { console.log(err); callback(null, err); }
                    else { // Done and Send to callback
                        console.log("StatementData - done");
                        callback(null, statementResults);
                    }
                });
            },
            transactionUpload: function (callback) {
                // TransactionData insert
                let arrLength = transactionData.length;
                let transGoodResults = [];
                // loop through transactions
                for (z = 0; z < arrLength; z++) {
                    danzillaDB.pool.query(transactionAddQuery, transactionData[z], function (err, transactionResults) {
                        if (err) { console.log(err); callback(null, err); }
                        else { // if not errors - push it to transGoodResults[]
                            transGoodResults.push(transactionResults);
                        }
                    });
                }
                console.log("TransactionData - done");
                callback(null, transGoodResults);
            }
        }, function (err, results) {
            if (err){
                // err 
                let pageMesage = "Error" + err;
                danzillaDB.pool.end;
                res.send({ pageMesage: pageMesage });
            } 
            if((results.statementUpload.rowCount === 1) && (results.transactionUpload[0])){
                let pageMesage = "Upload been success";
                danzillaDB.pool.end;
                res.send({ pageMesage: pageMesage});
            } else { // console.log("else: " + JSON.stringify(results));
                let pageMesage = "Failed to upload Transaction";
                danzillaDB.pool.end;
                res.send({ pageMesage: pageMesage });
            }
        });
 
    }
} 
 