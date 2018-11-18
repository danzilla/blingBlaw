var mongo = require("mongo");
var monk = require("monk");
var db = monk("localhost:27017/danustanBling");

// we create 'users' collection in newdb database
// create a client to mongodb
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/danustanBling";
var ObjectId = require('mongodb').ObjectID;

var categorycollection = db.get('categorycollection');

// category insert
MongoClient.connect(url, function(err, db) {
  if (err) throw err;


  // db pointing to newdb
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

  var categoryInfo = [{
      _id: ObjectId("5be07d20239f616a002cabc2"),
      catName: "Income",
      catParent: "root",
      catDate: "August 20th 2018"
    },
    {
      _id: ObjectId("5be07d20239f616a002cabc3"),
      catName: "Savings",
      catParent: "root",
      catDate: "August 20th 2018"
    },
    {
      _id: ObjectId("5be07d20239f616a002cabc4"),
      catName: "Entertainment",
      catParent: "root",
      catDate: "August 20th 2018"
    },
    {
      _id: ObjectId("5be07d20239f616a002cabc5"),
      catName: "Food and Groceries",
      catParent: "root",
      catDate: "August 20th 2018"
    },
    {
      _id: ObjectId("5be07d20239f616a002cabc6"),
      catName: "Utilities",
      catParent: "root",
      catDate: "August 20th 2018"
    },
    {
      _id: ObjectId("5be07d20239f616a002cabc7"),
      catName: "Auto and Transport",
      catParent: "root",
      catDate: "August 20th 2018"
    },
    {
      _id: ObjectId("5be07d20239f616a002cabc8"),
      catName: "Bank",
      catParent: "root",
      catDate: "August 20th 2018"
    },
    {
      _id: ObjectId("5be07d20239f616a002cabc9"),
      catName: "Personal Care",
      catParent: "root",
      catDate: "August 20th 2018"
    },
    {
      _id: ObjectId("5be07d20239f616a002cabca"),
      catName: "Education",
      catParent: "root",
      catDate: "August 20th 2018"
    },
    {
      _id: ObjectId("5be07d20239f616a002cabcb"),
      catName: "Shopping",
      catParent: "root",
      catDate: "August 20th 2018"
    },
    {
      _id: ObjectId("5be07d20239f616a002cabcc"),
      catName: "Misc",
      catParent: "root",
      catDate: "August 20th 2018"
    },

    {
      _id: ObjectId(),
      catName: "Paycheck",
      catParent: "5be07d20239f616a002cabc2",
      catDate: "August 20th 2018"
    },
    {
      _id: ObjectId(),
      catName: "Investment",
      catParent: "5be07d20239f616a002cabc2",
      catDate: "August 20th 2018"
    },
    {
      _id: ObjectId(),
      catName: "Sell",
      catParent: "5be07d20239f616a002cabc2",
      catDate: "August 20th 2018"
    },
    {
      _id: ObjectId(),
      catName: "Emergency Saving",
      catParent: "5be07d20239f616a002cabc3",
      catDate: "August 20th 2018"
    },
    {
      _id: ObjectId(),
      catName: "Car Saving",
      catParent: "5be07d20239f616a002cabc3",
      catDate: "August 20th 2018"
    },
    {
      _id: ObjectId(),
      catName: "Travel Saving",
      catParent: "5be07d20239f616a002cabc3",
      catDate: "August 20th 2018"
    },
    {
      _id: ObjectId(),
      catName: "YOLO Saving",
      catParent: "5be07d20239f616a002cabc3",
      catDate: "August 20th 2018"
    },
    {
      _id: ObjectId(),
      catName: "Events",
      catParent: "5be07d20239f616a002cabc4",
      catDate: "August 20th 2018"
    },
    {
      _id: ObjectId(),
      catName: "Movies",
      catParent: "5be07d20239f616a002cabc4",
      catDate: "August 20th 2018"
    },
    {
      _id: ObjectId(),
      catName: "Music",
      catParent: "5be07d20239f616a002cabc4",
      catDate: "August 20th 2018"
    },
    {
      _id: ObjectId(),
      catName: "Bar",
      catParent: "5be07d20239f616a002cabc4",
      catDate: "August 20th 2018"
    },
    {
      _id: ObjectId(),
      catName: "Games",
      catParent: "5be07d20239f616a002cabc4",
      catDate: "August 20th 2018"
    },
    {
      _id: ObjectId(),
      catName: "Groceries",
      catParent: "5be07d20239f616a002cabc5",
      catDate: "August 20th 2018"
    },
    {
      _id: ObjectId(),
      catName: "Coffee shops",
      catParent: "5be07d20239f616a002cabc5",
      catDate: "August 20th 2018"
    },
    {
      _id: ObjectId(),
      catName: "Fast Food",
      catParent: "5be07d20239f616a002cabc5",
      catDate: "August 20th 2018"
    },
    {
      _id: ObjectId(),
      catName: "Restaurants",
      catParent: "5be07d20239f616a002cabc5",
      catDate: "August 20th 2018"
    },
    {
      _id: ObjectId(),
      catName: "Alcohol",
      catParent: "5be07d20239f616a002cabc5",
      catDate: "August 20th 2018"
    },
    {
      _id: ObjectId(),
      catName: "Household supplies",
      catParent: "5be07d20239f616a002cabc5",
      catDate: "August 20th 2018"
    },
    {
      _id: ObjectId(),
      catName: "Water",
      catParent: "5be07d20239f616a002cabc6",
      catDate: "August 20th 2018"
    },
    {
      _id: ObjectId(),
      catName: "Internet",
      catParent: "5be07d20239f616a002cabc6",
      catDate: "August 20th 2018"
    },
    {
      _id: ObjectId(),
      catName: "Electricity",
      catParent: "5be07d20239f616a002cabc6",
      catDate: "August 20th 2018"
    },
    {
      _id: ObjectId(),
      catName: "Phone",
      catParent: "5be07d20239f616a002cabc6",
      catDate: "August 20th 2018"
    },
    {
      _id: ObjectId(),
      catName: "Recycling",
      catParent: "5be07d20239f616a002cabc6",
      catDate: "August 20th 2018"
    },
    {
      _id: ObjectId(),
      catName: "Rent",
      catParent: "5be07d20239f616a002cabc6",
      catDate: "August 20th 2018"
    },
    {
      _id: ObjectId(),
      catName: "Repairs",
      catParent: "5be07d20239f616a002cabc6",
      catDate: "August 20th 2018"
    },
    {
      _id: ObjectId(),
      catName: "Gas",
      catParent: "5be07d20239f616a002cabc7",
      catDate: "August 20th 2018"
    },
    {
      _id: ObjectId(),
      catName: "Parking",
      catParent: "5be07d20239f616a002cabc7",
      catDate: "August 20th 2018"
    },
    {
      _id: ObjectId(),
      catName: "Car Service",
      catParent: "5be07d20239f616a002cabc7",
      catDate: "August 20th 2018"
    },
    {
      _id: ObjectId(),
      catName: "Car Payment",
      catParent: "5be07d20239f616a002cabc7",
      catDate: "August 20th 2018"
    },
    {
      _id: ObjectId(),
      catName: "Car Insurance",
      catParent: "5be07d20239f616a002cabc7",
      catDate: "August 20th 2018"
    },
    {
      _id: ObjectId(),
      catName: "Car Tickets",
      catParent: "5be07d20239f616a002cabc7",
      catDate: "August 20th 2018"
    },
    {
      _id: ObjectId(),
      catName: "Transport",
      catParent: "5be07d20239f616a002cabc7",
      catDate: "August 20th 2018"
    },
    {
      _id: ObjectId(),
      catName: "Withdrawl",
      catParent: "5be07d20239f616a002cabc8",
      catDate: "August 20th 2018"
    },
    {
      _id: ObjectId(),
      catName: "Transfer",
      catParent: "5be07d20239f616a002cabc8",
      catDate: "August 20th 2018"
    },
    {
      _id: ObjectId(),
      catName: "ATM Fee",
      catParent: "5be07d20239f616a002cabc8",
      catDate: "August 20th 2018"
    },
    {
      _id: ObjectId(),
      catName: "Bank Fee",
      catParent: "5be07d20239f616a002cabc8",
      catDate: "August 20th 2018"
    },
    {
      _id: ObjectId(),
      catName: "Late Fee",
      catParent: "5be07d20239f616a002cabc8",
      catDate: "August 20th 2018"
    },
    {
      _id: ObjectId(),
      catName: "Service Fee",
      catParent: "5be07d20239f616a002cabc8",
      catDate: "August 20th 2018"
    },
    {
      _id: ObjectId(),
      catName: "Hair",
      catParent: "5be07d20239f616a002cabc9",
      catDate: "August 20th 2018"
    },
    {
      _id: ObjectId(),
      catName: "Gym",
      catParent: "5be07d20239f616a002cabc9",
      catDate: "August 20th 2018"
    },
    {
      _id: ObjectId(),
      catName: "Laundry",
      catParent: "5be07d20239f616a002cabc9",
      catDate: "August 20th 2018"
    },
    {
      _id: ObjectId(),
      catName: "Sports",
      catParent: "5be07d20239f616a002cabc9",
      catDate: "August 20th 2018"
    },
    {
      _id: ObjectId(),
      catName: "healthcare",
      catParent: "5be07d20239f616a002cabc9",
      catDate: "August 20th 2018"
    },
    {
      _id: ObjectId(),
      catName: "Tuition",
      catParent: "5be07d20239f616a002cabca",
      catDate: "August 20th 2018"
    },
    {
      _id: ObjectId(),
      catName: "Student Loan",
      catParent: "5be07d20239f616a002cabca",
      catDate: "August 20th 2018"
    },
    {
      _id: ObjectId(),
      catName: "Supplies",
      catParent: "5be07d20239f616a002cabca",
      catDate: "August 20th 2018"
    },
    {
      _id: ObjectId(),
      catName: "Hobbies",
      catParent: "5be07d20239f616a002cabcb",
      catDate: "August 20th 2018"
    },
    {
      _id: ObjectId(),
      catName: "Clothing",
      catParent: "5be07d20239f616a002cabcb",
      catDate: "August 20th 2018"
    },
    {
      _id: ObjectId(),
      catName: "Accessories",
      catParent: "5be07d20239f616a002cabcb",
      catDate: "August 20th 2018"
    },
    {
      _id: ObjectId(),
      catName: "Electronics",
      catParent: "5be07d20239f616a002cabcb",
      catDate: "August 20th 2018"
    },
    {
      _id: ObjectId(),
      catName: "Uncategorized",
      catParent: "5be07d20239f616a002cabcc",
      catDate: "August 20th 2018"
    }
  ];

  console.log("Switched to " + db.databaseName + " database");
  console.log("Collections :" + categorycollection);
  // insert multiple documents to 'users' collection using insertOne
  categorycollection.insert(categoryInfo, function(err, res) {
    if (err) throw err;
    console.log(res.insertedCount + " documents inserted" + "\n " + res);
    // close the connection to db when you are done with it
    db.close();
  });
});
