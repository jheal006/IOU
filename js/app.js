
window.onload = function () {

// Stop the form from submitting when a button is pressed
// form.addEventListener('submit', function(e) {
$( "form" ).on( "submit", function( event ) {
	console.log("WAT HAPPENED?!?");
	event.preventDefault();
  // Retrieve Friends
	var name = $(this[name='friend1']).val();
  //Create Array of Friends
  // friendList.push(name);
	// console.log("SHOULD OUTPUT Array===", friendList);
// 	iterate and clump them together into var data
//
// 	insertUser(data);
	db.transaction(function (tx) {
		// tx.executeSql('DROP TABLE IF EXISTS FRIENDS');
	 	tx.executeSql('CREATE TABLE IF NOT EXISTS FRIENDS (id INTEGER PRIMARY KEY, name)');
	 	msg = '<p>Log message create and row instered.</p>';
		// tx.executeSql('INSERT INTO FRIENDS (name) VALUES ("foobar")');
		// tx.executeSql('INSERT INTO FRIENDS (name) VALUES ("logmsg")');
		tx.executeSql('INSERT INTO FRIENDS (name) VALUES (?)', [name]);
	});
// 	window.location.reload
	// window.location.href='app.html';

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

  $("#next").on('click', function() {
    console.log('test');
    window.location.href="app.html";
    populateDropdown();
  });

  $("#cleardb").on('click', function() {
    	db.transaction(function (tx) {
    		 tx.executeSql('DROP TABLE IF EXISTS FRIENDS');
      });
    });

};
