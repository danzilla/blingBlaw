// Bling
const accountType = [
    "Checking Account", 
    "Saving Account",
    "Credit Card",
    "TFSA"
];
const accountName = [
    "My Cool Account",
    "Saving Account"
]
const accountCategory = [
    {
        parent: "Income",
        child: ["Paycheck", "Investment", "Sell", "other"]
    },
    {
        parent: "Savings",
        child: ["Emergency Saving", "Car Saving", "Travel Saving", "YOLO Saving"]
    },
    {
        parent: "Entertainment",
        child: ["Events", "Movies", "Music", "Bar", "Games"]
    },
    {
        parent: "Food and Groceries",
        child: ["Groceries", "Coffee shops", "Fast Food", "Alcohol", "Restaurants", "Household supplies"]
    },
    {
        parent: "Utilities",
        child: ["Water", "Electricity", "Internet", "Phone", "Recycling", "Rent", "Repairs"]
    },
    {
        parent: "Auto and Transport",
        child: ["Gas", "Parking", "Car Service", "Car Insurance", "Car Tickets", "Transport"]
    },
    {
        parent: "Bank",
        child: ["Withdrawl", "Transfer", "ATM Fee", "Bank Fee", "Late Fee", "Service Fee"]
    },
    {
        parent: "Personal Care",
        child: ["Hair", "Gym", "Laundry", "Sports", "healthcare"]
    },
    {
        parent: "Education",
        child: ["Tuition", "Student Loan", "Supplies"]
    },
    {
        parent: "Shopping",
        child: ["Hobbies", "Clothing", "Accessories", "Electronics"]
    },
    {
        parent: "Misc",
        child: ["Uncategorized"]
    },
];
const accountTransaction = [];
// Export 
module.exports = {
    accountType: accountType,
    accountName: accountName,
    accountCategory: accountCategory,
    accountTransaction: accountTransaction
};
  
