const express = require('express');
const { Pool } = require('pg');
const bodyParser = require('body-parser');
const path = require('path');
const PORT = process.env.PORT || 5000;
const connectionString = "postgres://dskeruymiecfsm:07dbc5813711491b0b13f31c2877ddb1ca00e29dbc40242e6923affa5ca804c1@ec2-54-227-249-202.compute-1.amazonaws.com:5432/ddbdushbi20f4j?ssl=true";
const pool = new Pool({connectionString: connectionString});

express()
      .use(express.static(path.join(__dirname, 'public')))
      .use(bodyParser.urlencoded({extended:false}))
      .set('views', path.join(__dirname, 'views'))
      .set('view engine', 'ejs')
      .get('/', (req, res) => res.render('pages/home'))
      .post('/results_add', function(req, res){
        var title = req.body.title;
        var creator = req.body.author;
        var uploaded = req.body.created;
        var sql = "INSERT INTO sounds (username, name, author, created) VALUES ('ryan', 'title', 'creator', 'uploaded');";
        pool.query(sql, function(err, result){
          if (err) {
            console.error(err);
          }
        });
        var sql2 = "SELECT * FROM sounds";
        pool.query(sql2, function(err, result){
          if (err) {
            console.error(err);
          }
          res.render('pages/results_add', {result: result.rows});
        });
      })
      .post('/results_remove', function(req, res){
        var title = req.body.title;
        var sql = "DELETE FROM sounds WHERE name='title';";
        pool.query(sql, function(err, result){
          if (err) {
            console.error(err);
          }
        });
        var sql2 = "SELECT * FROM sounds";
        pool.query(sql2, function(err, result){
          if (err) {
            console.error(err);
          }
          res.render('pages/results_remove', {result: result.rows});
        });
      })
      .post('/results_edit', function(req, res){
        var title = req.body.title;
        var creator = req.body.author;
        var uploaded = req.body.created;
        var sql = "UPDATE sounds SET author='creator', created='uploaded' WHERE name='title';";
        pool.query(sql, function(err, result){
          if (err) {
            console.error(err);
          }
        });
        var sql2 = "SELECT * FROM sounds";
        pool.query(sql2, function(err, result){
          if (err) {
            console.error(err);
          }
          res.render('pages/results_edit', {result: result.rows});
        });
      })
      .listen(PORT, () => console.log(`Listening on ${ PORT }`));
