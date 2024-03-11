var express = require('express');
var path = require('path');
var http = require('http'),
    fs = require('fs');
var date = require("date-and-time");

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

  app.route('/managerupdate')
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








  app.route('/manage')
  .get((req, res) => {
    var PID=req.query.PID;
   

    if (PID) {
        console.log("manage get called, property ID: "+PID);
        var sql='select PhoneNumber,StartYear, EndDate from manage where PID='+ PID;
        connection.query(sql, function(err,result, fields) {
          if (err) throw err;
          PhoneNumber=result[0].PhoneNumber;
          StartYear=result[0].StartYear;
          EndDate=result[0].EndDate;
          res.setHeader("Content-Type", "text/html");
          res.write(`
            <head>manage input</head>
            <form action="/manageupdate"  method="post">  
            
            <h4> Property ID</h4>  
            <input type="text" name="PID" value="${PID}" readonly />  
            
            <h4> PhoneNumber</h4>  
            <input type="text" placeholder="Enter your PhoneNumber" name="PhoneNumber" value="${PhoneNumber}" />  
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
    else {
        res.setHeader("Content-Type", "text/html");
        res.write(`
          <head>manageinput </head>
          <form action="/manage" method="post">  
          <h4> PID</h4>  
          <input type="text" placeholder="Enter your PID" name="PID" /> </br></br> 
          <h4> PhoneNumber</h4>  
          <input type="text" placeholder="Enter your PhoneNumber" name="PhoneNumber" />  
          <h4> EndDate</h4>  
          <input type="text" placeholder="Enter your EndDate" name="EndDate" />  
          <h4> StartYear</h4>  
          <input type="text" placeholder="Enter your StartYear" name="StartYear"  /></br></br>
          <input type="submit" value="Save" />  
          </form>  
        `);
        res.send();
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

    var sql = "INSERT INTO manage (PID,PhoneNumber,StartYear,EndDate) values ('" + PID +"','"+ PhoneNumber + "','" + StartYear+ "','" + EndDate+  "')";
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


  app.route('/manageupdate')
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














  
  
  
  
  

  app.route('/own')
  .get((req, res) => {
    var OID=req.query.OID;


    if (OID) {
        console.log("own get called, owner ID: "+OID);
        var sql='select OID,PID from own where OID='+ OID;
        connection.query(sql, function(err,result, fields) {
          if (err) throw err;
          PID=result[0].PID;
          res.setHeader("Content-Type", "text/html");
          res.write(`
            <head>own input</head>
            <form action="/ownupdate"  method="post">  
            
            <h4> OID</h4>  
            <input type="text" name="OID" value="${OID}" readonly />  

            <h4> PID</h4>  
            <input type="text" placeholder="Enter your PID" name="PID" value="${PID}" /></br></br>
            <input type="submit" value="Save" />  
            </form>  
          `);
          res.send();
        });
        }
    else {
        res.setHeader("Content-Type", "text/html");
        res.write(`
          <head>owninput </head>
          <form action="/own" method="post">  
          <h4> OID</h4>  
          <input type="text" placeholder="Enter your OID" name="OID" /> </br></br> 
          <h4> PID</h4>  
          <input type="text" placeholder="Enter your PID" name="PID"  /></br></br>
          <input type="submit" value="Save" />  
          </form>  
        `);
        res.send();
        }
    })      

  .post((req, res) => {

    var OID=req.body.OID;
    var PID=req.body.PID;

    console.log("own post OID: "+OID);
    console.log("own post PID: "+PID);


    var sql = "INSERT INTO own (OID,PID) values ('" + OID +"','"+ PID +  "')";
    console.log(sql);
    connection.query(sql, (err) =>{
      if (err) {
        console,log(err);  
      }
      else {
        console.log('own record added sucessfully');
      }
    });


    res.send('own record added');
    res.end();
  })


  app.route('/ownupdate')
  .post((req, res) => {

    var OID=req.body.OID;
    var PID=req.body.PID;

    console.log("own post OID: "+OID);
    console.log("own post PID: "+PID);

   
    var sql = "update own set PID='" + PID +   "' where OID ='" + OID+ "'";
   
    console.log(sql);
    connection.query(sql, (err) =>{
      if (err) {
        console,log(err);  
      }
      else {
        console.log('own record updated sucessfully');
      }
    });

    
    res.send('own record updated');
    res.end();
  })















  app.route('/ownerinfoinput')
  .get((req, res) => {
    var OID=req.query.OID;


    if (OID) {
        console.log("ownerinfoinput get called, owner ID: "+OID);
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
            <head>ownerinfoinput input</head>
            <form action="/ownerinfoinputupdate"  method="post">  
            
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
          <head>ownerinfoinputinput </head>
          <form action="/ownerinfoinput" method="post">  
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

    console.log("ownerinfoinput post OID: "+OID);
    console.log("ownerinfoinput post fname: "+fname);
    console.log("ownerinfoinput post lname: "+lname);
    console.log("ownerinfoinput post PhoneNumber: "+PhoneNumber);
    console.log("ownerinfoinput post Address: "+Address);


    var sql = "INSERT INTO ownr (OID,fname,lname,PhoneNo,Address) values ('" + OID +"','"+ fname+"','"+ lname+"','"+ PhoneNumber+"','"+ Address +  "')";
    
    console.log(sql);
    connection.query(sql, (err) =>{
      if (err) {
        console,log(err);  
      }
      else {
        console.log('ownerinfoinput record added sucessfully');
      }
    });


    res.send('ownerinfoinput record added');
    res.end();
  })


  app.route('/ownerinfoinputupdate')
  .post((req, res) => {

    var OID=req.body.OID;
    var fname=req.body.fname;
    var lname=req.body.lname;
    var PhoneNumber=req.body.PhoneNumber;
    var Address=req.body.Address;

    console.log("ownerinfoinput post OID: "+OID);
    console.log("ownerinfoinput post fname: "+fname);
    console.log("ownerinfoinput post lname: "+lname);
    console.log("ownerinfoinput post PhoneNumber: "+PhoneNumber);
    console.log("ownerinfoinput post Address: "+Address);

   
    var sql = "update ownr set fname='" + fname+ "',lname='" + lname+ "',PhoneNo='" + PhoneNumber+ "',Address='" + Address +   "' where OID ='" + OID+ "'";
   


    console.log(sql);
    connection.query(sql, (err) =>{
      if (err) {
        console,log(err);  
      }
      else {
        console.log('ownerinfoinput record updated sucessfully');
      }
    });

    
    res.send('ownerinfoinput record updated');
    res.end();
  })













  

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
            <form action="/Picture_filesupdate"  method="post">  
            
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
            <input type="submit" value="Save" />  
            </form>  
          `);
          res.send();
        });
        }
    else {
        res.setHeader("Content-Type", "text/html");
        res.write(`
          <head>Picture_filesinput </head>
          <form action="/Picture_files" method="post">  
          <h4> PID</h4>  
          <input type="text" placeholder="Enter your PID" name="PID" /> </br></br> 
          <h4> File_name1</h4>  
          <input type="text" placeholder="Enter your File_name1" name="File_name1" />  
          <h4> File_name2</h4>  
          <input type="text" placeholder="Enter your File_name2" name="File_name2" />  
          <h4> File_name3</h4>  
          <input type="text" placeholder="Enter your File_name3" name="File_name3" />  
          <h4> File_name4</h4>  
          <input type="text" placeholder="Enter your File_name4" name="File_name4" />  
          <h4> File_name5</h4>  
          <input type="text" placeholder="Enter your File_name5" name="File_name5" />  
          <h4> File_name6</h4>  
          <input type="text" placeholder="Enter your File_name6" name="File_name6" />  
          <h4> File_name7</h4>  
          <input type="text" placeholder="Enter your File_name7" name="File_name7" />  
          <h4> File_name8</h4>  
          <input type="text" placeholder="Enter your File_name8" name="File_name8" />  
          <h4> File_name9</h4>  
          <input type="text" placeholder="Enter your File_name9" name="File_name9" />  
          

          <h4> File_name10</h4>  
          <input type="text" placeholder="Enter your File_name10" name="File_name10"  /></br></br>
          <input type="submit" value="Save" />  
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
        console.log('Picturee_files record added sucessfully');
      }
    });

    

  })


  app.route('/Picture_filesupdate')
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

    
    res.send('Picture_files record updated');
    res.end();
  })


  















  

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
        console,log(err);  
      }
      else {
        console.log('Picturee_files record added sucessfully');
      }
    });

    

  })


  app.route('/propertyinfoinputupdate')
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

    
    res.send('propertyinfoinput record updated');
    res.end();
  })














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


  app.route('/Furnituresupdate')
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