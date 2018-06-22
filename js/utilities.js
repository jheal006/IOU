
function insertTransaction(data) {
	db.transaction(function (tx) { tx.executeSql('INSERT INTO TRANSACTIONS (id, log) VALUES (1, "foobar")'); })
}

function insertUsers(data) {
	db.transaction(function (tx) { tx.executeSql('INSERT INTO TRANSACTIONS (id, log) VALUES (1, "foobar")'); })
}


function getResults() {
	//db.transaction(function (tx) { tx.executeSql('SELECT GROUP AND SUM SHIT'); })
	 //rows = {timmy, 1, 2, commentdsfaafdshjdfsajhkjadfsjkfads}
	//return rows;
}


function renderResultsTable(rows) {
	for (i = 0; i < rows.length; i++) {
    msg = "<p><b>" + results.rows.item(i).log + "</b></p>";
    document.querySelector('#results').innerHTML +=  msg;
 }
	// for rows i; ++ bullshit

	// <table>
	// <tr> row shit </tr>
	// </table>
	//
	// return all that html;
}
