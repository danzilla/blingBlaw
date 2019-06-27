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
|   │   Table - category- category_id
│   │   Table - wallet_record - wallet_id
│   │   Table - wallet_One - wallet_id
|   |
- User - Contains FannyPacks
- FannyPacks - Contains Wallets and category
- Wallets - Contains Account Statemetn information
```

# Feature - ADD 
#### FirstRun - Initial Running
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

#### User Register - Register/Add user
- Requirement
    - > User, Password, Email
- userAdd 
    - Add user to users_assets.user_auth_table
    - Add user to users_assets.user_details_table

#### Accounts and Wallets and Category 
##### 1 - Add - FannyPacks
- Requirement
    - > FannyPack_Name
- Create Schema
    - create fannypack_userID_fannypacks_serial
- Create Table 
    - create fannypack_userID_fannypacks_serial.category_table
    - create fannypack_userID_fannypacks_serial.wallet_record_table
- Add
    - Add FannyPack_Name to users_assets.fannypacks_table

##### 2 -  Add - Accounts and statemet 
- Requirement
    - > AccountActivity.csv, Dates, Name, Type
- Create Table 
    - create fannypack_userID_fannypacks_serial.wallet_UNO_SERIAL
- Add
    - Add wallet_UNO_SERIAL to fannypack_userID_fannypacks_serial.wallet_record_table
    - Add AccountActivity to fannypack_userID_fannypacks_serial.wallet_UNO_SERIAL

##### 3 -  Add - Category
- Requirement
    - > CatName
- Add
    - Add CatName to fannypack_userID_fannypacks_serial.category_table

