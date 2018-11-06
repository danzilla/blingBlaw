# BlingBlaw  :green_heart: :sparkles: :fire: :tada:

A minimalist budget app (**nodeJs + Express + mongoDB**)


## App Requirement

- MongoDB
	* Download and Install mongoDB
	* ~~~https://www.mongodb.com/download-center/community~~~
- NPM and nodeJs
	* Download and Install nodeJs (npm package manager included with nodejs)
	* https://nodejs.org/en/download/

Once, you are done with the above requirement.
- Use **git** to clone the repo
	* `git clone https://github.com/danzilla/blingBlaw.git`
- Change directory to blingBlaw
	* `cd blingBlaw`
- Install app **dependecies** using npm or another package manger
	* `npm install`
- **Run** the app
	* `npm start`
	* http://localhost:3000
- **Optional** populate category from sample data before fire the app `/blingBlaw/adds/db-populate.js`
	* `cd blingBlaw/adds/`
	* `node db-populate.js`

## App confutation

`/blingBlaw/` - **Root** app root file
`/blingBlaw/adds/` - **sample files** (sample CSV, category sample data)

#### Database Configuration
 Find the line 	38 - 45 and **change the Database name** to your database name
`/blingBlaw/app.js` - **app.js** nodeJs app config for **ALL**

~~~
// Database config | monk
const mongo = require("mongo");
const monk = require("monk");
const db = monk("localhost:27017/danustanBling")
app.use(function(req,res,next) {
  req.db = db;
  next();
});
~~~

## DB Structure (need to be redesign)
|Database  |             collections             |       points                  |
|----------------|-------------------------------|-----------------------------|
|blingBlaw-danustan|`statementCollection`            |statement Data          |
|          |`transactionCollection`            |Transaction Data            |
|          |`categoryCollection`|Category Data|
|                |                          |                         |


#### DB redesign idea
App - BlingBlaw

BlingBlaw - Collection
~~~
  _id: (objectID),
	fanny_pack: "",
  userInfo: {
    user_id _id
    userName
    userPwd
    userEmil
    userCreated
    userModify
  },
  statementInfo: {
    statementModified
    statementCreated
    statementData: [{
      statement_id (objectID)
      statementName
      statementType
      statementDate
      statementDesc
      statementFileInfo
      statementuploadDate
    }]
  },
  transactionInfo: {
    transactionModified
    transactionCreated
    transactionData: [{
      transId (objectID)
      transDate
      transDesc
      transWithdraw
      transDeposite
      transBalance
      uploadUser
      statement_id: statement_id
    }]
  },
  categoryInfo: {
    _id
    catName
    catParent
    catCreate
    catModify
  }
~~~
