# BlingBlaw - API :heartbeat: :sparkles: :fire:

### Express - REST
- http://localhost:5000

### Launch server :fire: 
- npm start
- http://localhost:5000

# Database - Design
Revised 
 - <s>May 26, 2019</s>
 - <s>June 27, 2019</s>
 - July 02, 2019

```
database_Name - blingblaw_assets
│
└───Schema - users_assets
|   │   Table - user_auth - user_id
|   │   Table - user_details - user_id
│   │   Table - fannypacks - fannypacks_id
└───Schema - fannypack_userID_fannypacks_serial
|   │   Table - account_category - account_category_id
│   │   Table - account_type - account_type_id
│   │   Table - account_record - account_id
│   │   Table - account_One - account_id
|   |
- User - Contains FannyPacks
- FannyPacks - Contains Account, Account Types and category
- accounts - Contains Account Statemetn information
```
# Feature - ADD

#### Create - FirstRun
- Requirement
    - > No-input require
- Create Database
    - create blingBlaw
- Create Schema
    - create users_assets
- Create Table
    - create users_assets.user_auth_table
    - create users_assets.user_details_table
    - create users_assets.fannypacks_table

#### Create - User
- Requirement
    - > User, Password, fannyPackName
- userAdd
    - Add user to users_assets.user_auth_table
    - Add user to users_assets.user_details_table
- Create - FannyPacks

#### Create - FannyPack
- Requirement
    - > fannyPackName
- Create Schema
    - create fannypack_userID_fannypacks_serial
- Create Table
    - create fannypack_userID_fannypacks_serial.account_types_table
    - create fannypack_userID_fannypacks_serial.account_category_table
    - create fannypack_userID_fannypacks_serial.account_record_table
- Add
    - Add FannyPack_info to users_assets.fannypacks_table
    - Add SampleAccountType to fannypack_userID_fannypacks_serial.account_types_table
    - Add SampleCategory to fannypack_userID_fannypacks_serial.account_category_table


#### Create - Account
- Requirement
    - > account_type, account_info, dates
- Create Table 
    - create fannypack_userID_fannypacks_serial.account_UNO_SERIAL_table
- Add
    - Add account_UNO_SERIAL to fannypack_userID_fannypacks_serial.account_record_table


#### Add - account_Type
- Requirement
    - > account_type_name
- Add
    - Add account_Type to fannypack_userID_fannypacks_serial.account_types_table

#### Add - account_Category
- Requirement
    - > CatName
- Add
    - Add CatName to fannypack_userID_fannypacks_serial.account_category_table

#### Add - account_Statemet
- Requirement
    - > AccountActivity.csv, dates
- Add
    - Add AccountActivity to fannypack_userID_fannypacks_serial.account_UNO_SERIAL_table
    - Add lastModify to fannypack_userID_fannypacks_serial.account_record_table
