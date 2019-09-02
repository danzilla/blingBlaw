// Constants - Types
/* 
 * Display_Containers - Why not react-router? but react-hook?
    - Features_Container
        - Authentication
            - Login
            - Register
            - FirstRun
            - Logout
        - Dashboard
            - Dashboard_Containers
            - Users
            - FannyPacks
            - Accounts_Containers
            - Accounts_Types
            - Accounts_Category
            - Accounts_Records
            - Accounts_transaction
 */
// Container_Utils
export const DISPLAY_CONTAINER_PENDING = 'DISPLAY_CONTAINER_PENDING';
export const DISPLAY_CONTAINER_SUCCEEDED = 'DISPLAY_CONTAINER_SUCCEEDED';
export const DISPLAY_CONTAINER_FAILED = 'DISPLAY_CONTAINER_FAILED';
export const DISPLAY_CONTAINER_IDLE = 'DISPLAY_CONTAINER_IDLE';
// Authentication_Containers
export const DISPLAY_CONTAINER_LOGIN = 'DISPLAY_CONTAINER_LOGIN';
export const DISPLAY_CONTAINER_REGISTER = 'DISPLAY_CONTAINER_REGISTER';
export const DISPLAY_CONTAINER_FIRSTRUN = 'DISPLAY_CONTAINER_FIRSTRUN';
export const DISPLAY_CONTAINER_LOGOUT = 'DISPLAY_CONTAINER_LOGOUT';
export const DISPLAY_CONTAINER_404 = 'DISPLAY_CONTAINER_404';
// Dashboard_Containers
export const DISPLAY_CONTAINER_DASHBOARD = 'DISPLAY_CONTAINER_DASHBOARD';
export const DISPLAY_CONTAINER_USERS = 'DISPLAY_CONTAINER_USERS';
export const DISPLAY_CONTAINER_FANNYPACKZ = 'DISPLAY_CONTAINER_FANNYPACKZ';
export const DISPLAY_CONTAINER_ACCOUNTS = 'DISPLAY_CONTAINER_ACCOUNTS';
export const DISPLAY_CONTAINER_ACCOUNTS_TYPE = 'DISPLAY_CONTAINER_ACCOUNTS_TYPE';
export const DISPLAY_CONTAINER_ACCOUNTS_CATEGORY = 'DISPLAY_CONTAINER_ACCOUNTS_CATEGORY';
export const DISPLAY_CONTAINER_ACCOUNTS_RECORD = 'DISPLAY_CONTAINER_ACCOUNTS_RECORDS';
export const DISPLAY_CONTAINER_ACCOUNTS_TRANSACTIONS = 'DISPLAY_CONTAINER_ACCOUNTS_TRANSACTIONS';
/*
 * CRUD and Axios - Actions
 */
// CREATE
export const CREATE_RESOURCES_PENDING = 'CREATE_RESOURCES_PENDING';
export const CREATE_RESOURCES_FAILED = 'CREATE_RESOURCES_FAILED';
export const CREATE_RESOURCES_SUCCEEDED = 'CREATE_RESOURCES_SUCCEEDED';
export const CREATE_RESOURCES_IDLE = 'CREATE_RESOURCES_IDLE';
// READ
export const READ_RESOURCES_PENDING = 'READ_RESOURCES_PENDING';
export const READ_RESOURCES_FAILED = 'READ_RESOURCES_FAILED';
export const READ_RESOURCES_SUCCEEDED = 'READ_RESOURCES_SUCCEEDED';
export const READ_RESOURCES_IDLE = 'READ_RESOURCES_IDLE';
// UPDATE
export const UPDATE_RESOURCES_PENDING = 'UPDATE_RESOURCES_PENDING';
export const UPDATE_RESOURCES_FAILED = 'UPDATE_RESOURCES_FAILED';
export const UPDATE_RESOURCES_SUCCEEDED = 'UPDATE_RESOURCES_SUCCEEDED';
export const UPDATE_RESOURCES_IDLE = 'UPDATE_RESOURCES_IDLE';
// DELETE
export const DELETE_RESOURCES_PENDING = 'DELETE_RESOURCES_PENDING';
export const DELETE_RESOURCES_FAILED = 'DELETE_RESOURCES_FAILED';
export const DELETE_RESOURCES_SUCCEEDED = 'DELETE_RESOURCES_SUCCEEDED';
export const DELETE_RESOURCES_IDLE = 'DELETE_RESOURCES_IDLE';