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

// Note: 
// - Database - blingblawDB
// - retryOnInitFail - Retry-till - blingblawDB initialize
const { postgraphile } = require("postgraphile");
// app_db_connection
const app_config = require("./config/app.config");
// postgres://user:pass@host:5432/dbname
const app_db_connection = `postgres://${app_config.blingblaw.options.user}:${app_config.blingblaw.options.password}@${app_config.blingblaw.options.host}:${app_config.blingblaw.options.port}/${app_config.database_connection.blingblawDB}`;
const app_postgraphile_setting = {
  watchPg: true,
  graphiql: true,
  enhanceGraphiql: true,
  graphqlRoute: "/graphql",
  graphiqlRoute: "/graphiql",
  retryOnInitFail: true
}
app.use(postgraphile(app_db_connection, "public", app_postgraphile_setting));
// End of GraphQL

//
// REST
const api = require('./api')
app.use('/api', api);
// Anything else 
app.all('*', function(req, res){ res.send('#bling', 404); });
// End of REST

// Export Blazzze
module.exports = app;
