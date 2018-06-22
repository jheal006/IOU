window.onload = function () {

// Open DB Connection
var db = openDatabase('mydb', '1.0', 'Test DB', 2 * 1024 * 1024);
var msg;
db.transaction(function (tx) {
	 tx.executeSql('DROP TABLE IF EXISTS FRIENDS');
	 tx.executeSql('CREATE TABLE IF NOT EXISTS FRIENDS (id, name)');
	 msg = '<p>Log message create and row instered.</p>';
});
console.log(db);



// Stop the form from submitting when a button is pressed
// form.addEventListener('submit', function(e) {
$( "form" ).on( "submit", function( event ) {
	console.log("WAT HAPPENED?!?")
	// form.on(submit) {
	event.preventDefault();
//
// 	form.grabvalues
	var name = $(this[name='friend1']).val();
	console.log("SHOULD OUTPUT NAME===", name);
// 	iterate and clump them together into var data
//
// 	insertUser(data);
	db.transaction(function (tx) {
		tx.executeSql('INSERT INTO FRIENDS (id, name) VALUES (NULL, "foobar")');
		tx.executeSql('INSERT INTO FRIENDS (id, name) VALUES (NULL, "logmsg")');
		tx.executeSql('INSERT INTO FRIENDS (id, name) VALUES (NULL, ?)', [name]);
	});


// 	window.location.reload
// }
});

$("#buttonTest").on('click', function() {
	db.transaction(function (tx) {
		 tx.executeSql('SELECT * FROM FRIENDS', [], function (tx, results) {
				var len = results.rows.length, i;
				msg = "<p>Found rows: " + len + "</p>";
				document.querySelector('#test').innerHTML +=  msg;

				for (i = 0; i < len; i++) {
					 msg = "<p><b>" + results.rows.item(i).name + "</b></p>";
					 // msg = "<p><b>" + results.rows.item(i).id + "</b></p>"
					 document.querySelector('#test').innerHTML +=  msg;
				}
		 }, null);
	});
});





};
