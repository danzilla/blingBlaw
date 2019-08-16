// Process query
const { blingblaw, postgresDefault } = require('../app.config');
// Using - process_sql_blingblaw ('blingBlaw')
// Export - process_sql(callback, sql_statement, Results)
function process_sql_blingblaw(callback, sql_statement, Results) {
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
            Results.push(pageMessage);
            release();
            callback(null, pageMessage);
        } else if (client){
            // Connect to DB using default Database 
            client.query(sql_statement.sql, function (clientErr, clientResult) {
                if (!clientErr && clientResult) { // If no errors and Results == Good
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
                Results.push(pageMessage);
                release();
                callback(null, pageMessage);
            });
        }
    });
};

// Process SQL using - postgresDefault ('public')
// Export - process_sql(callback, sql_statement, Results)
function process_sql_postgresDefault(callback, sql_statement, Results) {
    // PageMessage
    let pageMessage = { title:"Query_sql", message: "", checked: "", result: "" };
    // Using default Database "public"
    postgresDefault.connect(function(err, client, release){
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
            Results.push(pageMessage);
            release();
            callback(null, pageMessage);
        } else if (client){
            // Connect to DB using default Database 
            client.query(sql_statement.sql, function (clientErr, clientResult) {
                if (!clientErr && clientResult) { // If no errors and Results == Good
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
                Results.push(pageMessage);
                release();
                callback(null, pageMessage);
            });
        }
    });
};
// Export 
const process_sql = {
    using_blingblaw: process_sql_blingblaw,
    using_postgresDefault: process_sql_postgresDefault
}
module.exports = process_sql;