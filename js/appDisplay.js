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

/////// Who's In On the Bill? //////////
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
            var aaa = $("<a/>")
                .text(newArray[i].name)
                .appendTo(li);
        });
    }, 100)
}


$(document).ready(function() {
 populateDropdown();
 possibleFriendsOnTab(payer);
 $("#payer").change(function() {
     payer = $("#payer").val();
     possibleFriendsOnTab();
 });

// Temporary Console Log of DB
 $("#viewDB").on('click', function() {
   	db.transaction(function (tx) {
   		 tx.executeSql('SELECT * FROM FRIENDS', [], function (tx, results) {
          console.log("FRIENDS RESULTS", results);
   		 }, null);
       tx.executeSql('SELECT * FROM TRANSACTIONS', [], function (tx, results) {
          // console.log("TRANSACTIONS RESULTS", results);
   		 }, null);
   	});
   });


 ///////// Calculate IOUs ///////////

 $("#calculate").on("click", function () {
   var itemName = $("#item").val();
   var price = $("#price").val();
   var checkboxes = document.querySelectorAll("input[type=checkbox]:checked");

   // Run check to make sure all fields are filled out properly
   // if (itemName === "" || price === "" || payer === "" || checkboxes.length < 1) {
   //     alert("Please Enter both An Item Name and Price! Also Who Paid The Bill!");
   // }

   var amountDue = (parseInt(price) / (checkboxes.length + 1 )).toFixed(2);
   for (var i = 0; i < checkboxes.length; i++) {
      console.log("AMOUNT DUE TO PAYER BY OTHERS ON BILL", amountDue);
      var friendWhoOwesID = parseInt(checkboxes[i].getAttribute("val"));
       insertTransaction(payer, amountDue, itemName, friendWhoOwesID);
   };
   //Run get results
   getResults();
   setTimeout(function() {
     console.log("Rows Major", rowsMajor);
     // renderResultsTable(rowsMajor);
   }, 1000);

 });

});
