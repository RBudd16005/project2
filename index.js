const express = require('express');
const mysql = require('mysql');
const path = require('path');
const PORT = process.env.PORT || 5000;
const connection = mysql.createConnection({
  host: "ec2-54-227-249-202.compute-1.amazonaws.com",
  port: 5432,
  user: "dskeruymiecfsm",
  password: "07dbc5813711491b0b13f31c2877ddb1ca00e29dbc40242e6923affa5ca804c1",
  database: "ddbdushbi20f4j",
  ssl: true
});
connection.connect(function(err){
  if (err) {
    console.error(err);
  }
  else {
    console.log("connected to db");
    connection.query("SELECT * FROM sounds", "ddbdushbi20f4j", function(error, result){
      console.log(result);
    });
  }
});

express()
      .use(express.static(path.join(__dirname, 'public')))
      .set('views', path.join(__dirname, 'views'))
      .set('view engine', 'ejs')
      .get('/', (req, res) => res.render('pages/home'))
      .post('/results', function(req, res){
        res.render('pages/results');
      })
      .listen(PORT, () => console.log(`Listening on ${ PORT }`));
