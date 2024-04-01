var express = require('express');
var path = require('path');
var http = require('http'),
    fs = require('fs');
var date = require("date-and-time");
var formidable = require('formidable');

var errors = formidable.formidableErrors;


var app = module.exports = express();
var myHtmlData;

var mysql = require('mysql');
var connection = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'cxf20020425',
  database: "cisc499"
});

var bodyParser = require('body-parser')
app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
}));



app.listen(80);

app.route('/manager')
  .get((req, res) => {
    var PhoneNumber=req.query.PhoneNumber;
    var lname;
    var fname;
    
    if (PhoneNumber) {
        console.log("manager get called, phone number: "+PhoneNumber);
        var sql='select Fname,Lname from manager where PhoneNumber=  '+mysql.escape(PhoneNumber);
        connection.query(sql, function(err,result, fields) {
          if (err) throw err;
          fname=result[0].Fname;
          lname=result[0].Lname;
          res.setHeader("Content-Type", "text/html");
          res.write(`
            <head>manager input</head>
            <form action="managerupdate" method="post"> 
            <h4> PhoneNumber</h4>  
            <input type="text" placeholder="Enter your PhoneNumber" name="PhoneNumber" value="${PhoneNumber}" readonly/>  
            <h4> Last name</h4>  
            <input type="text" placeholder="Enter your Last name" name="lname" value="${lname}" />  
            <h4> First name</h4>  
            <input type="text" placeholder="Enter your First name" name="fname" value="${fname}" /></br></br>
            <input type="submit" value="Save" />  
            </form>  
          `);
          res.send();
        });
        }
    else {
      console.log("manager get called");
      res.setHeader("Content-Type", "text/html");
        res.write(`
          <head>managerinput 　</head>
          <form action= "manager" method="post">  
          <h4> Phone number</h4>  
          <input type="text" placeholder="Enter your Phone number" name="PhoneNumber" /> </br></br> 
          <h4> Last name</h4>  
          <input type="text" placeholder="Enter your Last name" name="lname" />  
          <h4> First name</h4>  
          <input type="text" placeholder="Enter your First name" name="fname"  /></br></br>
          <input type="submit" value="Save" />  
          </form>  
        `);
        res.send();
        }
    })      

  .post((req, res) => {


    var fname=req.body.fname;
    var lname=req.body.lname;
    var PhoneNumber=req.body.PhoneNumber;

    
    console.log("manager post fname: "+fname);
    console.log("manager post lname: "+lname);
    console.log("manager post PhoneNumber: "+PhoneNumber);

    var sql = "INSERT INTO manager (PhoneNumber,Fname,Lname) values ('" + PhoneNumber +"','"+ fname + "','" + lname+ "')";
    console.log(sql);
    connection.query(sql, (err) =>{
      if (err) {
        console,log(err);  
      }
      else {
        console.log('manager record added sucessfully');
      }
    });


    res.send('manager record added');
    res.end();
  })

  app.route('/managerupdateselect')
  .get((req, res) => {
    
    console.log("manager update select called"); 
    var sql="select PhoneNumber from manager ";
    var options;
    var optionstring;
        
    console.log(sql);
    connection.query(sql, function(err,result,rows) {
      if (err) throw err;
      var optionstring="";
      result.forEach(function(row){
        options='<option value="' + row.PhoneNumber +'"> ' +row.PhoneNumber+ '</option>'
        optionstring = optionstring + options;
        console.log(optionstring);
      });
//    });
    PhoneNumber=result[0].PhoneNumber;
    //console.log(count(result));

    res.setHeader("Content-Type", "text/html");
    res.write(`
      <head>manager update select </head>
      <form action="/managerupdate"  method="GET"">  
      <h4> PhoneNumber</h4>  
      <select name="PhoneNumber">
        ${optionstring}
      </select>  
      </br></br>
      <input type="submit" value="Select" />  
      </form>  
    `);
    res.send();
    });
  })
  

  app.route('/managerupdate')
  .get((req, res) => {
    var PhoneNumber=req.query.PhoneNumber;
    var lname;
    var fname;
    
    if (PhoneNumber) {
        console.log("managerupdate get called, phone number: "+PhoneNumber);
        var sql='select Fname,Lname from manager where PhoneNumber=  '+mysql.escape(PhoneNumber);
        connection.query(sql, function(err,result, fields) {
          if (err) throw err;
          fname=result[0].Fname;
          lname=result[0].Lname;
          res.setHeader("Content-Type", "text/html");
          res.write(`
            <head>manager input</head>
            <form action="managerupdate" method="post"> 
            <h4> PhoneNumber</h4>  
            <input type="text" placeholder="Enter your PhoneNumber" name="PhoneNumber" value="${PhoneNumber}" readonly/>  
            <h4> Last name</h4>  
            <input type="text" placeholder="Enter your Last name" name="lname" value="${lname}" />  
            <h4> First name</h4>  
            <input type="text" placeholder="Enter your First name" name="fname" value="${fname}" /></br></br>
            <input type="submit" value="Save" />  
            </form>  
          `);
          res.send();
        });
        }
    })      
    
  
  .post((req, res) => {

    var fname=req.body.fname;
    var lname=req.body.lname;
    var PhoneNumber=req.body.PhoneNumber;

    console.log("manage post fname: "+fname);
    console.log("manage post lname: "+lname);
    console.log("manage post PhoneNumber: "+PhoneNumber);
   
    var sql = "update manager set fname = '"+ fname + "',lname='" + lname+ "' where PhoneNumber ='" + PhoneNumber+"'";

    console.log(sql);
    connection.query(sql, (err) =>{
      if (err) {
        console,log(err);  
      }
      else {
        console.log('manager record update sucessfully');
      }
    });

    
    res.send('manager record updated');
    res.end();
  })



  app.route('/managerdelete')
  .get((req, res) => {
    
    console.log("manager delete called"); 
    var sql="select PhoneNumber from manager ";
    var options;
    var optionstring;
        
    console.log(sql);
    connection.query(sql, function(err,result,rows) {
      if (err) throw err;
      var optionstring="";
      result.forEach(function(row){
        options='<option value="' + row.PhoneNumber +'"> ' +row.PhoneNumber+ '</option>'
        optionstring = optionstring + options;
        console.log(optionstring);
      });
//    });
    PhoneNumber=result[0].PhoneNumber;
    //console.log(count(result));

    res.setHeader("Content-Type", "text/html");
    res.write(`
      <head>manager delete</head>
      <form action="/managerdelete"  method="post">  
      <h4> PhoneNumber</h4>  
      <select name="PhoneNumber">
        ${optionstring}
      </select>  
      </br></br>
      <input type="submit" value="Delete" />  
      </form>  
    `);
    res.send();
    });
  })

  .post((req, res) => {
    var PhoneNumber=req.body.PhoneNumber;
    var sql = "delete from manager where PhoneNumber ='" + PhoneNumber+"'";

    console.log(sql);
    connection.query(sql, (err) =>{
      if (err) {
        console.log(err);  
      }
      else {
        console.log('manager record deleted sucessfully');
      }
    })

    
    res.send('manager record deleted');
    res.end();

  });








  app.route('/manage')
  .get((req, res) => {
      var PhoneNumber=req.query.PhoneNumber;
      console.log(PhoneNumber);
      res.setHeader("Content-Type", "text/html");
      res.write(`
        <head>manageinput </head>
        <form action="/manage" method="post">  
        <h4> House name </h4>  
        <input type="text" placeholder="Enter your House name" name="house_name" /> </br></br> 
        <h4> PhoneNumber</h4>  
        <input type="text" placeholder="Enter your PhoneNumber" name=PhoneNumber value="${PhoneNumber}" readonly />  
        <h4> EndDate</h4>  
        <input type="text" placeholder="Enter your EndDate" name="EndDate" />  
        <h4> StartYear</h4>  
        <input type="text" placeholder="Enter your StartYear" name="StartYear"  /></br></br>
        <input type="submit" value="Save" />  
        </form>  
      `);
      res.send();
    })      

  .post((req, res) => {

    var house_name=req.body.house_name;
    var PhoneNumber=req.body.PhoneNumber;
    var StartYear=req.body.StartYear;
    var EndDate=req.body.EndDate;

    console.log("manage post house_name: "+house_name);
    console.log("manage post PhoneNumber: "+PhoneNumber);
    console.log("manage post StartYear: "+StartYear);
    console.log("manage post EndDate: "+EndDate);

    var sql = "INSERT INTO manage (house_name,PhoneNumber,StartYear,EndDate) values ('" + house_name +"','"+ PhoneNumber + "','" + StartYear+ "','" + EndDate+  "')";
    console.log(sql);
    connection.query(sql, (err) =>{
      if (err) {
        console,log(err);  
      }
      else {
        console.log('manage record added sucessfully');
      }
    });


    res.send('manage record added');
    res.end();
  })



  app.route('/manageupdateselect')
  .get((req, res) => {
    
    console.log("manage update select called"); 
    //var PID=req.body.PID;
    //var PhoneNumber=req.body.PhoneNumber;
    //var StartYear=req.body.StartYear;
    //var EndDate=req.body.EndDate;
    PhoneNumber=3659927636;
    var sql="select PID from manage where PhoneNumber='"+ PhoneNumber +"'";
                
    console.log(sql);
    connection.query(sql, function(err,result,rows) {
      if (err) throw err;
      var optionstring="";
      result.forEach(function(row){
        options='<option value="' + row.PID +'"> ' +row.PID+ '</option>'
        optionstring = optionstring + options;
        console.log(optionstring);
      });
//    });
    PID=result[0].PID;
    //console.log(count(result));

    res.setHeader("Content-Type", "text/html");
    res.write(`
      <head>manage update select </head>
      <form action="/manageupdate"  method="GET"">  
      <h4> PID</h4>  
      <select name="PID">
        ${optionstring}
      </select>  
      </br></br>
      <input type="submit" value="Select" />  
      </form>  
    `);
    res.send();
    });
  })


  app.route('/manageupdate')
  .get((req, res) => {
    var PID=req.query.PID;
    //var PhoneNumber=req.body.PhoneNumber;
    //var StartYear=req.body.StartYear;
    //var EndDate=req.body.EndDate;
    
    if (PID) {
        console.log("manageupdate get called, PID: "+PID);
        var sql="select PID, PhoneNumber,StartYear,EndDate from manage where PID=  '"+PID+"'";
        console.log(sql);
        connection.query(sql, function(err,result, fields) {
          if (err) throw err;
          PID=result[0].PID;
          PhoneNumber=result[0].PhoneNumber;
          StartYear=result[0].StartYear;
          EndDate=result[0].EndDate;
          res.setHeader("Content-Type", "text/html");
          res.write(`
            <head>manageinput </head>
            <form action="/manageupdate" method="post">  
            <h4> PID</h4>  
            <input type="text" placeholder="Enter your PID" name="PID" value="${PID}" readonly/> </br></br> 
            <h4> PhoneNumber</h4>  
            <input type="text" placeholder="Enter your PhoneNumber" name="PhoneNumber" value="${PhoneNumber}" readonly />  
            <h4> EndDate</h4>  
            <input type="text" placeholder="Enter your EndDate" name="EndDate" value="${EndDate}" />  
            <h4> StartYear</h4>  
            <input type="text" placeholder="Enter your StartYear" name="StartYear" value="${StartYear}" /></br></br>
            <input type="submit" value="Save" />  
            </form>  
          `);
          res.send();
        });
        }
    })      
  .post((req, res) => {

    var PID=req.body.PID;
    var PhoneNumber=req.body.PhoneNumber;
    var StartYear=req.body.StartYear;
    var EndDate=req.body.EndDate;

    console.log("manage post PID: "+PID);
    console.log("manage post PhoneNumber: "+PhoneNumber);
    console.log("manage post StartYear: "+StartYear);
    console.log("manage post EndDate: "+EndDate);
   
    var sql = "update manage set PhoneNumber = '"+ PhoneNumber + "',StartYear='" + StartYear+ "',EndDate = '" + EndDate+  "' where PID =" + PID;
   
    console.log(sql);
    connection.query(sql, (err) =>{
      if (err) {
        console,log(err);  
      }
      else {
        console.log('manage record updated sucessfully');
      }
    });

    
    res.send('manage record updated');
    res.end();
  })



  app.route('/managedelete')
  .get((req, res) => {
    
    console.log("manage delete called"); 
    var sql="select house_name from manage ";
    var options;
    var optionstring;
        
    console.log(sql);
    connection.query(sql, function(err,result,rows) {
      if (err) throw err;
      var optionstring="";
      result.forEach(function(row){
        options='<option value="' + row.PID +'"> ' +row.PID+ '</option>'
        optionstring = optionstring + options;
        console.log(optionstring);
      });
//    });
    PID=result[0].PID;
    //console.log(count(result));

    res.setHeader("Content-Type", "text/html");
    res.write(`
      <head>manage delete</head>
      <form action="/managedelete"  method="post">  
      <h4> PID</h4>  
      <select name="PID">
        ${optionstring}
      </select>  
      </br></br>
      <input type="submit" value="Delete" />  
      </form>  
    `);
    res.send();
    });
  })

  .post((req, res) => {
    var PID=req.body.PID;
    var sql = "delete from manage where PID ='" + PID+"'";

    console.log(sql);
    connection.query(sql, (err) =>{
      if (err) {
        console.log(err);  
      }
      else {
        console.log('manage record deleted sucessfully');
      }
    })

    
    res.send('manage record deleted');
    res.end();

  });














  
  
  
  
  

  app.route('/own')
  .get((req, res) => {
        var OID=req.query.OID;
        res.setHeader("Content-Type", "text/html");
        res.write(`
          <head>owninput </head>
          <form action="/own" method="post">  
          <h4> OID</h4>  
          <input type="text" placeholder="Enter your OID" name="OID" value="${OID}" readonly/> </br></br> 
          <h4> house_name</h4>  
          <input type="text" placeholder="Enter your house_name" name="house_name"  /></br></br>
          <input type="submit" value="Save" />  
          </form>  
        `);
        res.send();
    })      

  .post((req, res) => {

    var OID=req.body.OID;
    var house_name=req.body.house_name;
    var PropertyID="";

    console.log("own post OID: "+OID);
    console.log("own post house_name: "+house_name);

    var sql="select PID from property where house_name='"+ house_name +"'";
    console.log(sql);
    connection.query(sql, function(err,result,fields) {
      if (err) throw err;
      sql = "INSERT INTO own (OID,PID) values ('" + OID +"',"+result[0].PID+ ")";
      console.log(sql);
      connection.query(sql, (err) =>{
        if (err) {
          console.log(err);  
        }
        else {
          console.log('own record added sucessfully');
        }
      });

    });
    
    

    res.send('own record added');
    res.end();
  })




  app.route('/owndeleteselect')
  .get((req, res) => {
    
    console.log("own delete select called"); 
    OID=req.query.OID;   
    var sql="select house_name from property join own on property.PID=own.PID where own.OID='"+ OID +"'";
    connection.query(sql, function(err,result,rows) {
      if (err) throw err;
      var optionstring="";
      result.forEach(function(row){
        options='<option value="' + row.house_name +'"> ' +row.house_name+ '</option>'
        optionstring = optionstring + options;
        console.log(optionstring);
      });
//    });
    //OID=result[0].OID;
    //console.log(count(result));

    res.setHeader("Content-Type", "text/html");
    res.write(`
      <head>own delete select </head>
      <form action="/owndelete" method="post">  
      <h4> OID</h4>  
      <input type="text" placeholder="Enter your OID" name="OID" value="${OID}" readonly/> </br></br> 
      <h4> house_name</h4>  
      <select name="house_name">
        ${optionstring}
      </select>  
      </br></br>
      <input type="submit" value="Select" />  
      </form>  
    `);
    res.send();
    });
  })

  app.route('/owndelete')

  .post((req, res) => {
    var house_name=req.body.house_name;
    OID=323628;
    var sql = "delete from own where OID ='" + OID+"' and house_name='" + house_name+"'";

    console.log(sql);
    connection.query(sql, (err) =>{
      if (err) {
        console.log(err);  
      }
      else {
        console.log('own record deleted sucessfully');
      }
    })

    
    res.send('own record deleted');
    res.end();

  });













  app.route('/ownrinfoinput')
  .get((req, res) => {
    var OID=req.query.OID;


    if (OID) {
        console.log("ownrinfoinput get called, ownr ID: "+OID);
        var sql='select OID,fname,lname,PhoneNo,Address from ownr where OID='+ OID;
        connection.query(sql, function(err,result, fields) {
          if (err) throw err;
          OID=result[0].OID;
          fname=result[0].fname;
          lname=result[0].lname;
          PhoneNumber=result[0].PhoneNo;
          Address=result[0].Address;
          res.setHeader("Content-Type", "text/html");
          res.write(`
            <head>ownrinfoinput input</head>
            <form action="/ownrinfoinputupdate"  method="post">  
            
            <h4> Property ID</h4>  
            <input type="text" name="OID" value="${OID}" readonly />  
            <h4> fname</h4>  
            <input type="text" placeholder="Enter your fname" name="fname" value="${fname}" />  
            <h4> lname</h4>  
            <input type="text" placeholder="Enter your lname" name="lname" value="${lname}" />  
            <h4> PhoneNumber</h4>  
            <input type="text" placeholder="Enter your PhoneNumber" name="PhoneNumber" value="${PhoneNumber}" />  
            <h4> Address</h4>  
            <input type="text" placeholder="Enter your Address" name="Address" value="${Address}" /></br></br>
            <input type="submit" value="Save" />  
            </form>  
          `);
          res.send();
        });
        }
    else {
        res.setHeader("Content-Type", "text/html");
        res.write(`
          <head>ownrinfoinputinput </head>
          <form action="/ownrinfoinput" method="post">  
          <h4> OID</h4>  
          <input type="text" placeholder="Enter your OID" name="OID" /> </br></br> 
          <h4> fname</h4>  
          <input type="text" placeholder="Enter your fname" name="fname" />  
          <h4> lname</h4>  
          <input type="text" placeholder="Enter your lname" name="lname" />  
          <h4> PhoneNumber</h4>  
          <input type="text" placeholder="Enter your PhoneNumber" name="PhoneNumber" />  
          <h4> Address</h4>  
          <input type="text" placeholder="Enter your Address" name="Address"  /></br></br>
          <input type="submit" value="Save" />  
          </form>  
        `);
        res.send();
        }
    })      

  .post((req, res) => {

    var OID=req.body.OID;
    var fname=req.body.fname;
    var lname=req.body.lname;
    var PhoneNumber=req.body.PhoneNumber;
    var Address=req.body.Address;

    console.log("ownrinfoinput post OID: "+OID);
    console.log("ownrinfoinput post fname: "+fname);
    console.log("ownrinfoinput post lname: "+lname);
    console.log("ownrinfoinput post PhoneNumber: "+PhoneNumber);
    console.log("ownrinfoinput post Address: "+Address);


    var sql = "INSERT INTO ownr (OID,fname,lname,PhoneNo,Address) values ('" + OID +"','"+ fname+"','"+ lname+"','"+ PhoneNumber+"','"+ Address +  "')";
    
    console.log(sql);
    connection.query(sql, (err) =>{
      if (err) {
        console,log(err);  
      }
      else {
        console.log('ownrinfoinput record added sucessfully');
      }
    });


    res.send('ownrinfoinput record added');
    res.end();
  })



  app.route('/ownrupdateselect')
  .get((req, res) => {
    
    console.log("ownr update select called"); 
    var sql="select OID from ownr ";
    var options;
    var optionstring;
        
    console.log(sql);
    connection.query(sql, function(err,result,rows) {
      if (err) throw err;
      var optionstring="";
      result.forEach(function(row){
        options='<option value="' + row.OID +'"> ' +row.OID+ '</option>'
        optionstring = optionstring + options;
        console.log(optionstring);
      });
//    });
    OID=result[0].OID;
    //console.log(count(result));

    res.setHeader("Content-Type", "text/html");
    res.write(`
      <head>ownr update select </head>
      <form action="/ownrupdate"  method="GET"">  
      <h4> OID</h4>  
      <select name="OID">
        ${optionstring}
      </select>  
      </br></br>
      <input type="submit" value="Select" />  
      </form>  
    `);
    res.send();
    });
  })
  



  app.route('/ownrupdate')

  .get((req, res) => {
    var OID=req.query.OID;
    //var fname=req.body.fname;
    //var lname=req.body.lname;
    //var PhoneNumber=req.body.PhoneNumber;
    //var Address=req.body.Address;
    
    if (OID) {
        console.log("ownrupdate get called, phone number: "+OID);
        var sql='select Fname,Lname,PhoneNo,Address from ownr where OID=  '+mysql.escape(OID);
        connection.query(sql, function(err,result, fields) {
          if (err) throw err;
          fname=result[0].Fname;
          lname=result[0].Lname;
          PhoneNumber=result[0].PhoneNo;
          Address=result[0].Address;
          res.setHeader("Content-Type", "text/html");
          res.write(`
            <head>ownr input</head>
            <form action="ownrupdate" method="post"> 
            <h4> OID</h4>  
            <input type="text" placeholder="Enter your OID" name="OID" value="${OID}" readonly/>  
            <h4> First name</h4>  
            <input type="text" placeholder="Enter your First name" name="fname" value="${fname}" />  
            <h4> Last name</h4>  
            <input type="text" placeholder="Enter your Last name" name="lname" value="${lname}" />  
            <h4> PhoneNumber</h4>  
            <input type="text" placeholder="Enter your PhoneNumber" name="PhoneNumber" value="${PhoneNumber}" />  
            <h4> Address</h4>  
            <input type="text" placeholder="Enter your Address" name="Address" value="${Address}" /></br></br>
            <input type="submit" value="Save" />  
            </form>  
          `);
          res.send();
        });
        }
    })      

  .post((req, res) => {

    var OID=req.body.OID;
    var fname=req.body.fname;
    var lname=req.body.lname;
    var PhoneNumber=req.body.PhoneNumber;
    var Address=req.body.Address;

    console.log("ownrinfoinput post OID: "+OID);
    console.log("ownrinfoinput post fname: "+fname);
    console.log("ownrinfoinput post lname: "+lname);
    console.log("ownrinfoinput post PhoneNumber: "+PhoneNumber);
    console.log("ownrinfoinput post Address: "+Address);

   
    var sql = "update ownr set fname='" + fname+ "',lname='" + lname+ "',PhoneNo='" + PhoneNumber+ "',Address='" + Address +   "' where OID ='" + OID+ "'";
   


    console.log(sql);
    connection.query(sql, (err) =>{
      if (err) {
        console,log(err);  
      }
      else {
        console.log('ownrinfoinput record updated sucessfully');
      }
    });

    
    res.send('ownrinfoinput record updated');
    res.end();
  })



  app.route('/ownrdelete')
  .get((req, res) => {
    
    console.log("ownr delete called"); 
    var sql="select OID from ownr ";
        
    console.log(sql);
    connection.query(sql, function(err,result,rows) {
      if (err) throw err;
      var optionstring="";
      result.forEach(function(row){
        options='<option value="' + row.OID +'"> ' +row.OID+ '</option>'
        optionstring = optionstring + options;
        console.log(optionstring);
      });
//    });
    OID=result[0].OID;
    //console.log(count(result));

    res.setHeader("Content-Type", "text/html");
    res.write(`
      <head>ownr delete</head>
      <form action="/ownrdelete"  method="post">  
      <h4> OID</h4>  
      <select name="OID">
        ${optionstring}
      </select>  
      </br></br>
      <input type="submit" value="Delete" />  
      </form>  
    `);
    res.send();
    });
  })

  .post((req, res) => {
    var OID=req.body.OID;
    var sql = "delete from ownr where OID ='" + OID+"'";

    console.log(sql);
    connection.query(sql, (err) =>{
      if (err) {
        console.log(err);  
      }
      else {
        console.log('ownr record deleted sucessfully');
      }
    })

    
    res.send('ownr record deleted');
    res.end();

  });













  

  app.route('/picture_files')
  .get((req, res) => {
    var PID=req.query.PID;
    console.log("picture_files get called");


    if (PID) {
        console.log("Picture_files get called, property ID: "+PID);
        var sql='select PID,File_name1,File_name2,File_name3,File_name4,File_name5,File_name6,File_name7,File_name8,File_name9,File_name10 from Picture_files where PID='+ PID;
        console.log(sql);
        connection.query(sql, function(err,result, fields) {
          if (err) throw err;
          var PID=result[0].PID;
          var File_name1=result[0].File_name1;
          var File_name2=result[0].File_name2;
          var File_name3=result[0].File_name3;
          var File_name4=result[0].File_name4;
          var File_name5=result[0].File_name5;
          var File_name6=result[0].File_name6;
          var File_name7=result[0].File_name7;
          var File_name8=result[0].File_name8;
          var File_name9=result[0].File_name9;
          var File_name10=result[0].File_name1o;
          res.setHeader("Content-Type", "text/html");
          res.write(`
            <head>Picture_files input</head>
            <form action="/picture_files"  method="post" >  
            
            <h4> PID</h4>  
            <input type="text" name="PID" value="${PID}" readonly />  
            <h4> File_name1</h4>  
            <input type="text" name="File_name1" value="${File_name1}" readonly />  
            <h4> File_name2</h4>  
            <input type="text" name="File_name2" value="${File_name2}" readonly />  
            <h4> File_name3</h4>  
            <input type="text" name="File_name3" value="${File_name3}" readonly />  
            <h4> File_name4</h4>  
            <input type="text" name="File_name4" value="${File_name4}" readonly />  
            <h4> File_name5</h4>  
            <input type="text" name="File_name5" value="${File_name5}" readonly />  
            <h4> File_name6</h4>  
            <input type="text" name="File_name6" value="${File_name6}" readonly />  
            <h4> File_name7</h4>  
            <input type="text" name="File_name7" value="${File_name7}" readonly />  
            <h4> File_name8</h4>  
            <input type="text" name="File_name8" value="${File_name8}" readonly />  
            <h4> File_name9</h4>  
            <input type="text" name="File_name9" value="${File_name9}" readonly />  
                        
            <h4> File_name10</h4>  
            <input type="text" name="File_name10" value="${File_name10}" /></br></br>
            
            
            
            <button type="submit" value="submit" />  
            </form>  

            


          `);
          res.send();
        });
        }
    else {
        res.setHeader("Content-Type", "text/html");
        res.write(`
          <head>Picture_files upload </head>
          <head>Picture_files input</head>
            <form action="/picture_files"  method="post" >  
            
            <h4> PID</h4>  
            <input type="text" name="PID" value="${PID}" readonly />  
            <h4> File_name1</h4>  
            <input type="text" name="File_name1"  readonly />  
            <h4> File_name2</h4>  
            <input type="text" name="File_name2" readonly />  
            <h4> File_name3</h4>  
            <input type="text" name="File_name3"  readonly />  
            <h4> File_name4</h4>  
            <input type="text" name="File_name4" readonly />  
            <h4> File_name5</h4>  
            <input type="text" name="File_name5"  readonly />  
            <h4> File_name6</h4>  
            <input type="text" name="File_name6"  readonly />  
            <h4> File_name7</h4>  
            <input type="text" name="File_name7"  readonly />  
            <h4> File_name8</h4>  
            <input type="text" name="File_name8"  readonly />  
            <h4> File_name9</h4>  
            <input type="text" name="File_name9"  readonly />  
                        
            <h4> File_name10</h4>  
            <input type="text" name="File_name10"  /></br></br>
            
            
            
            <button type="submit" value="submit" />  
            </form>  

          
      `);
        res.send();
        }
    })      

  .post((req, res) => {

    var PID=req.body.PID;
    var File_name1=req.body.File_name1;
    var File_name2=req.body.File_name2;
    var File_name3=req.body.File_name3;
    var File_name4=req.body.File_name4;
    var File_name5=req.body.File_name5;
    var File_name6=req.body.File_name6;
    var File_name7=req.body.File_name7;
    var File_name8=req.body.File_name8;
    var File_name9=req.body.File_name9;
    var File_name10=req.body.File_name10;
    
    console.log("Picture_files post PID: "+PID);
    console.log("Picture_files post File_name1: "+File_name1);
    console.log("Picture_files post File_name2: "+File_name2);
    console.log("Picture_files post File_name3: "+File_name3);
    console.log("Picture_files post File_name4: "+File_name4);
    console.log("Picture_files post File_name5: "+File_name5);
    console.log("Picture_files post File_name6: "+File_name6);
    console.log("Picture_files post File_name7: "+File_name7);
    console.log("Picture_files post File_name8: "+File_name8);
    console.log("Picture_files post File_name9: "+File_name9);
    console.log("Picture_files post File_name10: "+File_name10);


    var sql = "INSERT INTO Picture_files (PID,File_name1,File_name2,File_name3,File_name4,File_name5,File_name6,File_name7,File_name8,File_name9,File_name10 ) values ('" + PID +"','"+ File_name1+"','"+ File_name2+"','"+ File_name3+"','"+ File_name4+"','"+ File_name5+"','"+ File_name6+"','"+ File_name7+"','"+ File_name8+"','"+ File_name9+"','"+ File_name10 + "')";
    console.log(sql);
    connection.query(sql, (err) =>{
      if (err) {
        console,log(err);  
      }
      else {
        console.log('Picture_files record added sucessfully');
      }
    });

    res.send('Picture_files record added sucessfully');
    res.end();

  })




  app.route('/Picture_filesupdateselect')
  .get((req, res) => {
    
    console.log("Picture_files update select called"); 
    OID=req.query.OID;
    var sql="select property.PID, house_name from property join own on property.PID=own.PID where own.OID ='" +OID+"'";
    var options;
    var optionstring;
        
    console.log(sql);
    connection.query(sql, function(err,result,rows) {
      if (err) throw err;
      var optionstring="";
      result.forEach(function(row){
        options='<option value="' + row.PID +'"> ' +row.house_name+ '</option>'
        optionstring = optionstring + options;
        console.log(optionstring);
      });        


    res.setHeader("Content-Type", "text/html");
    res.write(`
      <head>Picture_files update select </head>
      <form action="/Picture_filesupdate"  method="GET"">  
      <h4> house_name</h4>  
      <select name="PID">
        ${optionstring}
      </select>  
      </br></br>
      <input type="submit" value="Select" />  
      </form>  
    `);
    res.send();
    });
  })


  app.route('/Picture_filesupdate')


  .get((req, res) => {
    var PID=req.query.PID;
    var File_name1=req.query.File_name1;
    var File_name2=req.query.File_name2;
    var File_name3=req.query.File_name3;
    var File_name4=req.query.File_name4;
    var File_name5=req.query.File_name5;
    var File_name6=req.query.File_name6;
    var File_name7=req.query.File_name7;
    var File_name8=req.query.File_name8;
    var File_name9=req.query.File_name9;
    var File_name10=req.query.File_name10;
    
    
    console.log("Picture_filesupdate get called, Property ID "+PID);
    var sql='select File_name1,File_name2,File_name3,File_name4,File_name5,File_name6,File_name7,File_name8,File_name9,File_name10 from Picture_files where PID=  '+mysql.escape(PID);
    connection.query(sql, function(err,result, fields) {
      if (err) throw err;
      console.log(result);
      if (result.length != 0) {

        File_name1=result[0].File_name1;
        File_name2=result[0].File_name2;
        File_name3=result[0].File_name3;
        File_name4=result[0].File_name4;
        File_name5=result[0].File_name5;
        File_name6=result[0].File_name6;
        File_name7=result[0].File_name7;
        File_name8=result[0].File_name8;
        File_name9=result[0].File_name9;
        File_name10=result[0].File_name10;
      }else {
        File_name1="";
        File_name2="";
        File_name3="";
        File_name4="";
        File_name5="";
        File_name6="";
        File_name7="";
        File_name8="";
        File_name9="";
        File_name10="";
      }
      
      res.setHeader("Content-Type", "text/html");
      res.write(`
        <head>Picture_files input</head>
        <form action="Picture_filesupdate" method="post"> 
        <h4> PID</h4>  
        <input type="text" placeholder="Enter your PID" name="PID" value="${PID}" readonly/>  
        <h4> File_name1</h4>  
        <input type="text" placeholder="Enter your File_name1" name="File_name1" value="${File_name1}" />  
        <h4> File_name2</h4>  
        <input type="text" placeholder="Enter your File_name2" name="File_name2" value="${File_name2}" />  
        <h4> File_name3</h4>  
        <input type="text" placeholder="Enter your File_name3" name="File_name3" value="${File_name3}" />  
        <h4> File_name4</h4>  
        <input type="text" placeholder="Enter your File_name4" name="File_name4" value="${File_name4}" />  
        <h4> File_name5</h4>  
        <input type="text" placeholder="Enter your File_name5" name="File_name5" value="${File_name5}" />  
        <h4> File_name6</h4>  
        <input type="text" placeholder="Enter your File_name6" name="File_name6" value="${File_name6}" />  
        <h4> File_name7</h4>  
        <input type="text" placeholder="Enter your File_name7" name="File_name7" value="${File_name7}" />  
        <h4> File_name8</h4>  
        <input type="text" placeholder="Enter your File_name8" name="File_name8" value="${File_name8}" />  
        <h4> File_name9</h4>  
        <input type="text" placeholder="Enter your File_name9" name="File_name9" value="${File_name9}" />  
        <h4> File_name10</h4>  
        <input type="text" placeholder="Enter your File_name10" name="File_name10" value="${File_name10}" /></br></br>
        <input type="submit" value="Save" />  
        </form>  
      `);
      res.send();
    });
      
    })      

  .post((req, res) => {

    var PID=req.body.PID;
    var File_name1=req.body.File_name1;
    var File_name2=req.body.File_name2;
    var File_name3=req.body.File_name3;
    var File_name4=req.body.File_name4;
    var File_name5=req.body.File_name5;
    var File_name6=req.body.File_name6;
    var File_name7=req.body.File_name7;
    var File_name8=req.body.File_name8;
    var File_name9=req.body.File_name9;
    var File_name10=req.body.File_name10;
    
    console.log("Picture_files post PID: "+PID);
    console.log("Picture_files post File_name1: "+File_name1);
    console.log("Picture_files post File_name2: "+File_name2);
    console.log("Picture_files post File_name3: "+File_name3);
    console.log("Picture_files post File_name4: "+File_name4);
    console.log("Picture_files post File_name5: "+File_name5);
    console.log("Picture_files post File_name6: "+File_name6);
    console.log("Picture_files post File_name7: "+File_name7);
    console.log("Picture_files post File_name8: "+File_name8);
    console.log("Picture_files post File_name9: "+File_name9);
    console.log("Picture_files post File_name10: "+File_name10);

    var sql='select File_name1 from Picture_files where PID=  '+mysql.escape(PID);
    connection.query(sql, function(err,result, fields) {
      if (err) throw err;
      if (result.length != 0) {
        var sql = "update Picture_files set File_name1='" + File_name1 + "',File_name2='" + File_name2+ "',File_name3='" + File_name3+ "',File_name4='" + File_name4+ "',File_name5='" + File_name5+ "',File_name6='" + File_name6+ "',File_name7='" + File_name7+ "',File_name8='" + File_name8+ "',File_name9='" + File_name9+ "',File_name10='" + File_name10  +   "' where PID ='" + PID+"'";
        console.log(sql);
        connection.query(sql, (err) =>{
          if (err) {
            console,log(err);  
          }
          else {
            console.log('Picture_files record update sucessfully');
          }
        })
      }else {
        var sql = "INSERT INTO Picture_files (PID,File_name1,File_name2,File_name3,File_name4,File_name5,File_name6,File_name7,File_name8,File_name9,File_name10 ) values ('" + PID +"','"+ File_name1+"','"+ File_name2+"','"+ File_name3+"','"+ File_name4+"','"+ File_name5+"','"+ File_name6+"','"+ File_name7+"','"+ File_name8+"','"+ File_name9+"','"+ File_name10 + "')";
        console.log(sql);
        connection.query(sql, (err) =>{
          if (err) {
            console,log(err);  
          }
          else {
            console.log('Picture_files record inserted sucessfully');
          }
        })
      }  
    });

    

    
    res.send('Picture_files record updated');
    res.end();
  })



  app.route('/Picture_filesdelete')
  .get((req, res) => {
    
    console.log("Picture_files delete called"); 
    var sql="select PID from Picture_files ";
        
    console.log(sql);
    connection.query(sql, function(err,result,rows) {
      if (err) throw err;
      var optionstring;
      result.forEach(function(row){
        options='<option value="' + row.PID +'"> ' +row.PID+ '</option>'
        optionstring = optionstring + options;
        console.log(optionstring);
      });
//    });
    PID=result[0].PID;
    //console.log(count(result));

    res.setHeader("Content-Type", "text/html");
    res.write(`
      <head>Picture_files delete</head>
      <form action="/Picture_filesdelete"  method="post">  
      <h4> PID</h4>  
      <select name="PID">
        ${optionstring}
      </select>  
      </br></br>
      <input type="submit" value="Delete" />  
      </form>  
    `);
    res.send();
    });
  })

  .post((req, res) => {
    var PID=req.body.PID;
    var sql = "delete from Picture_files where PID ='" + PID+"'";

    console.log(sql);
    connection.query(sql, (err) =>{
      if (err) {
        console.log(err);  
      }
      else {
        console.log('Picture_files record deleted sucessfully');
      }
    })

    
    res.send('Picture_files record deleted');
    res.end();

  });


  















  

  app.route('/propertyinfoinput')
  .get((req, res) => {
    var house_name=req.query.house_name;
    console.log("property get called" + house_name); 


    if (house_name) {
        console.log("property get called, house_name: "+house_name);
        var sql="select house_name,Address,house_type,Monthly_rent,bedroom,bathroom,parking,laundry,fenced_yard,detached,floor,elevator,number_of_people,private_Kitchen,date_listed from property where house_name='"+ house_name+"'";
        
        console.log(sql);
        connection.query(sql, function(err,result, fields) {
          if (err) throw err;
          var house_name=result[0].house_name;
          var Address=result[0].Address;
          var house_type=result[0].house_type;
          var Monthly_rent=result[0].Monthly_rent;
          var bedroom=result[0].bedroom;
          var bathroom=result[0].bathroom;
          var parking=result[0].parking;
          var laundry=result[0].laundry;
          var fenced_yard=result[0].fenced_yard;
          var detached=result[0].detached;
          var floor=result[0].floor;
          var elevator=result[0].elevator;
          var number_of_people=result[0].number_of_people;
          var private_Kitchen=result[0].private_Kitchen;
          //console.log(result[0].date_listed);
          var date_listed=result[0].date_listed;
          //var date_listed=date.format((new Date(result[0].date_listed)),"yyyymmdd");
          //console.log(date_listed);
          
          res.setHeader("Content-Type", "text/html");
          res.write(`
            <head>propertyinfoinput input</head>
            <form action="/propertyinfoinputupdate"  method="post">  
            <h4> house_name</h4>  
            <input type="text" name="house_name" value="${house_name}" readonly />  
            <h4> Address</h4>  
            <input type="text" name="Address" value="${Address}"  />  
            <h4> house_type</h4>  
            <input type="text" name="house_type" value="${house_type}"  />  
            <h4> Monthly_rent</h4>  
            <input type="text" name="Monthly_rent" value="${Monthly_rent}"  />  
            <h4> bedroom</h4>  
            <input type="text" name="bedroom" value="${bedroom}"  />  
            <h4> bathroom</h4>  
            <input type="text" name="bathroom" value="${bathroom}"  />  
            <h4> parking</h4>  
            <input type="text" name="parking" value="${parking}"  />  
            <h4> laundry</h4>  
            <input type="text" name="laundry" value="${laundry}"  />  
            <h4> fenced_yard</h4>  
            <input type="text" name="fenced_yard" value="${fenced_yard}"  />  
            <h4> detached</h4>  
            <input type="text" name="detached" value="${detached}"  />  
            <h4> floor</h4>  
            <input type="text" name="floor" value="${floor}"  />  
            <h4> elevator</h4>  
            <input type="text" name="elevator" value="${elevator}"  />  
            <h4> detached</h4>  
            <input type="text" name="detached" value="${detached}"  />  
            <h4> number_of_people</h4>  
            <input type="text" name="number_of_people" value="${number_of_people}"  />  
            <h4> private_Kitchen</h4>  
            <input type="text" name="private_Kitchen" value="${private_Kitchen}"  />  
                        
            <h4> date_listed</h4>  
            <input type="text" name="date_listed" value="${date_listed}" /></br></br>
            <input type="submit" value="Save" />  
            </form>  
          `);
          res.send();
        });
        }
    else {
        res.setHeader("Content-Type", "text/html");
        res.write(`
          <head>propertyinfoinputinput </head>
          <form action="/propertyinfoinput" method="post">  

          house_name,Address,house_type,Monthly_rent,bedroom,bathroom,parking,laundry,fenced_yard,detached,floor,elevator,number_of_people,private_Kitchen,date_listed from propertyinfoinput where house_name='+ house_name;
        
          <h4> house_name</h4>  
          <input type="text" placeholder="Enter your house_name" name="house_name" /> </br></br> 
          <h4> Address</h4>  
          <input type="text" placeholder="Enter your Address" name="Address" />  
          <h4> house_type</h4>  
          <input type="text" placeholder="Enter your house_type" name="house_type" />  
          <h4> Monthly_rent</h4>  
          <input type="text" placeholder="Enter your Monthly_rent" name="Monthly_rent" />  
          <h4> bedroom</h4>  
          <input type="text" placeholder="Enter your bedroom" name="bedroom" />  
          <h4> bathroom</h4>  
          <input type="text" placeholder="Enter your bathroom" name="bathroom" />  
          <h4> parking</h4>  
          <input type="text" placeholder="Enter your parking" name="parking" />  
          <h4> laundry</h4>  
          <input type="text" placeholder="Enter your laundry" name="laundry" />  
          <h4> fenced_yard</h4>  
          <input type="text" placeholder="Enter your fenced_yard" name="fenced_yard" />  
          <h4> detached</h4>  
          <input type="text" placeholder="Enter your detached" name="detached" />  
          <h4> floor</h4>  
          <input type="text" placeholder="Enter your floor" name="floor" />  
          <h4> elevator</h4>  
          <input type="text" placeholder="Enter your elevator" name="elevator" />  
          <h4> number_of_people</h4>  
          <input type="text" placeholder="Enter your number_of_people" name="number_of_people" />  
          <h4> private_Kitchen</h4>  
          <input type="text" placeholder="Enter your private_Kitchen" name="private_Kitchen" />  
          <h4> date_listed</h4>  
          <input type="text" placeholder="Enter your date_listed" name="date_listed"  /></br></br>
          <input type="submit" value="Save" />  
          </form>  
        `);
        res.send();
        }
    })      

  .post((req, res) => {

    var house_name=req.body.house_name;
    var Address=req.body.Address;
    var house_type=req.body.house_type;
    var Monthly_rent=req.body.Monthly_rent;
    var bedroom=req.body.bedroom;
    var bathroom=req.body.bathroom;
    var parking=req.body.parking;
    var laundry=req.body.laundry;
    var fenced_yard=req.body.fenced_yard;
    var detached=req.body.detached;
    var floor=req.body.floor;
    var elevator=req.body.elevator;
    var number_of_people=req.body.number_of_people;
    var private_Kitchen=req.body.private_Kitchen;
    var date_listed=req.body.date_listed;
    
    console.log("propertyinfoinput post house_name: "+house_name);
    console.log("propertyinfoinput post Address: "+Address);
    console.log("propertyinfoinput post house_type: "+house_type);
    console.log("propertyinfoinput post Monthly_rent: "+Monthly_rent);
    console.log("propertyinfoinput post bedroom: "+bedroom);
    console.log("propertyinfoinput post bathroom: "+bathroom);
    console.log("propertyinfoinput post parking: "+parking);
    console.log("propertyinfoinput post laundry: "+laundry);
    console.log("propertyinfoinput post fenced_yard: "+fenced_yard);
    console.log("propertyinfoinput post detached: "+detached);
    console.log("propertyinfoinput post floor: "+floor);
    console.log("propertyinfoinput post elevator: "+elevator);
    console.log("propertyinfoinput post number_of_people: "+number_of_people);
    console.log("propertyinfoinput post private_Kitchen: "+private_Kitchen);
    console.log("propertyinfoinput post date_listed: "+date_listed);
    

    var sql = "INSERT INTO property (house_name,Address, house_type,Monthly_rent,bedroom,bathroom,parking,laundry,fenced_yard,Detached,floor,elevator,number_of_people,private_Kitchen,date_listed) values ('" 
    + house_name +"','"+ Address+"','"+ house_type+
    "','"+ Monthly_rent+"','"+ bedroom+"','"+ bathroom+"',"+ parking+",'"+ laundry+"',"+ fenced_yard+",'"+
    detached+"','"+ floor+"',"+ elevator+",'"+ number_of_people+"',"+ private_Kitchen+",'"+ date_listed + "')";
   
   
    console.log(sql);
    connection.query(sql, (err) =>{
      if (err) {
        console.log(err);  
      }
      else {
        console.log('property record added sucessfully');
      }
    });

    res.send('property record added sucessfully');
    res.end();

  })



  app.route('/propertyupdateselect')
  .get((req, res) => {
    OID=req.query.OID;
    console.log("property update select called"); 
    var sql="select house_name from property join own on property.PID=own.PID where own.OID ='" +OID+"'";
    var options;
    var optionstring;
        
    console.log(sql);
    connection.query(sql, function(err,result,rows) {
      if (err) throw err;
      var optionstring="";
      result.forEach(function(row){
        options='<option value="' + row.house_name +'"> ' +row.house_name+ '</option>'
        optionstring = optionstring + options;
        console.log(optionstring);
      });
//    });
    //house_name=result[0].house_name;
    //console.log(count(result));

    res.setHeader("Content-Type", "text/html");
    res.write(`
      <head>property update select </head>
      <form action="/propertyupdate"  method="GET"">  
      <h4> house_name</h4>  
      <select name="house_name">
        ${optionstring}
      </select>  
      </br></br>
      <a href="http://localhost/ownermainten?OID=${OID}"> Back </a>
      </br></br>
      <input type="submit" value="Select" />  
      </form>  
    `);
    res.send();
    });
  })


  app.route('/propertyupdate')

  .get((req, res) => {
    var house_name=req.query.house_name;
    //var Address=req.query.Address;
    //var house_type=req.query.house_type;
    //var Monthly_rent=req.query.Monthly_rent;
    //var bedroom=req.query.bedroom;
    //var bathroom=req.query.bathroom;
    //var parking=req.query.parking;
    //var laundry=req.query.laundry;
    //var fenced_yard=req.query.fenced_yard;
    //var Detached=req.query.Detached;
    //var floor=req.query.floor;
    //var elevator=req.query.elevator;
    //var number_of_people=req.query.number_of_people;
    //var private_Kitchen=req.query.private_Kitchen;
    //var date_listed=req.query.date_listed;
    
    if (house_name) {
        console.log("propertyupdate get called, house_name: "+house_name);
        var sql='select PID,Address, house_type,Monthly_rent,bedroom,bathroom,parking,laundry,fenced_yard,Detached,floor,elevator,number_of_people,private_Kitchen,date_listed from property where house_name=  '+mysql.escape(house_name);
        connection.query(sql, function(err,result, fields) {
          if (err) throw err;
          PID=result[0].PID
          Address=result[0].Address;
          house_type=result[0].house_type;
          Monthly_rent=result[0].Monthly_rent;
          bedroom=result[0].bedroom;
          bathroom=result[0].bathroom;
          parking=result[0].parking;
          laundry=result[0].laundry;
          fenced_yard=result[0].fenced_yard;
          Detached=result[0].Detached;
          floor=result[0].floor;
          elevator=result[0].elevator;
          number_of_people=result[0].number_of_people;
          private_Kitchen=result[0].private_Kitchen;
          date_listed=result[0].date_listed;
          

          res.setHeader("Content-Type", "text/html");
          res.write(`
            <head>property input</head>
            <form action="propertyupdate" method="post"> 
            <h4> PID</h4>  
            <input type="text" name="PID" value="${PID}" readonly/>  
            
            <h4> house_name</h4>  
            <input type="text" placeholder="Enter your house_name" name="house_name" value="${house_name}" readonly/>  
            <h4> Address</h4>  
            <input type="text" placeholder="Enter your Address" name="Address" value="${Address}" />  
            <h4> house_type</h4>  
            <input type="text" placeholder="Enter your house_type" name="house_type" value="${house_type}" />  
            <h4> Monthly_rent</h4>  
            <input type="text" placeholder="Enter your Monthly_rent" name="Monthly_rent" value="${Monthly_rent}" />  
            <h4> bedroom</h4>  
            <input type="text" placeholder="Enter your bedroom" name="bedroom" value="${bedroom}" />  
            <h4> bathroom</h4>  
            <input type="text" placeholder="Enter your bathroom" name="bathroom" value="${bathroom}" />  
            <h4> parking</h4>  
            <input type="text" placeholder="Enter your parking" name="parking" value="${parking}" />  
            <h4> laundry</h4>  
            <input type="text" placeholder="Enter your laundry" name="laundry" value="${laundry}" />  
            <h4> fenced_yard</h4>  
            <input type="text" placeholder="Enter your fenced_yard" name="fenced_yard" value="${fenced_yard}" />  
            <h4> Detached</h4>  
            <input type="text" placeholder="Enter your Detached" name="Detached" value="${Detached}" />  
            <h4> floor</h4>  
            <input type="text" placeholder="Enter your floor" name="floor" value="${floor}" />  
            <h4> elevator</h4>  
            <input type="text" placeholder="Enter your elevator" name="elevator" value="${elevator}" />  
            <h4> number_of_people</h4>  
            <input type="text" placeholder="Enter your number_of_people" name="number_of_people" value="${number_of_people}" />  
            <h4> private_Kitchen</h4>  
            <input type="text" placeholder="Enter your private_Kitchen" name="private_Kitchen" value="${private_Kitchen}" />  

            <h4> date_listed</h4>  
            <input type="text" placeholder="Enter your date_listed" name="date_listed" value="${date_listed}" /></br></br>
            <input type="submit" value="Save" />  
            </form>  
          `);
          res.send();
        });
        }
    })    

  .post((req, res) => {

    var house_name=req.body.house_name;
    var Address=req.body.Address;
    var house_type=req.body.house_type;
    var Monthly_rent=req.body.Monthly_rent;
    var bedroom=req.body.bedroom;
    var bathroom=req.body.bathroom;
    var parking=req.body.parking;
    var laundry=req.body.laundry;
    var fenced_yard=req.body.fenced_yard;
    var detached=req.body.detached;
    var floor=req.body.floor;
    var elevator=req.body.elevator;
    var number_of_people=req.body.number_of_people;
    var private_Kitchen=req.body.private_Kitchen;
    var date_listed=req.body.date_listed;
    
    console.log("propertyinfoinput post house_name: "+house_name);
    console.log("propertyinfoinput post Address: "+Address);
    console.log("propertyinfoinput post house_type: "+house_type);
    console.log("propertyinfoinput post Monthly_rent: "+Monthly_rent);
    console.log("propertyinfoinput post bedroom: "+bedroom);
    console.log("propertyinfoinput post bathroom: "+bathroom);
    console.log("propertyinfoinput post parking: "+parking);
    console.log("propertyinfoinput post laundry: "+laundry);
    console.log("propertyinfoinput post fenced_yard: "+fenced_yard);
    console.log("propertyinfoinput post detached: "+detached);
    console.log("propertyinfoinput post floor: "+floor);
    console.log("propertyinfoinput post elevator: "+elevator);
    console.log("propertyinfoinput post number_of_people: "+number_of_people);
    console.log("propertyinfoinput post private_Kitchen: "+private_Kitchen);
    console.log("propertyinfoinput post date_listed: "+date_listed);

    var sql = "update property set Address='" + Address + "',house_type='" + house_type+ "',Monthly_rent='" + Monthly_rent+ "',bedroom='" + bedroom+ "',bathroom='" + bathroom+ "',parking='" + parking
    + "',laundry='" + laundry+ "',fenced_yard='" + fenced_yard+ "',detached='" + detached+ "',floor='" + floor
    + "',elevator='" + elevator+ "',number_of_people='" + number_of_people+ "',private_Kitchen='" + private_Kitchen+ "',date_listed='" + date_listed  +   "' where house_name ='" + house_name+"'";


    console.log(sql);
    connection.query(sql, (err) =>{
      if (err) {
        console.log(err);  
      }
      else {
        console.log('propertyinfoinput record update sucessfully');
      }
    })

    res.setHeader("Content-Type", "text/html");
    res.write(`
    <h4> propertyinfoinput record updated</h4>  

    <a href="http://localhost/ownerselect"> Back </a>
    `);
    res.send();
//    res.end();
  })



  app.route('/propertydelete')
  .get((req, res) => {
    var OID=req.query.OID;
    var PhoneNumber=req.query.PhoneNumber;
    var sql="";
    console.log("property delete called"); 
    if (OID) {
      sql="select property.house_name from property join own on property.house_name = own.house_name where own.OID = '" + OID + "'";
    }
    
    if (PhoneNumber) {
      sql="select property.house_name from property join manage on property.house_name=manage.house_name where manage.PhoneNumber = '" + PhoneNumber + "'";
    }
    
    console.log(sql);
    connection.query(sql, function(err,result,rows) {
      if (err) throw err;
      //console.log(result);
      //if (result.) {
      var optionstring;
      result.forEach(function(row){
        options='<option value="' + row.house_name +'"> ' +row.house_name+ '</option>'
        optionstring = optionstring + options;
        console.log(optionstring);
        });
       
//    });
    house_name=result[0].house_name;
    //console.log(count(result));

    res.setHeader("Content-Type", "text/html");
    res.write(`
      <head>property delete</head>
      <form action="/propertydelete"  method="post">  
      <h4> Owner ID</h4>  
      <input type="text" name="OID" value= ${OID} readonly/> 
      <h4> Manager's PhoneNumber</h4>  
      <input type="text" name="PhoneNumber" value= ${PhoneNumber} readonly/> 

      <h4> house_name</h4>  
      <select name="house_name">
        ${optionstring}
      </select>  
      </br></br>
      <input type="submit" value="Delete" />  
      </form>  
    `);
    res.send();
    });
  })

  .post((req, res) => {
    var OID=req.body.OID;
    var PhoneNumber=req.body.PhoneNumber;
    
    var house_name=req.body.house_name;
    var sql = "delete from property where house_name ='" + house_name+"'";

    console.log(sql);
    connection.query(sql, (err) =>{
      if (err) {
        console.log(err);  
      }
      else {
        console.log('property record deleted sucessfully from property table');
      }
    })

    if (OID) {
      sql = "delete from own where house_name ='" + house_name+"' and OID = '" + OID + "'";
    }
    if (PhoneNumber) {
      sql = "delete from manage where house_name ='" + house_name+"' and PhoneNumber = '" + PhoneNumber + "'";
    }

    console.log(sql);
    connection.query(sql, (err) =>{
      if (err) {
        console.log(err);  
      }
      else {
        console.log('property record deleted sucessfully from own table');
      }
    })
    
    res.send('property record deleted');
    res.end();

  });














  app.route('/Furnitures')
  .get((req, res) => {
    var PID=req.query.PID;
    console.log("Furnitures get called" + PID); 


    if (PID) {
        console.log("Furnitures get called, PID: "+PID);
        var sql="select PID,Furniture_name1,Furniture_name2,Furniture_name3,Furniture_name4,Furniture_name5,Furniture_name6,Furniture_name7,Furniture_name8,Furniture_name9,Furniture_name10 from Furnitures where PID="+ PID;
        
        console.log(sql);
        connection.query(sql, function(err,result, fields) {
          if (err) throw err;

          //var PID=result[0].PID;
          var Furniture_name1=result[0].Furniture_name1;
          var Furniture_name2=result[0].Furniture_name2;
          var Furniture_name3=result[0].Furniture_name3;
          var Furniture_name4=result[0].Furniture_name4;
          var Furniture_name5=result[0].Furniture_name5;
          var Furniture_name6=result[0].Furniture_name6;
          var Furniture_name7=result[0].Furniture_name7;
          var Furniture_name8=result[0].Furniture_name8;
          var Furniture_name9=result[0].Furniture_name9;
          var Furniture_name10=result[0].Furniture_name10;


          res.setHeader("Content-Type", "text/html");
          res.write(`
            <head>Furnitures input</head>
            <form action="/Furnituresupdate"  method="post">  
            <h4> PID</h4>  
            <input type="text" name="PID" value="${PID}" readonly />  
            <h4> Furniture_name1</h4>  
            <input type="text" name="Furniture_name1" value="${Furniture_name1}"  />  
            <h4> Furniture_name2</h4>  
            <input type="text" name="Furniture_name2" value="${Furniture_name2}"  />  
            <h4> Furniture_name3</h4>  
            <input type="text" name="Furniture_name3" value="${Furniture_name3}"  />  
            <h4> Furniture_name4</h4>  
            <input type="text" name="Furniture_name4" value="${Furniture_name4}"  />  
            <h4> Furniture_name5</h4>  
            <input type="text" name="Furniture_name5" value="${Furniture_name5}"  />  
            <h4> Furniture_name6</h4>  
            <input type="text" name="Furniture_name6" value="${Furniture_name6}"  />  
            <h4> Furniture_name7</h4>  
            <input type="text" name="Furniture_name7" value="${Furniture_name7}"  />  
            <h4> Furniture_name8</h4>  
            <input type="text" name="Furniture_name8" value="${Furniture_name8}"  />  
            <h4> Furniture_name9</h4>  
            <input type="text" name="Furniture_name9" value="${Furniture_name9}"  />  
                        
            <h4> Furniture_name10</h4>  
            <input type="text" name="Furniture_name10" value="${Furniture_name10}" /></br></br>
            <input type="submit" value="Save" />  
            </form>  
          `);
          res.send();
        });
        }
    else {
        res.setHeader("Content-Type", "text/html");
        res.write(`
          <head>Furnituresinput </head>
          <form action="/Furnitures" method="post">  

          PID,Furniture_name1,Furniture_name2,Furniture_name3,Furniture_name4,Furniture_name5,Furniture_name6,Furniture_name7,Furniture_name8,Furniture_name9,Furniture_name10 from Furnitures where house_name='+ house_name;
        
          <h4> PID</h4>  
          <input type="text" placeholder="Enter your PID" name="PID" /> </br></br> 
          <h4> Furniture_name1</h4>  
          <input type="text" placeholder="Enter your Furniture_name1" name="Furniture_name1" />  
          <h4> Furniture_name2</h4>  
          <input type="text" placeholder="Enter your Furniture_name2" name="Furniture_name2" />  
          <h4> Furniture_name3</h4>  
          <input type="text" placeholder="Enter your Furniture_name3" name="Furniture_name3" />  
          <h4> Furniture_name4</h4>  
          <input type="text" placeholder="Enter your Furniture_name4" name="Furniture_name4" />  
          <h4> Furniture_name5</h4>  
          <input type="text" placeholder="Enter your Furniture_name5" name="Furniture_name5" />  
          <h4> Furniture_name6</h4>  
          <input type="text" placeholder="Enter your Furniture_name6" name="Furniture_name6" />  
          <h4> Furniture_name7</h4>  
          <input type="text" placeholder="Enter your Furniture_name7" name="Furniture_name7" />  
          <h4> Furniture_name8</h4>  
          <input type="text" placeholder="Enter your Furniture_name8" name="Furniture_name8" />  
          <h4> Furniture_name9</h4>  
          <input type="text" placeholder="Enter your Furniture_name9" name="Furniture_name9" />  
          
          <h4> Furniture_name10</h4>  
          <input type="text" placeholder="Enter your Furniture_name10" name="Furniture_name10"  /></br></br>
          <input type="submit" value="Save" />  
          </form>  
        `);
        res.send();
        }
    })      

  .post((req, res) => {

    var PID=req.body.PID;
    var Furniture_name1=req.body.Furniture_name1;
    var Furniture_name2=req.body.Furniture_name2;
    var Furniture_name3=req.body.Furniture_name3;
    var Furniture_name4=req.body.Furniture_name4;
    var Furniture_name5=req.body.Furniture_name5;
    var Furniture_name6=req.body.Furniture_name6;
    var Furniture_name7=req.body.Furniture_name7;
    var Furniture_name8=req.body.Furniture_name8;
    var Furniture_name9=req.body.Furniture_name9;
    var Furniture_name10=req.body.Furniture_name10;

    
    console.log("Furnitures post PID: "+PID);
    console.log("Furnitures post Furniture_name1: "+Furniture_name1);
    console.log("Furnitures post Furniture_name2: "+Furniture_name2);
    console.log("Furnitures post Furniture_name3: "+Furniture_name3);
    console.log("Furnitures post Furniture_name4: "+Furniture_name4);
    console.log("Furnitures post Furniture_name5: "+Furniture_name5);
    console.log("Furnitures post Furniture_name6: "+Furniture_name6);
    console.log("Furnitures post Furniture_name7: "+Furniture_name7);
    console.log("Furnitures post Furniture_name8: "+Furniture_name8);
    console.log("Furnitures post Furniture_name9: "+Furniture_name9);
    console.log("Furnitures post Furniture_name10: "+Furniture_name10);

    var sql = "INSERT INTO Furnitures (PID,Furniture_name1,Furniture_name2,Furniture_name3,Furniture_name4,Furniture_name5,Furniture_name6,Furniture_name7,Furniture_name8,Furniture_name9,Furniture_name10) values ('" 
    + PID +"','"+ Furniture_name1+"','"+ Furniture_name2+
    "','"+ Furniture_name3+"','"+ Furniture_name4+"','"+ Furniture_name5+"','"+ Furniture_name6+"','"+ Furniture_name7+"','"+ Furniture_name8+"','"+
    Furniture_name9+"','"+ Furniture_name10 + "')";


    console.log(sql);
    connection.query(sql, (err) =>{
      if (err) {
        console.log(err);  
      }
      else {
        console.log('Furnitures record added sucessfully');
      }
    });

    

  })

  app.route('/Furnituresupdateselect')
  .get((req, res) => {
    
    console.log("Furnitures update select called"); 
    var sql="select PID from Furnitures ";
    var options;
    var optionstring;
        
    console.log(sql);
    connection.query(sql, function(err,result,rows) {
      if (err) throw err;
      var optionstring="";
      result.forEach(function(row){
        options='<option value="' + row.PID +'"> ' +row.PID+ '</option>'
        optionstring = optionstring + options;
        console.log(optionstring);
      });
//    });
    PID=result[0].PID;
    //console.log(count(result));

    res.setHeader("Content-Type", "text/html");
    res.write(`
      <head>Furnitures update select </head>
      <form action="/Furnituresupdate"  method="GET"">  
      <h4> PID</h4>  
      <select name="PID">
        ${optionstring}
      </select>  
      </br></br>
      <input type="submit" value="Select" />  
      </form>  
    `);
    res.send();
    });
  })

  app.route('/Furnituresupdate')


  .get((req, res) => {
    var PID=req.query.PID;
    var Furniture_name1=req.query.Furniture_name1;
    var Furniture_name2=req.query.Furniture_name2;
    var Furniture_name3=req.query.Furniture_name3;
    var Furniture_name4=req.query.Furniture_name4;
    var Furniture_name5=req.query.Furniture_name5;
    var Furniture_name6=req.query.Furniture_name6;
    var Furniture_name7=req.query.Furniture_name7;
    var Furniture_name8=req.query.Furniture_name8;
    var Furniture_name9=req.query.Furniture_name9;
    var Furniture_name10=req.query.Furniture_name10;
    
    if (PID) {
        console.log("Furnituresupdate get called, phone number: "+PID);
        var sql='select Furniture_name1,Furniture_name2,Furniture_name3,Furniture_name4,Furniture_name5,Furniture_name6,Furniture_name7,Furniture_name8,Furniture_name9,Furniture_name10 from Furnitures where PID=  '+mysql.escape(PID);
        connection.query(sql, function(err,result, fields) {
          if (err) throw err;
          Furniture_name1=result[0].Furniture_name1;
          Furniture_name2=result[0].Furniture_name2;
          Furniture_name3=result[0].Furniture_name3;
          Furniture_name4=result[0].Furniture_name4;
          Furniture_name5=result[0].Furniture_name5;
          Furniture_name6=result[0].Furniture_name6;
          Furniture_name7=result[0].Furniture_name7;
          Furniture_name8=result[0].Furniture_name8;
          Furniture_name9=result[0].Furniture_name9;
          Furniture_name10=result[0].Furniture_name10;


          res.setHeader("Content-Type", "text/html");
          res.write(`
            <head>Furnitures input</head>
            <form action="Furnituresupdate" method="post"> 
            <h4> PID</h4>  
            <input type="text" placeholder="Enter your PID" name="PID" value="${PID}" readonly/>  
            <h4> Furniture_name1</h4>  
            <input type="text" placeholder="Enter your Furniture_name1" name="Furniture_name1" value="${Furniture_name1}" />  
            <h4> Furniture_name2</h4>  
            <input type="text" placeholder="Enter your Furniture_name2" name="Furniture_name2" value="${Furniture_name2}" />
            <h4> Furniture_name3</h4>  
            <input type="text" placeholder="Enter your Furniture_name3" name="Furniture_name3" value="${Furniture_name3}" />
            <h4> Furniture_name4</h4>  
            <input type="text" placeholder="Enter your Furniture_name4" name="Furniture_name4" value="${Furniture_name4}" />
            <h4> Furniture_name5</h4>  
            <input type="text" placeholder="Enter your Furniture_name5" name="Furniture_name5" value="${Furniture_name5}" />
            <h4> Furniture_name6</h4>  
            <input type="text" placeholder="Enter your Furniture_name6" name="Furniture_name6" value="${Furniture_name6}" />
            <h4> Furniture_name7</h4>  
            <input type="text" placeholder="Enter your Furniture_name7" name="Furniture_name7" value="${Furniture_name7}" />
            <h4> Furniture_name8</h4>  
            <input type="text" placeholder="Enter your Furniture_name8" name="Furniture_name8" value="${Furniture_name8}" />
            <h4> Furniture_name9</h4>  
            <input type="text" placeholder="Enter your Furniture_name9" name="Furniture_name9" value="${Furniture_name9}" />

            <h4> Furniture_name10</h4>  
            <input type="text" placeholder="Enter your Furniture_name10" name="Furniture_name10" value="${Furniture_name10}" /></br></br>
            <input type="submit" value="Save" />  
            </form>  
          `);
          res.send();
        });
        }
    })      


  .post((req, res) => {

    var PID=req.body.PID;
    var Furniture_name1=req.body.Furniture_name1;
    var Furniture_name2=req.body.Furniture_name2;
    var Furniture_name3=req.body.Furniture_name3;
    var Furniture_name4=req.body.Furniture_name4;
    var Furniture_name5=req.body.Furniture_name5;
    var Furniture_name6=req.body.Furniture_name6;
    var Furniture_name7=req.body.Furniture_name7;
    var Furniture_name8=req.body.Furniture_name8;
    var Furniture_name9=req.body.Furniture_name9;
    var Furniture_name10=req.body.Furniture_name10;

    
    console.log("Furnitures post PID: "+PID);
    console.log("Furnitures post Furniture_name1: "+Furniture_name1);
    console.log("Furnitures post Furniture_name2: "+Furniture_name2);
    console.log("Furnitures post Furniture_name3: "+Furniture_name3);
    console.log("Furnitures post Furniture_name4: "+Furniture_name4);
    console.log("Furnitures post Furniture_name5: "+Furniture_name5);
    console.log("Furnitures post Furniture_name6: "+Furniture_name6);
    console.log("Furnitures post Furniture_name7: "+Furniture_name7);
    console.log("Furnitures post Furniture_name8: "+Furniture_name8);
    console.log("Furnitures post Furniture_name9: "+Furniture_name9);
    console.log("Furnitures post Furniture_name10: "+Furniture_name10);

    var sql = "update Furnitures set Furniture_name1='" + Furniture_name1 + "',Furniture_name2='" + Furniture_name2+ 
    "',Furniture_name3='" + Furniture_name3+ "',Furniture_name4='" + Furniture_name4+ "',Furniture_name5='" + Furniture_name5+ 
    "',Furniture_name6='" + Furniture_name6+ "',Furniture_name7='" + Furniture_name7+ "',Furniture_name8='" + Furniture_name8+ 
    "',Furniture_name9='" + Furniture_name9+ "',Furniture_name10='" + Furniture_name10  +   "' where PID =" + PID;



    console.log(sql);
    connection.query(sql, (err) =>{
      if (err) {
        console.log(err);  
      }
      else {
        console.log('Furnitures record update sucessfully');
      }
    })

    
    res.send('Furnitures record updated');
    res.end();
  })




  app.route('/Furnituresdelete')
  .get((req, res) => {
    
    console.log("Furnitures delete called"); 
    var sql="select PID from Furnitures ";
        
    console.log(sql);
    connection.query(sql, function(err,result,rows) {
      if (err) throw err;
      var optionstring;
      result.forEach(function(row){
        options='<option value="' + row.PID +'"> ' +row.PID+ '</option>'
        optionstring = optionstring + options;
        console.log(optionstring);
      });
//    });
    PID=result[0].PID;
    //console.log(count(result));

    res.setHeader("Content-Type", "text/html");
    res.write(`
      <head>Furnitures delete</head>
      <form action="/Furnituresdelete"  method="post">  
      <h4> PID</h4>  
      <select name="PID">
        ${optionstring}
      </select>  
      </br></br>
      <input type="submit" value="Delete" />  
      </form>  
    `);
    res.send();
    });
  })

  .post((req, res) => {
    var PID=req.body.PID;
    var sql = "delete from Furnitures where PID ='" + PID+"'";

    console.log(sql);
    connection.query(sql, (err) =>{
      if (err) {
        console.log(err);  
      }
      else {
        console.log('Furnitures record deleted sucessfully');
      }
    })

    
    res.send('Furnitures record deleted');
    res.end();

  });


  app.route('/ownerselect')
  .get((req, res) => {
    
    console.log("owner select called"); 
    var sql="select OID from ownr ";
        
    console.log(sql);
    connection.query(sql, function(err,result,rows) {
      if (err) throw err;
      var optionstring;
      result.forEach(function(row){
        options='<option value="' + row.OID +'"> ' +row.OID+ '</option>'
        optionstring = optionstring + options;
        console.log(optionstring);
      });
//    });
    //PID=result[0].PID;
    //console.log(count(result));

    res.setHeader("Content-Type", "text/html");
    res.write(`
      <head>Furnitures delete</head>
      <form action="/ownermainten"  method="GET">  
      <h4> OID</h4>  
      <select name="OID">
        ${optionstring}
      </select>  
      </br></br>
      <input type="submit" value="Select" />  
      </form>  
    `);
    res.send();
    });
  })

  var fname="";
  var lname="";
  var PhoneNo="";
  var Address="";

  app.route('/ownermainten')
  .get((req, res) => {
    
    console.log("owner mianten called"); 
    var OID=req.query.OID;
    //var sql="select Fname, Lname, PhoneNo, Address from ownr where OID = '"+ OID+"'";
      
    //console.log(sql);
    //connection.query(sql, function(err,result,rows) {
    //  if (err) throw err;
    //  fname=result[0].Fname;
    //  lname=result[0].Lname;
    //  PhoneNo=result[0].PhoneNo;
    //  Address=result[0].Address;
    //  console.log(fname);
    //  console.log(lname);
    //  console.log(PhoneNo);
    //  console.log(Address);
    //  });
//    });
    //PID=result[0].PID;
    

    res.setHeader("Content-Type", "text/html");
    res.write(`
      <head>Owner Maintenance </head>
      <form action="/ownermainten"  method="GET">  
      <h4> OID: ${OID} </h4>  

        
        <a href="http://localhost:5000/picturefileupload"> Upload picture files </a>
        </br></br>  
        <a href="http://localhost/propertyupdateselect?OID=${OID}"> Update property </a>
        </br></br>
        <a href="http://localhost/Furnitures?OID=${OID}"> Add Furnitures </a>
        </br></br>
        <a href="http://localhost/Furnituresupdateselect?OID=${OID}"> Update Furnitures </a>
        </br></br>
        <a href="http://localhost/Furnituresdelete?OID=${OID}"> Delete Furnitures </a>
        
    
        </br></br>
        <a href="http://localhost/Picture_filesupdateselect?OID=${OID}"> Update Picture </a>
        </br></br>
        <a href="http://localhost/Picture_filesdelete?OID=${OID}"> Delete Picture </a>
        </br></br>
        <a href="http://localhost/propertyinfoinput?OID=${OID}"> Add property </a>
        </br></br>
        <a href="http://localhost/propertydelete?OID=${OID}"> Delete property </a>
        </br></br>
        <a href="http://localhost/own?OID=${OID}"> Add a owning property </a>
        </br></br>
        <a href="http://localhost/owndeleteselect?OID=${OID}"> Delete owning property </a>
        


      </br></br>
      <input type="submit" value="Select" />  
      </form>  
    `);
    res.send();
    });

    app.route('/managerselect')
    .get((req, res) => {
      
      console.log("manager select called"); 
      var sql="select PhoneNumber from manager ";
          
      console.log(sql);
      connection.query(sql, function(err,result,rows) {
        if (err) throw err;
        var optionstring;
        result.forEach(function(row){
          options='<option value="' + row.PhoneNumber +'"> ' +row.PhoneNumber+ '</option>'
          optionstring = optionstring + options;
          console.log(optionstring);
        });
  //    });
      //PID=result[0].PID;
      //console.log(count(result));
  
      res.setHeader("Content-Type", "text/html");
      res.write(`
        <head>manager select</head>
        <form action="/managermainten"  method="GET">  
        <h4> PhoneNumber </h4>  
        <select name="PhoneNumber">
          ${optionstring}
        </select>  
        </br></br>
        <input type="submit" value="Select" />  
        </form>  
      `);
      res.send();
      });
    })
  

  app.route('/managermainten')
  .get((req, res) => {
    
    console.log("manager mianten called"); 
    var PhoneNumber=req.query.PhoneNumber;
    //var sql="select Fname, Lname, PhoneNo, Address from ownr where OID = '"+ OID+"'";
      
    //console.log(sql);
    //connection.query(sql, function(err,result,rows) {
    //  if (err) throw err;
    //  fname=result[0].Fname;
    //  lname=result[0].Lname;
    //  PhoneNo=result[0].PhoneNo;
    //  Address=result[0].Address;
    //  console.log(fname);
    //  console.log(lname);
    //  console.log(PhoneNo);
    //  console.log(Address);
    //  });
//    });
    //PID=result[0].PID;
    

    res.setHeader("Content-Type", "text/html");
    res.write(`
      <head>Manager Maintenance </head>
      <form action="/managerrmainten"  method="GET">  
      <h4> PhoneNumber: ${PhoneNumber} </h4>  

        <a href="http://localhost/propertyupdateselect?PhoneNumber=${PhoneNumber}"> Update property </a>
        </br></br>
        <a href="http://localhost/Furnitures?PhoneNumber=${PhoneNumber}"> Add Furnitures </a>
        </br></br>
        <a href="http://localhost/Furnituresupdateselect?PhoneNumber=${PhoneNumber}"> Update Furnitures </a>
        </br></br>
        <a href="http://localhost/Furnituresdelete?PhoneNumber=${PhoneNumber}"> Delete Furnitures </a>
        </br></br>
        <a href="http://localhost/Picture_files?PhoneNumber=${PhoneNumber}"> Add Picture </a>
        </br></br>
        <a href="http://localhost/Picture_filesupdateselect?PhoneNumber=${PhoneNumber}"> Update Picture </a>
        </br></br>
        <a href="http://localhost/Picture_filesdelete?PhoneNumber=${PhoneNumber}"> Delete Picture </a>
        </br></br>
        <a href="http://localhost/propertyinfoinput?PhoneNumber=${PhoneNumber}"> Add property </a>
        </br></br>
        <a href="http://localhost/propertydelete?PhoneNumber=${PhoneNumber}"> Delete property </a>
        </br></br>
        <a href="http://localhost/manage?PhoneNumber=${PhoneNumber}"> Add a managinging property </a>
        </br></br>
        <a href="http://localhost/managedeleteselect?PhoneNumber=${PhoneNumber}"> Delete managing property </a>


      </br></br>
      <input type="submit" value="Select" />  
      </form>  
    `);
    res.send();
    });

   