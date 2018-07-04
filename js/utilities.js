var rowsMajor = {};
var data;
// DB FUNCTIONS
function insertUsers(name) {
  db.transaction(function(tx) {
    tx.executeSql('CREATE TABLE IF NOT EXISTS FRIENDS (id INTEGER PRIMARY KEY, name)');
    tx.executeSql('INSERT INTO FRIENDS (name) VALUES (?)', [name]);
  })
}

function insertTransaction(payerID, amountDue, itemName, friendWhoOwesID) {
  db.transaction(function(tx) {
    tx.executeSql('CREATE TABLE IF NOT EXISTS TRANSACTIONS (payerID, amountDue, itemName, friendWhoOwesID)');
    tx.executeSql('INSERT INTO TRANSACTIONS (payerID, amountDue, itemName, friendWhoOwesID) VALUES (?,?,?,?)', [payerID, amountDue, itemName, friendWhoOwesID]);
  })
}

function getResults() {
  db.transaction(function(tx) {
    var rows;
    tx.executeSql('SELECT TRANSACTIONS.payerID, TRANSACTIONS.amountDue, itemName, FRIENDS.name AS "friendWhoOwes", SUM(amountDue) AS "sum" FROM TRANSACTIONS INNER JOIN FRIENDS ON TRANSACTIONS.friendWhoOwesID = FRIENDS.id GROUP BY TRANSACTIONS.payerID, FRIENDS.name', [], function(tx, results) {
      data = results;
    });
  });
}

function dropDB() {
	db.transaction(function(tx) {
		tx.executeSql('DROP TABLE IF EXISTS FRIENDS');
		tx.executeSql('DROP TABLE IF EXISTS TRANSACTIONS');
	});
}
