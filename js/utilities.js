var rows;

// DB FUNCTIONS
function insertUsers(name) {
	db.transaction(function (tx) {
		tx.executeSql('CREATE TABLE IF NOT EXISTS FRIENDS (id INTEGER PRIMARY KEY, name)');
		tx.executeSql('INSERT INTO FRIENDS (name) VALUES (?)', [name]);
	})
}

function insertTransaction(payer, price, friendsWhoOwe) {
	db.transaction(function (tx) { tx.executeSql('INSERT INTO TRANSACTIONS (id, log) VALUES (1, "foobar")'); })
}

function getResults() {
	// db.transaction(function (tx) { tx.executeSql('SELECT GROUP AND STUFF'); })
	rows = ["payor", "friendsWhoOwe", "amount"];
	return rows;
}

function renderResultsTable(rows) {
	msg = "<table><tr>"
		rows.forEach(function(e){
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
