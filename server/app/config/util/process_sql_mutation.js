// Process query mutatation - Blingblaw Only
const { blingblaw, postgresDefault } = require('../app.config');
// Using - mutate_sql_blingblaw ('blingBlaw')
// Export - mutate_sql(callback, sql_statement, payLoad, Results)
function mutate_sql_blingblaw(callback, sql_statement, payLoad, Results) {
    // PageMessage
    let pageMessage = { title:"Query_sql", message: "", checked: "", result: "" };
    // Using default Database "blingblaw"
    blingblaw.connect(function(err, client, release){
        if(err) {
            if (err.code == "3D000"){
                pageMessage.title = sql_statement.title;
                pageMessage.checked = err.code;
                pageMessage.result = err.stack;
                pageMessage.message = "Database not initialize";
            } else if (err.code == "42P01"){
                pageMessage.title = sql_statement.title;
                pageMessage.checked = err.code;
                pageMessage.result = err.stack;
                pageMessage.message = "No Tables exists or Messy database";
            } else {
                pageMessage.title = sql_statement.title;
                pageMessage.checked = err.code;
                pageMessage.result = err.stack;
                pageMessage.message = "Error connecting to client"; 
            }
            release();
            Results.push(pageMessage);
            callback(null, pageMessage);
        } else if (client) {
            // if ExtraLoad
            if(payLoad.isExtra === true) {
                // ExtraPayLoad_Query 
                function ExtraPayLoad_Query() {
                    let PayLoad_RESULTS = [];
                    let pageMessage = { title:"Extra_payLoad_sql", message: "", checked: "", result: "" };
                    // Return query result to Promise 
                    return new Promise((resolve, reject) => {
                        payLoad.extraPayLoad.forEach(result => {
                            client.query(sql_statement.sql(payLoad), result, function (clientErr1, clientResult2) {
                                // If no errors and Results == Good
                                if (clientResult2) {    
                                    pageMessage.checked = "checked";
                                    pageMessage.result = clientResult2;
                                    pageMessage.message = "Query good!";
                                } else if (clientErr1) { // if any errors
                                    pageMessage.checked = clientErr1.code;
                                    pageMessage.result = clientErr1.stack;
                                    pageMessage.message = "Error executing query";
                                }
                            })
                            PayLoad_RESULTS.push(pageMessage);
                            resolve(PayLoad_RESULTS);
                        });
                    })
                }
                // set Async - payload
                async function upload() {
                    try {
                        pageMessage.checked = "checked";
                        pageMessage.result =  await ExtraPayLoad_Query();
                        pageMessage.message = "Query good!";
                    } catch (err) {
                        pageMessage.checked = err.code;
                        pageMessage.result =  err.stack;
                        pageMessage.message = err;
                    }
                    release();
                    Results.push(pageMessage);
                    callback(null, pageMessage);
                } 
                upload(); // Trigger
            } else if(!payLoad.extraPayLoad) {
                // TO DO 
                // Rebuild - Mutations 
                // Connect to DB using default Database 
                client.query(sql_statement.sql(payLoad), function (clientErr, clientResult) {
                    // If no errors and Results == Good
                    pageMessage.title = sql_statement.title + ` vanilla_payLoad_sql`;
                    if (!clientErr && clientResult) {
                        pageMessage.title = sql_statement.title;
                        pageMessage.checked = "checked";
                        pageMessage.result = clientResult;
                        pageMessage.message = "Query good!";
                    } else if (clientErr) { // if any errors
                        pageMessage.title = sql_statement.title;
                        pageMessage.checked = clientErr.code;
                        pageMessage.result = clientErr.stack;
                        pageMessage.message = "Error executing query";
                    }
                    release();
                    Results.push(pageMessage);
                    callback(null, pageMessage);
                });
            }
        }
    });
};
// Export 
const mutate_sql = { using_blingblaw: mutate_sql_blingblaw }
module.exports = mutate_sql;