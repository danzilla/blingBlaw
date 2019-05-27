# BlingBlaw  :green_heart: :sparkles: :fire: :tada:
A minimalist budget app (**nodeJs + Express + PostgreSQL**)


### Server - side
- Access - REST GUI - localhost:5000
- EJS + Flash -> take out the whole gui-backend? 

## Express - REST
- http://localhost:5000


#### Database - Design - Draft - May 26, 2019
```
database_Name - blingBlaw
│
└───Schema - Users
|   │   Table - Users_Auth - User_ID
|   │   Table - User_Details - User_ID - User_Record
└───Schema - Category
|   │   Table - Users_Category_ID - User_ID - Category_details - CategoryChangeInfo
└───Schema - fannyPack
│   │   Table - fannyPackID - UserID - fannyPackDetails - fannyPackChangeInfo
```
```
database_Name - blingBlaw-fannyPack
|  
└───Schema - fannyPackID-0-fannyPackName-A
│   │   Table - Debit card info
│   │   Table - Credit card info
|   |   Table - Saving card info
|
└───Schema - fannyPackID-1-fannyPackName-B
│   │   Table - Debit card info
│   │   Table - Credit card info
|   |   Table - Saving card info
```


# To-Do
- Global config for General Configuration 
	> APP_NAME | APP_PORT | APP_VERSION | APP_MESSAGE | APP_SERVICE
	> DB_Config
	> Password_Auth_Key_Config
