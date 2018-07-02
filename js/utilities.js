var rowsMajor = {};
var data;
// DB FUNCTIONS
function insertUsers(name) {
	db.transaction(function (tx) {
		tx.executeSql('CREATE TABLE IF NOT EXISTS FRIENDS (id INTEGER PRIMARY KEY, name)');
		tx.executeSql('INSERT INTO FRIENDS (name) VALUES (?)', [name]);
	})
}

function insertTransaction(payerID, amountDue, itemName, friendWhoOwesID) {
	db.transaction(function (tx) {
		tx.executeSql('CREATE TABLE IF NOT EXISTS TRANSACTIONS (payerID, amountDue, itemName, friendWhoOwesID)');
		tx.executeSql('INSERT INTO TRANSACTIONS (payerID, amountDue, itemName, friendWhoOwesID) VALUES (?,?,?,?)', [payerID, amountDue, itemName, friendWhoOwesID]);
	})
}

function getResults() {
	db.transaction(function (tx) {
		var rows;
		tx.executeSql('SELECT TRANSACTIONS.payerID, TRANSACTIONS.amountDue, FRIENDS.name AS "friendWhoOwes", SUM(amountDue) AS "sum" FROM TRANSACTIONS INNER JOIN FRIENDS ON TRANSACTIONS.friendWhoOwesID = FRIENDS.id GROUP BY TRANSACTIONS.payerID, FRIENDS.name', [], function (tx, results) {
			 data = results;
		});
		// tx.executeSql('SELECT * FROM TRANSACTIONS', [], function (tx, results) {
		// 	 rows = Array.from(results.rows);
		// 	 rowsMajor = Array.from(rows);
		// });
	});
}

function renderResultsTable(data) {
	console.log("RESULTS", data);
	var newArray =  Array.from(data.rows);
	console.log("New Array", newArray);
	for (var i = 0; i < newArray.length; i++) {
		var newAmount;
		var origPayer = newArray[i].payerID;
		var origFriend = newArray[i].friendWhoOwes;
		for (var j = 1; j < newArray.length; j++) {
			var tempPayer = newArray[j].payerID;
			var tempFriend = newArray[j].friendWhoOwes
			if ( origPayer === tempFriend && origFriend === tempPayer ) {
				newAmount = Math.abs(newArray[i].sum - newArray[j].sum );
				console.log("NEW AMOUNT", newAmount);
				if ( (newArray[i].sum - newAmount) > 0) {
					newArray[i].sum = newAmount
					newArray[j].sum = 0;
				}
				// else if ( (newArray[j].sum - newAmount) < 0) {
				// 	newArray[j].sum = 0;
				// }
			}
		}
	}
	console.log("Adjusted Array", newArray);
	var payers = [...new Set(newArray.map(payer => payer.payerID))];
	console.log("PAYERS", payers);
	$('#results').html(msg);
	/// Display Tab
	$.each(newArray, function(i) {
	var html = "<div class='newReceipts'>";
		html += ("Money Owed To: " + newArray[i].payerID);
		html += ("<p>From: " + newArray[i].friendWhoOwes + "</p>");
		html += ("<p>Amount: " + newArray[i].sum + "</p>");
		html += "</div>";
	$("#results").append(html);
	});
}

	// for rows i; ++
	// <table>
	// <tr> row stuff </tr>
	// </table>
	//
	// return all that html;
