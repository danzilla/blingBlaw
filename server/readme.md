# BlingBlaw - API :heartbeat: :sparkles: :fire:

### Server blaze
- Install app dependecies using npm or another package manger
  - > npm install
- Launch server 
  - > npm start
  - > http://localhost:5000

# Database - Design
Revised 
 - <s>May 26, 2019</s>
 - <s>June 27, 2019</s>
 - <s>July 02, 2019</s>
 - July 26, 2019

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

| End-points                |  Method   | Request    | Response   |
|:--------------------------|:---------:|:----------:|:-----------|
| /                         | ALL       |    none    |   none     |
| /firstrun                 | GET       |    none    |   Drop and Create Database     |
| /user/add                 | POST      |    Yes     |   Add User and Add FannyPack   |
| /fannypack/add            | POST      |    Yes     |   Add FannyPack   |
| /account/category/add     | POST      |    Yes     |   Add accountCategory   |
| /account/type/add         | POST      |    Yes     |   Add accountTyp   |
| /account/transaction/add  | POST      |    Yes     |   Add accountTransaction   |

### To-Do
- [ ] REST to GraphQL
