# IOU  

IOU Application used to keep track of tabs between friends!

https://jheal006.github.io/IOU/

## WARNING: This application is not supported on Firefox



## Step 1) Create a List of Friends!
Create a list of at least two friends and then proceed to the next page. 

![step1](https://user-images.githubusercontent.com/20628500/42251289-5c0ae9b0-7eeb-11e8-9ebc-16d05570a7d0.PNG)

###Note, you can reset your list of friends, or your receipts from the next page by returning here and pressing 'Reset'

## Step 2) Fill Out the Form!
Select the friend who paid for the bill, and those who went on that specific item, then, input the item name and price!

![step2](https://user-images.githubusercontent.com/20628500/42251478-85f99e28-7eec-11e8-9ecf-9523bdf2ea4e.PNG)


## Step 3) Inspect the Results
Time for your friends to pay up...

![step3](https://user-images.githubusercontent.com/20628500/42251481-8e123746-7eec-11e8-81ae-ab2ff09bdccc.PNG)

## App Notes

###The JavaScript has multiple comments explaining the purpose and steps of the primary app functions. 
- init.js creates the local browser DB and readies basic form functions. As well, this handles the intial page step and establishes a clear function for the DB.
- Utilities.js contains functionality for DB interactions, including table creation and queries.
- appDisplay.js handles primary display of the function including rendering of the dropdown menu, checkbox list of friends, and the final receipts.
- app.js contains the primary logic of the app. The app is constructed by storing individual amounts owed between the tab payer and borrower, based on how many individuals went in on a certain item. The DB then returns a SUM total of monies owed by an individual borrower to the tab payer. At this point the app searches for the absolute value of the difference in the reverse use case, and assigns that value to the individual who is still owed money.  

###Utilities.js consists of all the SQL browser DB interactions. 
- Insert Users and Insert Transaction creates two separate DB tables one for holding friend names, the other for receipt information.
- Get Results queries the Transaction table and returns all rows with the following columns explained:
  Payer, Amount Due for that specific tab, the specific Friend who went in on the tab for that specific item and, lastly, the SUM of the 
  total amount due from each borrower to each payer.
- Drop DB simply erases the entire app, and is linked to a button found on index.html (initial page)

