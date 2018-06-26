var friendList = [];
window.onload = function () {

// Stop the form from submitting when a button is pressed
// form.addEventListener('submit', function(e) {
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
// 	iterate and clump them together into var data
	insertUsers(name);
	// db.transaction(function (tx) {
	//  	tx.executeSql('CREATE TABLE IF NOT EXISTS FRIENDS (id INTEGER PRIMARY KEY, name)');
	// 	tx.executeSql('INSERT INTO FRIENDS (name) VALUES (?)', [name]);
	// });
});

//
// $("#buttonTest").on('click', function() {
//   	db.transaction(function (tx) {
//   		 tx.executeSql('SELECT * FROM FRIENDS', [], function (tx, results) {
//   				var len = results.rows.length, i;
//   				msg = "<p>Found rows: " + len + "</p>";
//   				document.querySelector('#test').innerHTML +=  msg;
//
//   				for (i = 0; i < len; i++) {
//   					 msg = "<p><b>" + results.rows.item(i).name + "</b></p>";
//   					 msg = "<p><b>" + results.rows.item(i).id + "</b></p>"
//   					 document.querySelector('#test').innerHTML +=  msg;
//   				}
//   		 }, null);
//   	});
//   });

	//Step to the next Page
  $("#next").on('click', function() {
    console.log('test');
    window.location.href="app.html";
  });

	// Temp Clear DB button
  $("#cleardb").on('click', function() {
    	db.transaction(function (tx) {
    		 tx.executeSql('DROP TABLE IF EXISTS FRIENDS');
      });
    });

};
