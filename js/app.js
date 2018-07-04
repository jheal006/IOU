
function submitToDB() {
	// Grab Values from Form to Submit to DB
  var itemName = $("#item").val();
  var price = $("#price").val();
  var checkboxes = document.querySelectorAll("input[type=checkbox]:checked");
  // Run check to make sure all fields have been filled
  if (itemName === "" || price === "" || payer === "" || checkboxes.length < 1) {
      alert("Please Enter both an Item Name and Price! Also, who paid and who went in on the tab!");
  }
	// Make sure that price is entered as a number
	if ( isNaN(price) ) {
		alert ("Price must be a valid number");
	}
	// Determine the amount due by each party by dividing the amount of the total tab by the number of responsible parties
  var amountDue = (price / (checkboxes.length + 1)).toFixed(2);
	// For each individual on the tab enter a DB row consisting of the amount due for this tab, item name,
	// and friend ID being held as the associated val attribute.
  for (var i = 0; i < checkboxes.length; i++) {
    var friendWhoOwesID = parseInt(checkboxes[i].getAttribute("val"));
    // Insert Values Into DB
    insertTransaction(payer, amountDue, itemName, friendWhoOwesID);
  };
}

function calcIOU(data, itemNames) {
  // Retrieve and Compare SUMs
  var newArray = Array.from(data.rows);
	// Loop through the rows of returned DB Statements
  for (var i = 0; i < newArray.length; i++) {
		// Temporarily assign the payer and payee to variables
    var origPayer = newArray[i].payerID;
    var origFriend = newArray[i].friendWhoOwes;
		// Loop through the remainder of the array looking where payer and payee roles are reversed
    for (var j = 0; j < newArray.length; j++) {
			// Again temporarily assign the comparable payer and payee to variables
      var tempPayer = newArray[j].payerID;
      var tempFriend = newArray[j].friendWhoOwes
			// Only address situations where the payer and payee roles are reversed
      if (origPayer === tempFriend && origFriend === tempPayer) {
				// Assign the absolute value of the difference in SUM owed to each payer to a variable
        var tabValue = Math.abs(newArray[i].sum - newArray[j].sum);
				// Conditional determining to whom the tabValue var is due while zeroing out money due to other party
				// I am also repurposing the sum key to hold the amount due to each payer, in order to be used for the display
        if (newArray[i].sum > newArray[j].sum) {
          newArray[i].sum = tabValue;
          newArray[j].sum = 0;
        } else if (newArray[i].sum < newArray[j].sum) {
          newArray[i].sum = 0;
          newArray[j].sum = tabValue;
        } else if (newArray[i].sum = newArray[j].sum) {
          newArray[i].sum = 0;
          newArray[j].sum = 0;
        }
      }
    }
  }
  //Send finalized IOU Amounts to display func
  renderResultsTable(newArray);
}
