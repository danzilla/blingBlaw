'strict'
const { blingblaw, postgresDefault, database_labels } = require('../../app.config');
// Account_Type Actions

const CREATE_TABLE_ACCOUNT_TYPE = function (fannyID) {
    return new Promise((resolve, reject) => {
        // Statement
        let statement = `CREATE TABLE IF NOT EXISTS 
        fannypack_${fannyID}.${database_labels.table_fannyPack_type}
        (
            account_type_id SERIAL PRIMARY KEY UNIQUE NOT NULL,
            account_type_name VARCHAR(254) UNIQUE NOT NULL,
            account_type_created TIMESTAMP,
            account_type_lastmodify TIMESTAMP
        );`;
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

const ADD_NEW_ACCOUNT_TYPE_to_TABLE_ACCOUNT_TYPE = function (fannyID, accountTypeName, accounTypeCreated, accounTypeLastModify) {
    return new Promise((resolve, reject) => {
        // Statement
        let statement = `INSERT INTO fannypack_${fannyID}.${database_labels.table_fannyPack_type}
            (account_type_name, account_type_created, account_type_lastmodify)
            VALUES ('${accountTypeName}', '${accounTypeCreated}', '${accounTypeLastModify}');`;
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

const VIEW_ALL_ACCOUNT_TYPE = function (fannyID) {
    return new Promise((resolve, reject) => {
        // Statement
        let statement = `SELECT * FROM fannypack_${fannyID}.${database_labels.table_fannyPack_type};`;
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

const ACCOUNT_TYPE = {
    CREATE_TABLE_ACCOUNT_TYPE: CREATE_TABLE_ACCOUNT_TYPE,
    ADD_NEW_ACCOUNT_TYPE_to_TABLE_ACCOUNT_TYPE: ADD_NEW_ACCOUNT_TYPE_to_TABLE_ACCOUNT_TYPE,
    VIEW_ALL_ACCOUNT_TYPE: VIEW_ALL_ACCOUNT_TYPE
}
module.exports = ACCOUNT_TYPE;