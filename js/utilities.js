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
	// db.transaction(function (tx) { tx.executeSql('SELECT GROUP AND SUM SHIT'); })
	rows = ["payor", "possible", "amount"];
	 // rows = {timmy, ,, }
	return rows;
}


function renderResultsTable(rows) {
	msg = "<table>"
		rows.forEach(function(e){
			msg += '<tr><td>' + e + '</td></tr>';
		});
	 msg += "</table>"
	$('#results').html(msg);
}

	// for rows i; ++ bullshit
	// <table>
	// <tr> row shit </tr>
	// </table>
	//
	// return all that html;
