// Acquiring our mysql connection
const mysql = require("mysql");
var connection;

if (process.env.JAWSDB_URL) {
    connection = mysql.createConnection(process.env.JAWSDB_URL);
} else {
    connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'rootroot',
        database: 'users_db'
    })
}

// Creating conenction
connection.connect(function(err){
    if (err) {
        console.err("error connecting: "+ err.stack);
        return;
    };
    console.log("connected as id: " + connection.threadId);
});

// Exporting connection object to use in other files
module.exports = connection;