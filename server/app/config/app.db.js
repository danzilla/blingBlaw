// Global Database config
const appDB = require('./app.config');

// App - Bling Blaw - Assets - Database
const blingBlaw = {
    host: appDB.defaultDB.dbHost,
    user: appDB.defaultDB.dbUser,
    password: appDB.defaultDB.dbPwd,
    port: appDB.defaultDB.dbPort,
    database: appDB.appDB.dbName_assets
}
// App - Bling Blaw - fannyPack - Database
const fannyPack = {
    host: appDB.defaultDB.dbHost,
    user: appDB.defaultDB.dbUser,
    password: appDB.defaultDB.dbPwd,
    port: appDB.defaultDB.dbPort,
    database: appDB.appDB.dbName_fannyPack
}
// Default DB
// Postgres - Default Connection info
const postgres = {
    host: appDB.defaultDB.dbHost,
    user: appDB.defaultDB.dbUser,
    password: appDB.defaultDB.dbPwd,
    port: appDB.defaultDB.dbPort,
    database: appDB.defaultDB.defaultDB
}

// Home - Danzilla
const Home = {
    host: appDB.defaultDB.dbHost,
    user: appDB.defaultDB.dbUser,
    password: appDB.defaultDB.dbPwd,
    port: appDB.defaultDB.dbPort,
    database: appDB.defaultDB.danustan
}

module.exports.Home = Home;
module.exports.blingBlaw = blingBlaw;
module.exports.fannyPack = fannyPack;
module.exports.postgres = postgres;