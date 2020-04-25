'strict'
const { blingblaw, postgresDefault, database_labels } = require('../../app.config');
// FannyPack Actions

const CREATE_TABLE_FANNYPACK = function (fannyID) {
    return new Promise((resolve, reject) => {
        // Statement
        let statement = `CREATE TABLE IF NOT EXISTS ${database_labels.schema_name}.${database_labels.table_users_fannyPack}
            (
                fannyPack_serial VARCHAR(36) UNIQUE NOT NULL,
                fannyPack_name VARCHAR(254),
                fannyPack_created TIMESTAMP,
                fannyPack_lastmodify TIMESTAMP,
                fannyPack_lastUpdated TIMESTAMP,
                fannyPack_owner_serial VARCHAR(36) NOT NULL
            );`
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

const CREATE_SCHEMA_USER_FANNYPACK = function (fannyID) {
    return new Promise((resolve, reject) => {
        // Statement
        let statement = `CREATE SCHEMA IF NOT EXISTS fannyPack_${fannyID} 
              AUTHORIZATION ${blingblaw.user};`;
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

const ADD_NEW_FANNYPACK_to_TABLE_FANNYPACK = function (fannyID, accountTypeName, accounTypeCreated, accounTypeLastModify) {
    return new Promise((resolve, reject) => {
        // Statement
        let statement = `INSERT INTO ${database_labels.schema_name}.${database_labels.table_users_fannyPack} 
          (fannyPack_serial, fannyPack_name, fannyPack_created, fannyPack_lastUpdated, fannyPack_owner_serial) 
          VALUES ('${fannyID}', '${fannyPackName}', '${fannyPackCreated}', '${fannyPackLastUpdated}', '${fannyPackOwnerSerial}');`;
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

const VIEW_USER_FANNYPACK = function (userId) {
    return new Promise((resolve, reject) => {
        // Statement
        let statement = `SELECT * FROM ${database_labels.schema_name}.${database_labels.table_users_fannyPack} 
            WHERE fannyPack_owner_serial='${userId}';`;
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

const VIEW_ALL_FANNYPACK = function (fannyID) {
    return new Promise((resolve, reject) => {
        // Statement
        let statement = `SELECT * FROM ${database_labels.schema_name}.${database_labels.table_users_fannyPack};`;
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

const FANNYPACK = {
    CREATE_TABLE_FANNYPACK: CREATE_TABLE_FANNYPACK,
    CREATE_SCHEMA_USER_FANNYPACK: CREATE_SCHEMA_USER_FANNYPACK,
    ADD_NEW_FANNYPACK_to_TABLE_FANNYPACK: ADD_NEW_FANNYPACK_to_TABLE_FANNYPACK,
    VIEW_USER_FANNYPACK: VIEW_USER_FANNYPACK,
    VIEW_ALL_FANNYPACK: VIEW_ALL_FANNYPACK
}
module.exports = FANNYPACK;