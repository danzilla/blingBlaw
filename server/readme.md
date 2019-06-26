# BlingBlaw - API :heartbeat: :sparkles: :fire:

## Express - REST
- http://localhost:5000

### Launch server :fire: 
> npm start
> http://localhost:5000

#### Database - Design - Draft - May 26, 2019
```
database_Name - blingblaw_assets
│
└───Schema - users
|   │   Table - user_auth - user_id
|   │   Table - user_details - user_id
|   │   Table - user_record - user_id
└───Schema - fannypacks
│   │   Table - fannypacks - fannypacks_id 
│   │   Table - fannypack_Record - fannypacks_id
└───Schema - fannypack_userID_fannypacks_id
|   │   Table - category - category_id - category_details - category_change_info
│   │   Table - wallet_record - wallet_id - wallet_change_info
│   │   Table - wallet_ - wallet_id -  wallet_name
```
### Feature 

#### FirstRun 
##### Initial Running
- Create Database 
    > create blingBlaw 
- Create Schema
    > create users_assets
    > create fannyPacks_assets
- Create Table 
    > create users_assets.user_auth_table
    > create users_assets.user_details_table
    > create users_assets.user_record_table
    > create fannypacks.fannypacks
    > create fannypacks.fannypack_Record
    
#### Users Register 
##### Register users
- Create Schema
    > create fannyPackz_user_serial_fannyPack_serial
- Create Table 
    > create category
    > create wallet_record
    > create wallet_serial
- Add 
    > Add user to users_assets.user_auth_table
    > Add user to users_assets.user_details_table
    > Add user to users_assets.user_record_table
    > Add userFannyPack to fannypacks.fannypacks
    > Add userFannyPack to fannypacks.fannypack_Record
- Add
    > Add sampleCategory to fannyPackz_user_serial_fannyPack_serial.category
    > Add sampleWalletRecord to fannyPackz_user_serial_fannyPack_serial.wallet_record
    > Add sampleWallet_serial to fannyPackz_user_serial_fannyPack_serial.wallet_serial
    
#### Accounts Add
##### FannyPacks and Wallets
- Create Table 
    > Add newWallet to wallet_record
    > create newWallet_wallet_serial
- Add
    > Add sampleCategory to fannyPackz_user_serial_fannyPack_serial.category
    > Add sampleWalletRecord to fannyPackz_user_serial_fannyPack_serial.wallet_record
    > Add sampleWallet_serial to fannyPackz_user_serial_fannyPack_serial.wallet_serial
    
    