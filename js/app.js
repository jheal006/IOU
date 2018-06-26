var friendList = [];
window.onload = function () {

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
// 	iterate and clump them together into var data
	insertUsers(name);
});

// Step to the next Page
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
