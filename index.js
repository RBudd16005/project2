const express = require('express');
const { Pool } = require('pg');
const path = require('path');
const PORT = process.env.PORT || 5000;
const connectionString = "postgres://dskeruymiecfsm:07dbc5813711491b0b13f31c2877ddb1ca00e29dbc40242e6923affa5ca804c1@ec2-54-227-249-202.compute-1.amazonaws.com:5432/ddbdushbi20f4j?ssl=true";
const pool = new Pool({connectionString: connectionString});

express()
      .use(express.static(path.join(__dirname, 'public')))
      .set('views', path.join(__dirname, 'views'))
      .set('view engine', 'ejs')
      .get('/', (req, res) => res.render('pages/home'))
      .post('/results', function(req, res){
        var sql = "SELECT * FROM sounds";
        pool.query(sql, function(err, result){
          if (err) {
            console.error(err);
          }
          var db = JSON.parse(result);
          res.render('pages/results', {result: db});
        });
      })
      .listen(PORT, () => console.log(`Listening on ${ PORT }`));
