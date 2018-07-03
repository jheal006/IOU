var friendList = [];

function calcIOU(data, itemNames) {
		// Retrieve and Compare SUMs
	var newArray =  Array.from(data.rows);
	console.log("New Array", newArray);
		for (var i = 0; i < newArray.length; i++) {
			var origPayer = newArray[i].payerID;
			var origFriend = newArray[i].friendWhoOwes;
				for (var j = 1; j < newArray.length; j++) {
					var tempPayer = newArray[j].payerID;
					var tempFriend = newArray[j].friendWhoOwes
					if ( origPayer === tempFriend && origFriend === tempPayer ) {
						var tabValue = Math.abs(newArray[i].sum - newArray[j].sum );
						if ( newArray[i].sum > newArray[j].sum ) {
							newArray[i].sum = tabValue;
							newArray[j].sum = 0;
						} else if ( newArray[i].sum < newArray[j].sum ) {
							newArray[i].sum = 0;
							newArray[j].sum = tabValue;
						} else if ( newArray[i].sum = newArray[j].sum ) {
							newArray[i].sum = 0;
							newArray[j].sum = 0;
						}
					}
				}
		}
		//Send finalized IOU Amounts to display func
		renderResultsTable(newArray);
	}

function submitToDB() {
   var itemName = $("#item").val();
   var price = $("#price").val();
   var checkboxes = document.querySelectorAll("input[type=checkbox]:checked");
   // Run check to make sure all fields are filled out properly
   // if (itemName === "" || price === "" || payer === "" || checkboxes.length < 1) {
   //     alert("Please Enter both An Item Name and Price! Also Who Paid The Bill!");
   // }
   var amountDue = (price/ (checkboxes.length + 1 )).toFixed(2);
   for (var i = 0; i < checkboxes.length; i++) {
      console.log("AMOUNT DUE TO PAYER BY OTHERS ON BILL", amountDue);
      var friendWhoOwesID = parseInt(checkboxes[i].getAttribute("val"));
      // Insert Values Into DB
       insertTransaction(payer, amountDue, itemName, friendWhoOwesID);
   };
 }


$(document).ready(function() {
// Stop the form from submitting when a button is pressed
$( "form" ).on( "submit", function( event ) {
	event.preventDefault();
  // Retrieve Friends
	var name = $(this[name='friend1']).val();
  //Create Array of Friends to Display to user
  friendList.push(name);
	$(".list").empty();
	$( '.list' ).append(
  $( '<ul />').append(
          $.map(friendList, function(value, i) {
              return $( '<li />', { text: value } );
          })
      )
    )
//Insert Users To DB
	insertUsers(name);
});

// Step to the next Page
$("#next").on('click', function() {
  console.log('test');
  window.location.href="app.html";
});

// Temp Reset DB button
$("#cleardb").on('click', function() {
	friendList = [];
	$(".list").empty();
  	db.transaction(function (tx) {
  		 tx.executeSql('DROP TABLE IF EXISTS FRIENDS');
			 tx.executeSql('DROP TABLE IF EXISTS TRANSACTIONS');
    });
  });

});
