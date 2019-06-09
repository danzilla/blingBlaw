# BlingBlaw  :red_heart: :sparkles: :fire: :tada:
A minimalist budget app (**nodeJs + Express + PostgreSQL**)

## Express - REST
- http://localhost:5000

#### Database - Design - Draft - May 26, 2019
```
database_Name - blingblaw_assets
│
└───Schema - users
|   │   Table - user_auth - user_id
|   │   Table - user_details - user_id
|   │   Table - user_record - user_id
|   │   Table - user_group - user_group_id
└───Schema - fannypack
│   │   Table - fannypack_id
│   │   Table - fannypack_Record
```
```
database_Name - blingblaw_fannypack
|  
└───Schema - fannypack_id
|   │   Table - category - category_id - category_details - category_change_info
│   │   Table - wallet - wallet_id -  wallet_name - wallet_change_info
│   │   Table - wallet_details - wallet_id
```