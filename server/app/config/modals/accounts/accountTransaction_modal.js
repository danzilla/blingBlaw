'strict'
const { blingblaw, postgresDefault, database_labels } = require('../app.config');
// Account_Transaction Actions

const CREATE_TABLE_TRANSACTION = function (fannyID, accountSerial) {
    return new Promise((resolve, reject) => {
        // Statement
        let statement = `CREATE TABLE IF NOT EXISTS
        fannypack_${fannyID}.account_${accountSerial}
        (
            transaction_Id SERIAL PRIMARY KEY NOT NULL UNIQUE,
            transaction_serial VARCHAR(36) NOT NULL UNIQUE,
            transaction_Date DATE NOT NULL,
            transaction_Desc VARCHAR(254) NOT NULL,
            transaction_Withdrawls NUMERIC(15,6),
            transaction_Deposits NUMERIC(15,6),
            transaction_Balance NUMERIC(15,6),
            transaction_Category TEXT[],
            transaction_Comments VARCHAR(254),
            transaction_Updated TEXT[],
            transaction_UpdateUser VARCHAR(254)
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

const ADD_NEW_TRANSACTION_to_TABLE_TRANSACTION = function (fannyID, accountID, data) {
    return new Promise((resolve, reject) => {
        // Statement
        let statement = `INSERT INTO fannypack_${fannyID}.account_${accountID} (transaction_serial, transaction_Date, transaction_Desc, transaction_Withdrawls, transaction_Deposits, transaction_Balance, transaction_Category, transaction_Comments, transaction_Updated, transaction_UpdateUser) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING *`;
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

const VIEW_ALL_TRANSACTION = function (fannyID) {
    return new Promise((resolve, reject) => {
        // Statement
        let statement = `SELECT * FROM fannypack_${fannyID}.account_${accountSerial};`;
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

const TRANSACTION = {
    CREATE_TABLE_TRANSACTION: CREATE_TABLE_TRANSACTION,
    ADD_NEW_TRANSACTION_to_TABLE_TRANSACTION: ADD_NEW_TRANSACTION_to_TABLE_TRANSACTION,
    VIEW_ALL_TRANSACTION: VIEW_ALL_TRANSACTION
}
module.exports = TRANSACTION;