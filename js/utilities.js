var rowsMajor = {};
// DB FUNCTIONS
function insertUsers(name) {
	db.transaction(function (tx) {
		tx.executeSql('CREATE TABLE IF NOT EXISTS FRIENDS (id INTEGER PRIMARY KEY, name)');
		tx.executeSql('INSERT INTO FRIENDS (name) VALUES (?)', [name]);
	})
}

function insertTransaction(payer, amountDue, itemName, friendWhoOwesID) {
	db.transaction(function (tx) {
		tx.executeSql('CREATE TABLE IF NOT EXISTS TRANSACTIONS (payer, amountDue, itemName, friendWhoOwesID)');
		tx.executeSql('INSERT INTO TRANSACTIONS (payer, amountDue, itemName, friendWhoOwesID) VALUES (?,?,?,?)', [payer, amountDue, itemName, friendWhoOwesID]);
	})
}

function getResults() {
	db.transaction(function (tx) {
		var rows;
		tx.executeSql('		SELECT TRANSACTIONS.payer, TRANSACTIONS.amountDue, FRIENDS.name AS "Friend Who Owes", SUM(amountDue) FROM TRANSACTIONS INNER JOIN FRIENDS ON TRANSACTIONS.friendWhoOwesID = FRIENDS.id GROUP BY  TRANSACTIONS.payer, FRIENDS.name', [], function (tx, results) {
			 console.log("WHAT ARE THESE RESULTS?", results);
		});
		// tx.executeSql('		SELECT TRANSACTIONS.payer, TRANSACTIONS.friendWhoOwesID, TRANSACTIONS.amountDue, SUM(TRANSACTIONS.amountDue) FROM TRANSACTIONS	 GROUP BY  TRANSACTIONS.payer, TRANSACTIONS.friendWhoOwesID	', [], function (tx, results) {
		// 	 console.log("WHAT IS THIS SUM?", results);
		// });
		tx.executeSql('SELECT * FROM TRANSACTIONS', [], function (tx, results) {
			 rows = Array.from(results.rows);
			 rowsMajor = Array.from(rows);
		});
	});
}

function renderResultsTable(rowsMajor) {
	msg = "<table><tr>";
		rowsMajor.forEach(function(e){
			msg += '<td>' + e + '</td>';
		});
	 msg += "</tr></table>"
	$('#results').html(msg);
}

	// for rows i; ++
	// <table>
	// <tr> row stuff </tr>
	// </table>
	//
	// return all that html;
