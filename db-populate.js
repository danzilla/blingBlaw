
var mongo = require("mongo");
var monk = require("monk");
var db = monk("localhost:27017/danustanBling");
var collection = db.get('categorycollection');


// we create 'users' collection in newdb database
var url = "mongodb://localhost:27017/danustanBling";
// create a client to mongodb
var MongoClient = require('mongodb').MongoClient;

// make client connect to mongo service
MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    // db pointing to newdb
    console.log("Switched to "+db.databaseName+" database");

    var data = [
        {	catName: "Paycheck", catParent: "5b7b0798a724b537962ccf83", catDate: "August 20th 2018"},
        {	catName: "Investment", catParent: "5b7b0798a724b537962ccf83", catDate: "August 20th 2018"},
        {	catName: "Sell", catParent: "5b7b0798a724b537962ccf83", catDate: "August 20th 2018"},
        {	catName: "Emergency Saving", catParent: "5b7b079da724b537962ccf84", catDate: "August 20th 2018"},
        {	catName: "Car Saving", catParent: "5b7b079da724b537962ccf84", catDate: "August 20th 2018"},
        {	catName: "Travel Saving", catParent: "5b7b079da724b537962ccf84", catDate: "August 20th 2018"},
        {	catName: "YOLO Saving", catParent: "5b7b079da724b537962ccf84", catDate: "August 20th 2018"},
        {	catName: "Events", catParent: "5b7b07a1a724b537962ccf85", catDate: "August 20th 2018"},
        {	catName: "Movies", catParent: "5b7b07a1a724b537962ccf85", catDate: "August 20th 2018"},
        {	catName: "Music", catParent: "5b7b07a1a724b537962ccf85", catDate: "August 20th 2018"},
        {	catName: "Bar", catParent: "5b7b07a1a724b537962ccf85", catDate: "August 20th 2018"},
        {	catName: "Games", catParent: "5b7b07a1a724b537962ccf85", catDate: "August 20th 2018"},
        {	catName: "Groceries", catParent: "5b7b07a6a724b537962ccf86", catDate: "August 20th 2018"},
        {	catName: "Coffee shops", catParent: "5b7b07a6a724b537962ccf86", catDate: "August 20th 2018"},
        {	catName: "Fast Food", catParent: "5b7b07a6a724b537962ccf86", catDate: "August 20th 2018"},
        {	catName: "Restaurants", catParent: "5b7b07a6a724b537962ccf86", catDate: "August 20th 2018"},
        {	catName: "Alcohol", catParent: "5b7b07a6a724b537962ccf86", catDate: "August 20th 2018"},
        {	catName: "Household supplies", catParent: "5b7b07a6a724b537962ccf86", catDate: "August 20th 2018"},
        {	catName: "Water", catParent: "5b7b07ada724b537962ccf87", catDate: "August 20th 2018"},
        {	catName: "Internet", catParent: "5b7b07ada724b537962ccf87", catDate: "August 20th 2018"},
        {	catName: "Electricity", catParent: "5b7b07ada724b537962ccf87", catDate: "August 20th 2018"},
        {	catName: "Phone", catParent: "5b7b07ada724b537962ccf87", catDate: "August 20th 2018"},
        {	catName: "Recycling", catParent: "5b7b07ada724b537962ccf87", catDate: "August 20th 2018"},
        {	catName: "Rent", catParent: "5b7b07ada724b537962ccf87", catDate: "August 20th 2018"},
        {	catName: "Repairs", catParent: "5b7b07ada724b537962ccf87", catDate: "August 20th 2018"},
        {	catName: "Gas", catParent: "5b7b07b7a724b537962ccf88", catDate: "August 20th 2018"},
        {	catName: "Parking", catParent: "5b7b07b7a724b537962ccf88", catDate: "August 20th 2018"},
        {	catName: "Car Service", catParent: "5b7b07b7a724b537962ccf88", catDate: "August 20th 2018"},
        {	catName: "Car Payment", catParent: "5b7b07b7a724b537962ccf88", catDate: "August 20th 2018"},
        {	catName: "Car Insurance", catParent: "5b7b07b7a724b537962ccf88", catDate: "August 20th 2018"},
        {	catName: "Car Tickets", catParent: "5b7b07b7a724b537962ccf88", catDate: "August 20th 2018"},
        {	catName: "Transport", catParent: "5b7b07b7a724b537962ccf88", catDate: "August 20th 2018"},
        {	catName: "Withdrawl", catParent: "5b7b07bda724b537962ccf89", catDate: "August 20th 2018"},
        {	catName: "Transfer", catParent: "5b7b07bda724b537962ccf89", catDate: "August 20th 2018"},
        {	catName: "ATM Fee", catParent: "5b7b07bda724b537962ccf89", catDate: "August 20th 2018"},
        {	catName: "Bank Fee", catParent: "5b7b07bda724b537962ccf89", catDate: "August 20th 2018"},
        {	catName: "Late Fee", catParent: "5b7b07bda724b537962ccf89", catDate: "August 20th 2018"},
        {	catName: "Service Fee", catParent: "5b7b07bda724b537962ccf89", catDate: "August 20th 2018"},
        {	catName: "Hair", catParent: "5b7b07c4a724b537962ccf8a", catDate: "August 20th 2018"},
        {	catName: "Gym", catParent: "5b7b07c4a724b537962ccf8a", catDate: "August 20th 2018"},
        {	catName: "Laundry", catParent: "5b7b07c4a724b537962ccf8a", catDate: "August 20th 2018"},
        {	catName: "Sports", catParent: "5b7b07c4a724b537962ccf8a", catDate: "August 20th 2018"},
        {	catName: "healthcare", catParent: "5b7b07c4a724b537962ccf8a", catDate: "August 20th 2018"},
        {	catName: "Tuition", catParent: "5b7b07c8a724b537962ccf8b", catDate: "August 20th 2018"},
        {	catName: "Student Loan", catParent: "5b7b07c8a724b537962ccf8b", catDate: "August 20th 2018"},
        {	catName: "Supplies", catParent: "5b7b07c8a724b537962ccf8b", catDate: "August 20th 2018"},
        {	catName: "Hobbies", catParent: "5b7b07cca724b537962ccf8c", catDate: "August 20th 2018"},
        {	catName: "Clothing", catParent: "5b7b07cca724b537962ccf8c", catDate: "August 20th 2018"},
        {	catName: "Accessories", catParent: "5b7b07cca724b537962ccf8c", catDate: "August 20th 2018"},
        {	catName: "Electronics", catParent: "5b7b07cca724b537962ccf8c", catDate: "August 20th 2018"},
        {	catName: "Uncategorized", catParent: "5b7b07d0a724b537962ccf8d", catDate: "August 20th 2018"}];

    // insert multiple documents to 'users' collection using insertOne
    collection.insert(data, function(err, res) {
        if (err) throw err;
        console.log(res.insertedCount+" documents inserted");
        // close the connection to db when you are done with it
        db.close();
    });
});
