// App - BlingBlaw - Danzilla
const express = require('express');
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// Dev - logs
const logger = require('morgan');
app.use(logger('dev'));
app.locals.pretty = true;
// Cors - Cross-Origin Resource Sharing
const cors = require('cors');
app.use(cors());
// BodyParser - req.body and Strip to JSON
const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));



//
// GraphQL 
// Data driven - #Eeeeee

const { postgraphile } = require("postgraphile");
// app_db_connection
const app_config = require("./src/config/app.config");
// postgres://user:pass@host:5432/dbname
const app_db_connection = `postgres://${app_config.blingblaw.options.user}:${app_config.blingblaw.options.password}@${app_config.blingblaw.options.host}:${app_config.blingblaw.options.port}/${app_config.blingblaw.options.database}`;
const app_postgraphile_setting = {
  watchPg: true,
  graphiql: true,
  enhanceGraphiql: true
}

console.log("asdsadda" + JSON.stringify(app_db_connection));

app.use(postgraphile(app_db_connection, "public", app_postgraphile_setting));
console.log(process.env.npm_package_name  + '- Running a GraphQL API server at localhost:5000/graphql');
// End of GraphQL



//
// REST
//
// FirstRun
const firstrun = require('./src/router/firstrun');
app.use('/firstrun', firstrun);
// User
const user = require('./src/router/user');
app.use('/user', user);
// FannyPack
const fannyPack = require('./src/router/fannyPack');
app.use('/fannypack', fannyPack);
// Account
const account = require('./src/router/account');
app.use('/account', account);
// End of REST Router
// Anything else 
app.all('*', function(req, res){ res.send('#bling', 404); });
// Export Blazzze
module.exports = app;
