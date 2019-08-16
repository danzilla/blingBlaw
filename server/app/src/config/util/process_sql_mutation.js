// Process query mutatation 
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
            Results.push(pageMessage);
            release();
            callback(null, pageMessage);
        } else if (client){
            // Connect to DB using default Database 
            client.query(sql_statement.sql(payLoad), function (clientErr, clientResult) {
                 // If no errors and Results == Good
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
                Results.push(pageMessage);
                release();
                callback(null, pageMessage);
            });
        }
    });
};
// Export 
const mutate_sql = {
    using_blingblaw: mutate_sql_blingblaw
}
module.exports = mutate_sql;