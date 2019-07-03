// Databases - labels
// App Database configuration - Labels

// App Primary_DB Labels 
const app_PRIMARY_DB_config = {
    db_name: "blingblaw_assets",
    schema_name: "users",
    table_users_auth: "user_auth",
    table_users_details: "user_details",
    table_users_fannyPack: "user_fannyPackz"
}

// Dev environment for docker_compose and npm
// If Docker - SET (PROD)
let db_Host_PROD = "postgres_db";
// If Local - SET (DEV)
let db_Host_Dev = "0.0.0.0";
// Default-Database connection configuration
const db_User = "danzilla";
const db_Pwd = "1035621";
const db_Port = "5432";
const default_DB = "public";
const db_Host = db_Host_Dev;

// Databases settings and configurations
const database = {
    // App - Assets
    blingblaw: {
        user: db_User,
        password: db_Pwd,
        database: app_PRIMARY_DB_config.db_name,
        port: db_Port,
        host: db_Host
    },
    // App - default postgres (public)
    default_postgres_db: {
        user: db_User,
        password: db_Pwd,
        database: default_DB,
        port: db_Port,
        host: db_Host
    }
}

// Export - Labels for Database - Schema - Tables
module.exports.db_config = app_PRIMARY_DB_config;
// Export - Databases settings 
module.exports.blingBlaw = database.blingblaw;
module.exports.postgres = database.default_postgres_db;