/* No Var - let and const
 * try ES6
 * NodeJS + Monk + Session = keep it minimal
 */
// config.config.config.pageInfo | flashData |

const config = require("../../../modules/config");

const uuidv1 = require('uuid/v1'); //Time_based - saltTime
const moment = require('moment'); // Time

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
        let statement_serial = uuidv1();

        // Transaction Upload 
        function statementUpload() {
            // prepare data
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
            // Return query result to Promise 
            return new Promise((resolve, reject) => {
                danzillaDB.pool.query(statementAddQuery, statementData, function (err, statementResults) {
                    if (err) { console.log(err); reject(err) }
                    else { // if not errors - send good mesg
                        console.log("statementResults.rowCount: " + statementResults.rowCount);
                        resolve(statementResults)
                    }
                });
            })

        }

        // Transaction Upload 
        function transactionUpload() {
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
            // Return query result to Promise 
            return new Promise((resolve, reject) => {
                // TransactionData insert
                let arrLength = transactionData.length;
                // loop through transactions
                for (z = 0; z < arrLength; z++) {
                    danzillaDB.pool.query(transactionAddQuery, transactionData[z], function (err, transactionResults) {
                        if (err) { console.log(err); reject(err) }
                        else { // if not errors - push it to transGoodResults[]
                            resolve(transactionResults)
                        }
                    });
                }
            })
        }
        // set Async - payload
        async function upload() {
            try {
                const statementPayLoad = await statementUpload();
                const transactionPayLoad= await transactionUpload();
                // check if its retun 1 row of upload
                if ((statementPayLoad.rowCount === 1) && (transactionPayLoad.rowCount === 1)){
                    let pageMesage = "Transaction uploaded!";
                    danzillaDB.pool.end;
                    console.log(pageMesage);
                    res.send({ pageMesage: pageMesage, pageGood: true });
                }
            } catch (err) {
                let pageMesage = "Failed to upload Transaction: " + err;
                danzillaDB.pool.end;
                console.log(pageMesage);
                res.send({ pageMesage: pageMesage, pageGood: false });
            }
        }
        // Upload data
        upload(); 
    }
} 
 