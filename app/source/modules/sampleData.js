const moment = require('moment'); // moment for Time and Date
const ObjectId = require('mongodb').ObjectID;

let categories = [{
    _id: ObjectId("5be07d20239f616a002cabc2"),
    catName: "Income",
    catParent: "root",
    catModify: "",
    catCreated: moment().format('MMMM Do YYYY, h:mm:ss a')
  },
  {
    _id: ObjectId("5be07d20239f616a002cabc3"),
    catName: "Savings",
    catParent: "root",
    catModify: "",
    catCreated: moment().format('MMMM Do YYYY, h:mm:ss a')
  },
  {
    _id: ObjectId("5be07d20239f616a002cabc4"),
    catName: "Entertainment",
    catParent: "root",
    catModify: "",
    catCreated: moment().format('MMMM Do YYYY, h:mm:ss a')
  },
  {
    _id: ObjectId(),
    catName: "Paycheck",
    catParent: "5be07d20239f616a002cabc2",
    catModify: "",
    catCreated: moment().format('MMMM Do YYYY, h:mm:ss a')
  },
  {
    _id: ObjectId(),
    catName: "Investment",
    catParent: "5be07d20239f616a002cabc2",
    catModify: "",
    catCreated: moment().format('MMMM Do YYYY, h:mm:ss a')
  },
  {
    _id: ObjectId(),
    catName: "Sell",
    catParent: "5be07d20239f616a002cabc2",
    catModify: "",
    catCreated: moment().format('MMMM Do YYYY, h:mm:ss a')
  },
  {
    _id: ObjectId(),
    catName: "Emergency Saving",
    catParent: "5be07d20239f616a002cabc3",
    catModify: "",
    catCreated: moment().format('MMMM Do YYYY, h:mm:ss a')
  },
  {
    _id: ObjectId(),
    catName: "Car Saving",
    catParent: "5be07d20239f616a002cabc3",
    catModify: "",
    catCreated: moment().format('MMMM Do YYYY, h:mm:ss a')
  },
  {
    _id: ObjectId(),
    catName: "Travel Saving",
    catParent: "5be07d20239f616a002cabc3",
    catModify: "",
    catCreated: moment().format('MMMM Do YYYY, h:mm:ss a')
  },
  {
    _id: ObjectId(),
    catName: "YOLO Saving",
    catParent: "5be07d20239f616a002cabc3",
    catModify: "",
    catCreated: moment().format('MMMM Do YYYY, h:mm:ss a')
  },
  {
    _id: ObjectId(),
    catName: "Events",
    catParent: "5be07d20239f616a002cabc4",
    catModify: "",
    catCreated: moment().format('MMMM Do YYYY, h:mm:ss a')
  },
  {
    _id: ObjectId(),
    catName: "Movies",
    catParent: "5be07d20239f616a002cabc4",
    catModify: "",
    catCreated: moment().format('MMMM Do YYYY, h:mm:ss a')
  },
  {
    _id: ObjectId(),
    catName: "Music",
    catParent: "5be07d20239f616a002cabc4",
    catModify: "",
    catCreated: moment().format('MMMM Do YYYY, h:mm:ss a')
  },
  {
    _id: ObjectId(),
    catName: "Bar",
    catParent: "5be07d20239f616a002cabc4",
    catModify: "",
    catCreated: moment().format('MMMM Do YYYY, h:mm:ss a')
  },
  {
    _id: ObjectId(),
    catName: "Games",
    catParent: "5be07d20239f616a002cabc4",
    catModify: "",
    catCreated: moment().format('MMMM Do YYYY, h:mm:ss a')
  }
];



module.exports.categories = categories;
