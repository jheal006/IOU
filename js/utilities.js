var rowsMajor = {};
// DB FUNCTIONS
function insertUsers(name) {
	db.transaction(function (tx) {
		tx.executeSql('CREATE TABLE IF NOT EXISTS FRIENDS (id INTEGER PRIMARY KEY, name)');
		tx.executeSql('INSERT INTO FRIENDS (name) VALUES (?)', [name]);
	})
}

function insertTransaction(payer, amountDue, itemName, friendsWhoOwesID) {
	db.transaction(function (tx) {
		tx.executeSql('CREATE TABLE IF NOT EXISTS TRANSACTIONS (payer, amountDue, itemName, friendsWhoOwesID)');
		tx.executeSql('INSERT INTO TRANSACTIONS (payer, amountDue, itemName, friendsWhoOwesID) VALUES (?,?,?,?)', [payer, amountDue, itemName, friendsWhoOwesID]);
	})
}

function getResults() {
	db.transaction(function (tx) {
		var rows;
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
