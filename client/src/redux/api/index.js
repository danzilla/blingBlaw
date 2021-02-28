import axios from 'axios';
const API = "http://localhost:5000/api";

// Authentication
export async function fetch_login(user) {
    return await axios.post(`${API}/user/login`, { userSerial: user })
        .then((data) => { return data.data })
        .catch((err) => { return err; })
}
export async function fetch_initalRun(user) {
    return await axios.post(`${API}/user/install`, { userSerial: user })
        .then((data) => { return data.data })
        .catch((err) => { return err; })
}


// User
export async function fetch_user_add(user) {
    return await axios.post(`${API}/user/add`, { userSerial: user })
        .then((data) => { return data.data })
        .catch((err) => { return err; })
}
export async function fetch_user_info(user) {
    return await axios.post(`${API}/user/view`, { user: user })
        .then((data) => { return data.data })
        .catch((err) => { return err; })
}
export async function fetch_user_view_all(user) {
    return await axios.post(`${API}/user/view/all`, { userSerial: user })
        .then((data) => { return data.data })
        .catch((err) => { return err; })
}


// FannyPack
export async function fetch_fannyPack_info(user) {
    return await axios.post(`${API}/fannypack/view`, { user: user })
        .then((data) => { return data.data; })
        .catch((err) => { return err; })
}
export async function fetch_fannyPack_view_all(user) {
    return await axios.post(`${API}/fannypack/view/all`, { user: user })
        .then((data) => { return data.data; })
        .catch((err) => { return err; })
}


// Accounts 
export async function fetch_fanny_account_info(fannyID) {
    return await axios.all([
        axios.post(`${API}/account/view`, { fannyID: fannyID }),
        axios.post(`${API}/account/type/view`, { fannyID: fannyID }),
        axios.post(`${API}/account/category/view`, { fannyID: fannyID })
    ])
        .then(axios.spread((fannyAccounts, fannyType, fannyCategory) => { return { fannyAccounts, fannyType, fannyCategory }; }))
        .catch((err) => { return err; })
}


// Add
export async function fetch_fannyPack_add(user, fannyPack) {
    return await axios.post(`${API}/fannypack/add`, { user: user, fannyPack: fannyPack })
        .then((data) => { return data.data; })
        .catch((err) => { return err; })
}
export async function fetch_account_add(sessionID, fannyID, accountName, accountType) {
    return await axios.post(`${API}/account/add`, { sessionID: sessionID, fannyID: fannyID, accountName: accountName, accountType: accountType })
        .then((data) => { return data.data; })
        .catch((err) => { return err; })
}
export async function fetch_account_type_add(fannyID, accountTypeName) {
    return await axios.post(`${API}/account/type/add`, { fannyID: fannyID, accountTypeName: accountTypeName })
        .then((data) => { return data.data; })
        .catch((err) => { return err; })
}
export async function fetch_account_category_add(sessionID) {
    return await axios.post(`${API}/account/category/add`, { userSerial: sessionID })
        .then((data) => { return data.data; })
        .catch((err) => { return err; })
}