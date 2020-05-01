'strict'
const { blingblaw, postgresDefault, database_labels } = require('../../app.config');
// Account_Category Actions

const CREATE_TABLE_CATEGORY = function (fannyID) {
    return new Promise((resolve, reject) => {
        let statement = `CREATE TABLE IF NOT EXISTS fannypack_${fannyID}.${database_labels.table_fannyPack_category}
            (
                category_id VARCHAR(254) UNIQUE NOT NULL,
                category_name VARCHAR(254) UNIQUE NOT NULL,
                category_parent VARCHAR(36) NOT NULL,
                category_created TIMESTAMP,
                category_lastmodify TIMESTAMP
            );`
        blingblaw.connect(function (error, client, release) {
            if (error) {
                reject(error);
            } else if (client) {
                client.query(statement)
                    .then(data => { resolve(data); })
                    .catch(error => { console.log(JSON.stringify(error)); reject(error); })
                    .finally(() => { release(); client.end(); })
            }
        });
    });
};

const ADD_NEW_CATEGORY_to_TABLE_CATEGORY = function (fannyID, accountTypeName, accounTypeCreated, accounTypeLastModify) {
    return new Promise((resolve, reject) => {
        // Statement
        let statement = `INSERT INTO fannypack_${fannyID}.${database_labels.table_fannyPack_category} 
        (category_id, category_name, category_parent, category_created, category_lastmodify) 
        VALUES ('$1', '$2', '$3', '$4', '$5') RETURNING *;`;
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

const VIEW_ALL_CATEGORY = function (fannyID) {
    return new Promise((resolve, reject) => {
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
    CREATE_TABLE_CATEGORY: CREATE_TABLE_CATEGORY,
    ADD_NEW_CATEGORY_to_TABLE_CATEGORY: ADD_NEW_CATEGORY_to_TABLE_CATEGORY,
    VIEW_ALL_CATEGORY: VIEW_ALL_CATEGORY
}
module.exports = CATEGORY;