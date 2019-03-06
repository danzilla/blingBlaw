# BlingBlaw  :green_heart: :sparkles: :fire: :tada:
A minimalist budget app (**nodeJs + Express + mongoDB**)

## App Requirement
- MongoDB
	> Download and Install mongoDB
	> https://www.mongodb.com/download-center/community
- NPM and nodeJs
	* Download and Install nodeJs (npm package manager included with nodejs)
	* https://nodejs.org/en/download/

Once, you are done with the above requirements.
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

## App Configuration

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
const db = req.db;
const collection = db.get("fanny");
// set newData to insert
const user_id = ObjectId();
const statement_id = ObjectId();
const blingBlaw = {
	_id: user_id,
	userInfo: {
		userId: user_id,
		userFannyPack: req.body.fannyPack,
		userName: req.body.username,
		userPwd: req.body.pwd,
		userEmil: "",
		userGrup: "",
		userCreated: moment().format('MMMM Do YYYY, h:mm:ss a'),
		userModify: ""
	},
	statementInfo: [{
		statement_id: statement_id,
		statementName: "",
		statementType: "",
		statementDate: "",
		statementDesc: "",
		statementFileInfo: "",
		statementCreated: moment().format('MMMM Do YYYY, h:mm:ss a'),
		statementModified: "",
		statementModifiedtUser: ""
	}],
	transactionInfo: [{
		transactionId: "",
		transactionDate: "",
		transactionDesc: "",
		transactionWithdraw: "",
		transactionDeposite: "",
		transactionBalance: "",
		transactiontModified: "",
		transactiontModifiedUser: "",
		statement_id: statement_id
	}],
	categoryInfo: [{
		_id: "",
		catName: "",
		catParent: "",
		catCreate: moment().format('MMMM Do YYYY, h:mm:ss a'),
		catModify: ""
	}]
}
~~~



# New DB - PostgreSQL
