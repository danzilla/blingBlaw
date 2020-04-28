'strict'
const { blingblaw, postgresDefault, database_labels } = require('../../app.config');
// Account_Record Actions

const CREATE_TABLE_RECORD = function (fannyID) {
    return new Promise((resolve, reject) => {
        // Statement
        let statement = `fannypack_${fannyID}.${database_labels.table_fannyPack_record}
            (
            accounts_id SERIAL PRIMARY KEY UNIQUE NOT NULL,
            account_type_id VARCHAR(36) NOT NULL,
            account_name VARCHAR(36) NOT NULL,
            account_serial VARCHAR(36) NOT NULL,
            account_lastmodify TIMESTAMP,
            account_owner_serial VARCHAR(36) NOT NULL
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

const ADD_NEW_RECORD_to_TABLE_RECORD = function (fannyID, accountOwnerSerial, accountLastmodify, accountSerial, accountName, accountTypeId) {
    return new Promise((resolve, reject) => {

        /* * accountOwnerSerial
        accountLastmodify
        accountSerial
        accountName
        accountTypeId
        */

        // Statement
        let statement = `INSERT INTO fannypack_${fannyID}.${database_labels.table_fannyPack_record}
            (account_type_id, account_name, account_serial, account_lastmodify, account_owner_serial) 
            VALUES ('${accountTypeId}', '${accountName}', '${accountSerial}', '${accountLastmodify}', '${accountOwnerSerial}');`;
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

const VIEW_ALL_RECORD = function (fannyID) {
    return new Promise((resolve, reject) => {
        // Statement
        let statement = `SELECT * FROM fannypack_${fannyID}.${database_labels.table_fannyPack_record};`;
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

const RECORD = {
    CREATE_TABLE_RECORD: CREATE_TABLE_RECORD,
    ADD_NEW_RECORD_to_TABLE_RECORD: ADD_NEW_RECORD_to_TABLE_RECORD,
    VIEW_ALL_RECORD: VIEW_ALL_RECORD
}
module.exports = RECORD;