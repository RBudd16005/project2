const express = require('express')
const mysql = require('mysql')
const path = require('path')
const PORT = process.env.PORT || 5000
const connection = mysql.createConnection({
  host: "postgres://dskeruymiecfsm:07dbc5813711491b0b13f31c2877ddb1ca00e29dbc40242e6923affa5ca804c1@ec2-54-227-249-202.compute-1.amazonaws.com:5432/ddbdushbi20f4j?ssl=true",
  port: 5432,
  user: "dskeruymiecfsm",
  password: "07dbc5813711491b0b13f31c2877ddb1ca00e29dbc40242e6923affa5ca804c1",
  database: "ddbdushbi20f4j"
})
connection.connect(function(err){
  if (err){
    console.error("Error: " + err);
  }
  console.log("connected to db");
})

express()
      .use(express.static(path.join(__dirname, 'public')))
      .set('views', path.join(__dirname, 'views'))
      .set('view engine', 'ejs')
      .get('/', (req, res) => res.render('pages/home'))
      .post('/results', function(req, res){

      })
      .listen(PORT, () => console.log(`Listening on ${ PORT }`));
