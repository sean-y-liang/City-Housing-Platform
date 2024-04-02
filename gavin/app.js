var mysql = require('mysql');
var connection = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'cxf20020425',
  database: "cisc499"
});


var sql = "INSERT INTO manager (PhoneNumber,Fname,Lname) VALUES ('3658364726','Rick','Smith')";
console.log(sql);
connection.query(sql, (err) =>{
    if (err) {
      console,log(err);  
    };
});

