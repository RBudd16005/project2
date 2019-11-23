const express = require('express');
const path = require('path');
const PORT = process.env.PORT || 5000;
const pg = require('pg');
const conString = "postgres://dskeruymiecfsm:07dbc5813711491b0b13f31c2877ddb1ca00e29dbc40242e6923affa5ca804c1@ec2-54-227-249-202.compute-1.amazonaws.com:5432/ddbdushbi20f4j?ssl=true";

express()
      .use(express.static(path.join(__dirname, 'public')))
      .set('views', path.join(__dirname, 'views'))
      .set('view engine', 'ejs')
      .get('/', (req, res) => res.render('pages/home'))
      .post('/results', function(req, res, next){
        pg.Connection(conString, function(err, client, done) {
          if (err){
            return console.error('error fetching client from pool', err)
          }
          console.log("connected to database");
          client.query('SELECT * FROM sounds', function(err, result) {
            done();
            if (err){
              return console.error('error running query' + err);
            }
            res.render('pages/results');
          });
        });
      })
      .listen(PORT, () => console.log(`Listening on ${ PORT }`));
