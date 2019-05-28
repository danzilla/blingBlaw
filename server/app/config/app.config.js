// App global config
const app = {
    appName: "blingBlaw",
    appVer: "3.0.1",
    appPort: "5000",
    appAuthor: "danzilla",
    appDesc: "REST-API",
    appGit: "https://github.com/danzilla/blingBlaw"
}
// App Database_Name config
const appDB = {
    dbName_assets: "blingblaw_assets",
    dbName_fannyPack: "blingblaw_fannypacks",
    danustan: "danustanDB"
}

// Default postgres_DB connection
const defaultDB = {
    dbUser: "danzilla",
    dbPwd: "1035621",
    defaultDB: "postgres",
    dbPort: "6543",
    dbHost: "localhost"
}

module.exports.app = app;
module.exports.appDB = appDB;
module.exports.defaultDB = defaultDB;
