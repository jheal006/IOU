var friendObject;
var payer;
var friendList = [];
var friendsWhoOwe = [];

////////// Who Paid for the Bill? /////////
function populateDropdown() {
  db.transaction(function (tx) {
     tx.executeSql('SELECT * FROM FRIENDS', [], function (tx, results) {
        var len = results.rows.length, i;
        friendObject = results.rows;
        for (i = 0; i < len; i++) {
          var opt = results.rows.item(i).name;
          var el = document.createElement("option");
          friendList.push(opt);
          el.textContent = opt;
          el.value = opt;
          $("#payer").append(el);
          payer = $("#payer").val();
        }
     }, null);
  });
};

/////// Who's In On the Bill? List Checkboxes //////////
function possibleFriendsOnTab() {
  setTimeout(function() {
    var newArray = Array.from(friendObject);
    // Remove the Indivdual Responsible for Paying the tab
    $("#friendsOnBill").empty();
    var index = newArray.map(function(i) {return i.name; }).indexOf(payer);
      newArray.splice(index,1);
        // Populate List of Remaining Friends who were possibly in on the bill
        $.each(newArray, function(i) {
            var li = $("<ul/>")
                .addClass("ui-menu-item")
                .attr("role", "menuitem")
                .appendTo($("#friendsOnBill"));
            var input = $("<input/>")
                .addClass("ui-all")
                .attr("type", "checkbox")
                .attr("val", newArray[i].id)
                .appendTo(li);
            var aaa = $("<a/> ")
                .text(newArray[i].name)
                .appendTo(li);
        });
    }, 250)
}

function renderResultsTable(array, items) {
  $("#results").empty();
  $.each(array, function(i) {
  var html = "<div class='newReceipts'>";
    html += ("Money Owed To: <h6>" + array[i].payerID + "</h6>");
    html += ("<p>From: " + array[i].friendWhoOwes + "</p>");
    html += ("<p>Amount: <em>" + array[i].sum.toFixed(2) + "</em></p>");
    html += "</div>";
  $("#results").append(html);
  });
}


$(document).ready(function() {
 populateDropdown();
 possibleFriendsOnTab();
 $("#payer").change(function() {
     payer = $("#payer").val();
     possibleFriendsOnTab();
 });

// Temporary Console Log of DB
 $("#viewDB").on('click', function() {
   	db.transaction(function (tx) {
   		 tx.executeSql('SELECT * FROM FRIENDS', [], function (tx, results) {
          // console.log("FRIENDS RESULTS", results);
   		 }, null);
       tx.executeSql('SELECT * FROM TRANSACTIONS', [], function (tx, results) {
          console.log("TRANSACTIONS RESULTS", results);
   		 }, null);
   	});
  });


 ///////// Calculate IOUs ///////////

$("#calculate").on("click", function () {
   //Send to DB
   submitToDB();
   //Get Results from DB
   getResults();
   //Set timeout to allow info retrieval from DB
   setTimeout(function() {
     calcIOU(data);
   }, 250);
 });

});
