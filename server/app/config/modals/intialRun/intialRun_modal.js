'strict'
const { blingblaw, postgresDefault, database_labels } = require('../../app.config');
// Account_Category Actions

const INTIAL_RUN = function () {
    return new Promise((resolve, reject) => {

        let kill_connection = `SELECT *, pg_terminate_backend(pid) FROM pg_stat_activity WHERE pid <> pg_backend_pid() AND datname=${database_labels.db_name};`
        let drop_app_db = `DROP DATABASE ${database_labels.db_name};`
        let create_app_db = `CREATE DATABASE ${database_labels.db_name};`
        let create_app_schema = `CREATE SCHEMA IF NOT EXISTS ${database_labels.schema_name} AUTHORIZATION ${blingblaw.user};`

        // Statement
        let statement = `SELECT * FROM fannypack_${fannyID}.${database_labels.table_fannyPack_category};`;
        blingblaw.connect(function (error, client, release) {
            if (error) {
                reject(error);
            } else if (client) {
                client.query(statement)
                    .then(data => {
                        resolve(data);
                    }).catch(error => {
                        release();
                        reject(error);
                    }).finally(() => {
                        client.end();
                    })
            }
        });
    });
};

const CATEGORY = {
    INTIAL_RUN: INTIAL_RUN
}
module.exports = CATEGORY;