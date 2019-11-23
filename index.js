const express = require('express')
const bodyParser = require('body-parser')
const path = require('path')
const PORT = process.env.PORT || 5000
const connectionString = process.env.DATABASE_URL || "postgres://dskeruymiecfsm:07dbc5813711491b0b13f31c2877ddb1ca00e29dbc40242e6923affa5ca804c1@ec2-54-227-249-202.compute-1.amazonaws.com:5432/ddbdushbi20f4j?ssl=true";

express()
  .use(express.static(path.join(__dirname, 'public')))
  .use(bodyParser.urlencoded({extended:false}))
  .set('views', path.join(__dirname, 'views'))
  .set('view engine', 'ejs')
  .get('/', (req, res) => res.render('pages/home'))
  .post('/results', function(req, res){
    /*var sql = "SELECT * FROM sounds";
    const pool = new Pool({connectionString: connectionString});
    
    pool.query(sql, function(err, result){
      if (err){
        console.log("Error in query: ")
        console.log(err);
      }

      console.log("Back from DB with result: " + result.rows);
    })*/
    res.render('pages/results');
  })
  .listen(PORT, () => console.log(`Listening on ${ PORT }`))
