/* No Var - let and const
 * try ES6
 * NodeJS + Monk + Session = keep it minimal
 */
// config.config.config.pageInfo | flashData |

const config = require("../../../modules/config");
const danzillaDB = require("../../../modules/danzillaDB");
const moment = require('moment');

module.exports = {
    // POST
    // POST - add Category module
    viewStatement: function (req, res, next) {
        // get session info and set config.pageInfo
        config.pageInfo.request = "GET";
        config.pageInfo.page = "viewStatement-react";
        console.log("\n" + config.pageInfo.page + "(" + config.pageInfo.request + ")");

        // Statement View
        function statementViewAll() {
            // Query Insert 
            const statementViewQuery = 'SELECT * FROM statement_DB.statement_details;';
            // Return query result to Promise 
            return new Promise((resolve, reject) => {
                danzillaDB.pool.query(statementViewQuery, function (err, statementResults) {
                    if (err) { console.log(err); reject(err) }
                    else { // if not errors - send good mesg
                        console.log("statementResults.rowCount: " + statementResults.rowCount);
                        resolve(statementResults)
                    }
                });
            })
        }
        // Transaction View 
        function transactionViewAll() {
            // console.log("transaction: " + JSON.stringify(transactionData[0]));
            // Query Insert 
            const transactionViewQuery = 'SELECT * FROM transaction_DB.transactions;';
            // Return query result to Promise 
            return new Promise((resolve, reject) => {
                danzillaDB.pool.query(transactionViewQuery, function (err, transactionResults) {
                    if (err) { console.log(err); reject(err) }
                    else { // if not errors - push it to transGoodResults[]
                        resolve(transactionResults)
                    }
                });
            })
        }
        // Category View
        function categoryViewAll() {
            // Query Insert 
            const categoryViewQuery = 'SELECT * FROM category_DB.category;';
            // Return query result to Promise 
            return new Promise((resolve, reject) => {
                danzillaDB.pool.query(categoryViewQuery, function (err, categoryResults) {
                    if (err) { console.log(err); reject(err) }
                    else { // if not errors - push it to transGoodResults[]
                        resolve(categoryResults)
                    }
                });
            })
        }

        // set Async - payload
        async function viewLoad() {
            try {
                const statementPayLoad = await statementViewAll();
                const transactionPayLoad = await transactionViewAll();
                const categoryPayLoad = await categoryViewAll();
                
                if ((statementPayLoad.rowCount >= 1) || (transactionPayLoad.rowCount >= 1)){
                    danzillaDB.pool.end;
                    // check if its retun 1 row of upload
                    let pageMesage = "Transaction loaded!";
                    console.log(pageMesage);
                    
                    const trans = transactionPayLoad.rows;
                    const stats = statementPayLoad.rows;
                    const cates = categoryPayLoad.rows;

                    // Combine Stats+Trans+Cates
                    const bigTable = [];

                    // Each Transactions 
                    for (let x = 0; x < trans.length; x++){
                        // Each Statements 
                        for (let y = 0; y < stats.length; y++){
                            // Match transaction.serial === Statements.serial
                            if (trans[x].statement_serial === stats[y].statement_serial){
                                // pushD to BigTable
                                // category need to be included
                                
                                let pushD = {
                                    statement_serial: stats[y].statement_serial,
                                    statement_date: moment(stats[y].statement_date).format('MMMM YYYY'),
                                    statement_desc: stats[y].statement_desc,
                                    statement_created: moment(stats[y].statement_created).format('MMMM DD, YYYY'),
                                    transaction_serial: trans[x].transaction_serial,
                                    transaction_date: moment(trans[x].transaction_date).format('dddd, MMMM DD, YYYY'),
                                    transaction_desc: trans[x].transaction_desc,
                                    transaction_withdrawls: trans[x].transaction_withdrawls,
                                    transaction_deposits: trans[x].transaction_deposits,
                                    transaction_balance: trans[x].transaction_balance,
                                    transaction_category: trans[x].transaction_category,
                                    transaction_comments: trans[x].transaction_comments,
                                    transaction_updated: moment(trans[x].transaction_updated).format("dddd, MMMM Do YYYY, h:mm:ss a"),
                                    transaction_updateuser: trans[x].transaction_updateuser
                                }
                                bigTable.push(pushD)
                            }
                        }
                    }

                    // GroupBy ~~!
                    const groupBy = key => array =>
                        array.reduce((objectsByKeyValue, obj) => {
                            const value = obj[key];
                            objectsByKeyValue[value] = (objectsByKeyValue[value] || []).concat(obj);
                            return objectsByKeyValue;
                        }, {});
                    const groupByBrand = groupBy('statement_serial');
                    
                    // console.log(JSON.stringify(groupByBrand(bigTable)));
                    // console.log(bigTable[0]);

                    // Group and SUM by Depo Withd Balance
                    
                    //console.log(statementPayLoad.rows[0]);
                    //console.log(transactionPayLoad.rows[0]);

                    res.send({ pageMesage: pageMesage, pageGood: true, bigTable: groupByBrand(bigTable) });
                }
            } catch (err) {
                let pageMesage = "Failed to loaded Transaction: " + err;
                danzillaDB.pool.end;
                console.log(pageMesage);
                res.send({ pageMesage: pageMesage, pageGood: false });
            }
        }
        // View all async actions - data
        viewLoad(); 
    }
} 
 