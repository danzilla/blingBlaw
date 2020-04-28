'strict'
const { blingblaw, postgresDefault, database_labels } = require('../../app.config');
// User Actions

const CREATE_TABLE_USER_AUTH = function (fannyID) {
    return new Promise((resolve, reject) => {
        // Statement
        let statement = `CREATE TABLE IF NOT EXISTS
            ${database_labels.schema_name}.${database_labels.table_users_auth}
            (
                user_id SERIAL PRIMARY KEY UNIQUE NOT NULL,
                user_serial VARCHAR(36) UNIQUE NOT NULL,
                user_name VARCHAR(12) UNIQUE NOT NULL,
                user_pwd_salt VARCHAR(254) NOT NULL,
                user_pwd_hash VARCHAR(254) NOT NULL,
                user_auth_token VARCHAR(36)
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

const CREATE_TABLE_USER_DETAILS = function (fannyID) {
    return new Promise((resolve, reject) => {
        // Statement
        let statement = `CREATE TABLE IF NOT EXISTS 
            ${database_labels.schema_name}.${database_labels.table_users_details}
            (
                user_details_id SERIAL PRIMARY KEY UNIQUE NOT NULL,
                user_full_name VARCHAR(254),
                user_email VARCHAR(254),
                user_created TIMESTAMP,
                user_modify TIMESTAMP,
                user_lastLogged TIMESTAMP,
                user_auth_serial VARCHAR(36) UNIQUE NOT NULL
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


const ADD_NEW_USER_to_TABLE_USER_AUTH = function (userData) {
    return new Promise((resolve, reject) => {
        // Statement
        let statement = `INSERT INTO ${database_labels.schema_name}.${database_labels.table_users_auth}
            (user_serial, user_name, user_pwd_salt, user_pwd_hash) 
            VALUES ('${userData.user_serial}', '${userData.user_name}', '${userData.user_pwd_salt}', '${userData.user_pwd_hash}');`;
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

const ADD_NEW_USER_to_TABLE_USER_DETAILS = function (userData) {
    return new Promise((resolve, reject) => {
        // Statement
        let statement = `INSERT INTO ${database_labels.schema_name}.${database_labels.table_users_details}
            (user_created, user_auth_serial) VALUES ('${userData.user_created}', '${userData.user_auth_serial}');`;
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

const VIEW_USER = function (userID) {
    return new Promise((resolve, reject) => {
        // Statement
        let statement = `SELECT 
            user_serial, user_name, user_full_name, user_email, 
            user_created, user_modify, user_lastlogged, user_auth_token
            FROM ${database_labels.schema_name}.${database_labels.table_users_auth} userAuth
            LEFT JOIN ${database_labels.schema_name}.${database_labels.table_users_details} userDetail 
            ON userAuth.user_serial='${userID}' LIMIT 1;`;
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

const VIEW_ALL_USERS = function (userID) {
    return new Promise((resolve, reject) => {
        // Statement
        let statement = `SELECT 
            user_serial, user_name, user_full_name, user_email, 
            user_created, user_modify, user_lastlogged, user_auth_token
            FROM ${database_labels.schema_name}.${database_labels.table_users_auth} userAuth
            LEFT JOIN ${database_labels.schema_name}.${database_labels.table_users_details} userDetail 
            ON userAuth.user_serial = userDetail.user_auth_serial;`;
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


const VALIDATE_USER_LOGIN = function (userName, userPassword) {
    return new Promise((resolve, reject) => {
        // Statement
        let statement = `SELECT 
            user_serial, user_name, user_full_name, user_email, user_lastlogged, user_auth_token
            FROM ${database_labels.schema_name}.${database_labels.table_users_auth} userAuth
            LEFT JOIN ${database_labels.schema_name}.${database_labels.table_users_details} userDetail 
            ON userAuth.user_serial = userDetail.user_auth_serial
            WHERE userAuth.user_name='${userName}' AND userAuth.user_pwd_hash='${userPassword}' LIMIT 1;`;
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

const UPDATE_USER_LOGIN = function (userID, lastLoggedIn) {
    return new Promise((resolve, reject) => {
        // Statement
        let statement = `UPDATE ${database_labels.schema_name}.${database_labels.table_users_details}
        SET user_lastLogged='${lastLoggedIn}' 
        WHERE user_auth_serial='${userID}';`;
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

const USER = {
    CREATE_TABLE_USER_AUTH: CREATE_TABLE_USER_AUTH,
    CREATE_TABLE_USER_DETAILS: CREATE_TABLE_USER_DETAILS,
    ADD_NEW_USER_to_TABLE_USER_AUTH: ADD_NEW_USER_to_TABLE_USER_AUTH,
    ADD_NEW_USER_to_TABLE_USER_DETAILS: ADD_NEW_USER_to_TABLE_USER_DETAILS, 
    VIEW_USER: VIEW_USER, 
    VIEW_ALL_USERS: VIEW_ALL_USERS,
    VALIDATE_USER_LOGIN: VALIDATE_USER_LOGIN,
    UPDATE_USER_LOGIN: UPDATE_USER_LOGIN
}
module.exports = USER;