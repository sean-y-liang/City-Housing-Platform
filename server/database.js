const mysql = require('mysql2');

// Create a connection pool and export it
const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'housingmatch', 
  database: 'cisc_499', 
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

module.exports = pool.promise();
