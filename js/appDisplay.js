var friendList = [];
var friendsWhoOwe = [];

////////// Who Paid for the Bill? /////////
function populateDropdown() {
  db.transaction(function (tx) {
     tx.executeSql('SELECT * FROM FRIENDS', [], function (tx, results) {
        var len = results.rows.length, i;
        for (i = 0; i < len; i++) {
          var opt = results.rows.item(i).name;
          var el = document.createElement("option");
          friendList.push(opt);
          el.textContent = opt;
          el.value = opt;
          document.getElementById("payer").appendChild(el);
          // console.log("FRIEND LIST", friendList);
        }
     }, null);
  });
};

/////// Who's In On the Bill? //////////
function possibleFriendsOnTab() {
  setTimeout(function() {
    $.each(friendList, function(i) {
        var li = $("<ul/>")
            .addClass("ui-menu-item")
            .attr("role", "menuitem")
            .appendTo($("#friendsOnBill"));
        var input = $("<input/>")
            .addClass("ui-all")
            .attr("type", "checkbox")
            .appendTo(li);
        var aaa = $("<a/>")
            .addClass("ui-all")
            .text(friendList[i])
            .appendTo(li);
    });
  }, 50)
}


window.onload = function () {
 populateDropdown();
 possibleFriendsOnTab();

 ///////// Calculate IOUs ///////////

 $("#calculate").on("click", function () {
   var payer = $("#payer").val();
   var itemName = $("#item").val();
   var price = $("#price").val();
   var checkboxes = document.querySelectorAll("input[type=checkbox]:checked");
   for (var i = 0; i < checkboxes.length; i++) {
       friendsWhoOwe.push(checkboxes[i].parentElement.innerText);
   };
   //Run get results
   insertTransaction(payer, price, friendsWhoOwe);
   getResults();
   renderResultsTable(rows);
 });


};
