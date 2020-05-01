'strict'
const { blingblaw, postgresDefault, database_labels } = require('../../app.config');
const { CREATE_TABLE_FANNYPACK } = require('../fannyPack/fannyPack_modal');
const { CREATE_TABLE_USER_AUTH, CREATE_TABLE_USER_DETAILS } = require('../user/user_modal');
// Intial_Run Actions
const Intial_Run = function () {
    return new Promise((resolve, reject) => {
        const RESPONSE = {
            Title: null,
            status: null,
            message: null,
            data: null
        }
        // Statements
        let statement_is_db = `SELECT 1 from pg_database WHERE datname='${database_labels.db_name}';`;
        let statement_create_db = `CREATE DATABASE ${database_labels.db_name};`;
        let statement_create_schema = `CREATE SCHEMA IF NOT EXISTS ${database_labels.schema_name} AUTHORIZATION ${blingblaw.options.user};`;
        // Fetch with promise
        function check_db(statement) {
            return new Promise((resolve) => {
                postgresDefault.connect(function (error, client, release) {
                    if (error) {
                        reject(error);
                    } else if (client) {
                        client.query(statement)
                            .then(data => { resolve(data); })
                            .catch(error => { resolve(error); })
                            .finally(() => { release(); client.end(); })
                    }
                });
            });
        }
        function create_app_db(statement) {
            return new Promise((resolve) => {
                postgresDefault.connect(function (error, client, release) {
                    if (error) {
                        reject(error);
                    } else if (client) {
                        client.query(statement)
                            .then(data => { resolve(data); })
                            .catch(error => { resolve(error); })
                            .finally(() => { release(); client.end(); })
                    }
                });
            });
        }
        function create_app_schema(statement) {
            return new Promise((resolve) => {
                blingblaw.connect(function (error, client, release) {
                    if (error) {
                        reject(error);
                    } else if (client) {
                        client.query(statement)
                            .then(data => { resolve(data); })
                            .catch(error => { resolve(error); })
                            .finally(() => { release(); client.end(); })
                    }
                });
            });
        }
        async function Fire() {
            const Result = new Object(RESPONSE);
            Result.Title = "Intial_run - Query";
            Result.data = { is_db: "", create_db: "", create_schema: "", table_auth: "", table_details: "", table_fanny: "" };
            try {
                // Check Databs_is
                Result.data.is_db = await check_db(statement_is_db);
                if (Result.data.is_db.rowCount == 0) {
                    // If good, Create_Db
                    Result.data.create_db = await create_app_db(statement_create_db);
                    if (Result.data.create_db.code == "42P04") {
                        Result.message = "Duplicate database exits!";
                        Result.status = false;
                    } else if (Result.data.create_db.command == "CREATE") {
                        // If good, Create_schema
                        Result.data.create_schema = await create_app_schema(statement_create_schema);
                        if (Result.data.create_schema.command == "CREATE") {
                            const [a, b, c] = await Promise.all(
                                [CREATE_TABLE_USER_AUTH(), CREATE_TABLE_USER_DETAILS(), CREATE_TABLE_FANNYPACK()]
                            );
                            Result.data.table_auth = a;
                            Result.data.table_details = b;
                            Result.data.table_fanny = c;
                            Result.message = "App initialized successfully!";
                            Result.status = true;
                        } else {
                            Result.message = `Schema with similar modal Exits!`;
                            Result.status = false;
                        }
                    } else {
                        Result.message = `Databse not initialized!`;
                        Result.status = false;
                    }
                } else {
                    Result.message = `Databse with similar name Exits!`;
                    Result.status = false;
                }
                resolve(Result);
            } catch (error) {
                Result.message = `Error`;
                Result.status = false;
                Result.data = error;
                reject(error);
            } finally { console.log("Finally \n" + JSON.stringify(Result)); }
        } Fire();
    });
};
module.exports = { Intial_Run: Intial_Run };