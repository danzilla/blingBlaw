# BlingBlaw - API :heartbeat: :sparkles: :fire:

### Express - REST
- http://localhost:5000

### Launch server :fire: 
- npm start
- http://localhost:5000

# Database - Design
Revised 
 - <s>May 26, 2019</s>
 - June 27, 2019
```
database_Name - blingblaw_assets
│
└───Schema - users_assets
|   │   Table - user_auth - user_id
|   │   Table - user_details - user_id
│   │   Table - fannypacks - fannypacks_id
└───Schema - fannypack_userID_fannypacks_serial
|   │   Table - category - category_id
│   │   Table - wallet_record - wallet_id
│   │   Table - wallet_One - wallet_id
│   │   Table - wallet_Two - wallet_id
|   |
- User - Contains FannyPacks
- FannyPacks - Contains Wallets and category
- Wallets - Contains Account Statemetn information
```
# Feature - ADD 

#### FirstRun - Initial Running
###### Create Database 
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

#### Accounts and Wallets and Category 
###### User Register - Register/Add user
- Requirement
    - > User, Password, fannyPackName
- userAdd 
    - Add user to users_assets.user_auth_table
    - Add user to users_assets.user_details_table
- Create - FannyPacks
##### Create - FannyPacks
- Requirement
    - > FannyPack_Name
- Create Schema
    - create fannypack_userID_fannypacks_serial
- Create Table 
    - create fannypack_userID_fannypacks_serial.category_table
    - create fannypack_userID_fannypacks_serial.wallet_types
    - create fannypack_userID_fannypacks_serial.wallet_record_table
- Add
    - Add FannyPack_Name to users_assets.fannypacks_table
    - Add CatNameRoot to fannypack_userID_fannypacks_serial.category_table

##### Add - Wallet Type
- Requirement
    - > wallet_type name
- Add
    - Add wallet_Type to fannypack_userID_fannypacks_serial.wallet_types
##### Add - Category
- Requirement
    - > CatName
- Add
    - Add CatName to fannypack_userID_fannypacks_serial.category_table
##### Add - Accounts
- Requirement
    - > Wallet_type, account_name, dates
- Create Table 
    - create fannypack_userID_fannypacks_serial.wallet_UNO_SERIAL
- Add
    - Add wallet_UNO_SERIAL to fannypack_userID_fannypacks_serial.wallet_record_table

##### Uplolad - Statemet
- Requirement
    - > AccountActivity.csv, dates
- Add
    - Add AccountActivity to fannypack_userID_fannypacks_serial.wallet_UNO_SERIAL
    - Add lastModify to fannypack_userID_fannypacks_serial.wallet_record_table
