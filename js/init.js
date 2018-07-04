// Open DB Connection
var db = openDatabase('mydb', '1.0', 'Test DB', 2 * 1024 * 1024);

// Index page friend list populate and page step
var friendList = [];

$(document).ready(function() {
  // Stop the form from submitting when a button is pressed
  $("form").on("submit", function(event) {
    event.preventDefault();
    // Retrieve Friend Name from Input
    var name = $(this[name = 'friend1']).val();
    //Create Array of Friends to Display to user
    friendList.push(name);
    $(".list").empty();
    $('.list').append(
      $('<ul />').append(
        $.map(friendList, function(value, i) {
          return $('<li />', {
            text: value
          });
        })
      )
    )
    //Insert Users To DB and Assign ID
    insertUsers(name);
  });

  // Step to the next Page
  $("#next").on('click', function() {
    if (friendList.length < 2 ) {
        alert("Please Enter at least two friends!");
        return;
    }
    window.location.href = "app.html";
  });

  // Temp Reset DB button
	$("#cleardb").on('click', function() {
		friendList = [];
		$(".list").empty();
		dropDB();
	});


});
