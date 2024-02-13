const mysql = require('mysql2');

// Create a connection pool and export it
const pool = mysql.createPool({
  host: 'localhost',
  user: 'root', // Change this to the username you set when creating the db on your machine
  password: 'housingmatch', // Change this to the password you set when creating the db on your machine
  database: 'cisc_499', 
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

module.exports = pool.promise();
