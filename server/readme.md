# BlingBlaw - API :heartbeat: :volcano: :fire:

Node.js API-server
- REST and GraphQL

# To-Do
- [X] REST - Login and Set Session
- [x] REST - Add | firtRun, user, fannyPack, account
- [x] GraphQL - Integration 
- [x] GraphQL - PostGraphile Integration
- [x] REST - View | firtRun, user, fannyPack, account
- [ ] REST - Update | firtRun, user, fannyPack, account
- [ ] REST - Delete | firtRun, user, fannyPack, account

### Server-folder Structure
```
server
├── app
│   ├── api
│   |  ├── router
│   |  └── index.js
|   ├── config
│   |  ├── statement
│   |  └── app.config.js
│   |  └── AppDBFunction.md
|   ├── graphql
│   └── app.js
└── bin

```
# Database - Design
 - Revised
    - <s>May 26, 2019</s>
    - <s>June 27, 2019</s>
    - <s>July 02, 2019</s>
    - July 26, 2019
```
database_Name - blingblaw_assets
- User - Contains FannyPacks
- FannyPacks - Contains Account, Account Types and category
- Account - Contains Account Statement information
────────────────────────────────────────────────────────────
└───Schema - users_assets
|   │   Table - user_auth - user_id
|   │   Table - user_details - user_id
│   │   Table - fannypacks - fannypacks_id
└───Schema - fannypack_userID_fannypacks_serial
|   │   Table - account_category - account_category_id
│   │   Table - account_type - account_type_id
│   │   Table - account_record - account_id
│   │   Table - account_One - account_id
```

# :fireworks: End-points
| End-points                |  Method   | Request    | Response   |
|:--------------------------|:---------:|:----------:|:-----------|
| /                         | ALL       |    none    |   none     |
| /firstrun                 | GET       |    none    |   Drop and Create Database     |
| /user/add                 | POST      |    Yes     |   Add User and Add FannyPack   |
| /user/view                | POST      |    Yes     |   View A User  |
| /user/view/all            | POST      |    Yes     |   View All User   |
| /fannypack/add            | POST      |    Yes     |   Add FannyPack   |
| /fannypack/view           | POST      |    Yes     |   View FannyPack   |
| /fannypack/view/all       | POST      |    Yes     |   View All FannyPack   |
| /account/add              | POST      |    Yes     |   Add account   |
| /account/category/add     | POST      |    Yes     |   Add accountCategory   |
| /account/category/view    | POST      |    Yes     |   View accountCategory   |
| /account/type/add         | POST      |    Yes     |   Add accountType   |
| /account/type/view        | POST      |    Yes     |   View accountType   |
| /account/transaction/add  | POST      |    Yes     |   Add accountTransaction   |
| /account/transaction/view | POST      |    Yes     |   View accountTransaction   |

# :bomb: Deploy Server 
- Install app dependecies using npm or another package manger
  - > npm install
- Launch server 
  - > npm start
  - > http://localhost:5000

