import axios from 'axios';

const API = "";


// Authentication
export async function fetch_login(user) {
    return await axios.post("http://localhost:5000/user/login", { userSerial: user })
        .then((data) => { return data.data })
        .catch((err) => { return err; })
}
export async function fetch_register(user) {
    return await axios.post("http://localhost:5000/user/add", { userSerial: user })
        .then((data) => { return data.data })
        .catch((err) => { return err; })
}
export async function fetch_initalRun(user) {
    return await axios.post("http://localhost:5000/firstrun", { userSerial: user })
        .then((data) => { return data.data })
        .catch((err) => { return err; })
}

// User
export async function fetch_user_info(user) {
    return await axios.post("http://localhost:5000/user/view", { userSerial: user })
        .then((data) => { return data.data })
        .catch((err) => { return err; })
}
export async function fetch_user_view_all(user) {
    return await axios.post("http://localhost:5000/user/view/all", { userSerial: user })
        .then((data) => { return data.data })
        .catch((err) => { return err; })
}
export async function fetch_user_add(user) {
    return await axios.post("http://localhost:5000/user/add", { userSerial: user })
        .then((data) => { return data.data })
        .catch((err) => { return err; })
}

// FannyPack
export async function fetch_fannyPack_info(user) {
    return await axios.post("http://localhost:5000/fannypack/view", { userSerial: user })
        .then((data) => { return data.data; })
        .catch((err) => { return err; })
}
export async function fetch_fannyPack_view_all(user) {
    return await axios.post("http://localhost:5000/fannypack/view/all", { userSerial: user })
        .then((data) => { return data.data; })
        .catch((err) => { return err; })
}
export async function fetch_fannyPack_add(user) {
    return await axios.post("http://localhost:5000/fannypack/add", { userSerial: user })
        .then((data) => { return data.data; })
        .catch((err) => { return err; })
}

// Accounts
export async function fetch_fanny_account_info(sessionID, fannyID) {
    return await axios.all([
        axios.post("http://localhost:5000/account/view", { fannyPack: fannyID }),
        axios.post("http://localhost:5000/account/type/view", { fannyPack: fannyID }),
        axios.post("http://localhost:5000/account/category/view", { fannyPack: fannyID })
    ])
        .then(axios.spread((fannyAccounts, fannyType, fannyCategory) => { return { fannyAccounts, fannyType, fannyCategory }; }))
        .catch((err) => { return err; });
}
export async function fetch_account_add(sessionID) {
    return await axios.post("http://localhost:5000/account/add", { userSerial: sessionID })
        .then((data) => { return data.data; })
        .catch((err) => { return err; })
}
export async function fetch_account_type_add(sessionID) {
    return await axios.post("http://localhost:5000/account/add", { userSerial: sessionID })
        .then((data) => { return data.data; })
        .catch((err) => { return err; })
}
export async function fetch_account_category_add(sessionID) {
    return await axios.post("http://localhost:5000/account/add", { userSerial: sessionID })
        .then((data) => { return data.data; })
        .catch((err) => { return err; })
}