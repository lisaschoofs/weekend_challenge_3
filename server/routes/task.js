var express = require('express');
var router = express.Router();
var pg = require('pg');

var config = {
  database: 'chi', // name of your database
  host: 'localhost', // where is your database?
  port: 5432, // port for the database
  max: 10, // how many connections at one time
  idleTimeoutMillis: 30000 // 30 seconds to try to connect
};

var pool = new pg.Pool(config);

//base get for tasks from DB
router.get('/', function(req, res) {

  pool.connect(function(error, db, done){
    //check to see if there's an error connecting
    if(error) {
      console.log("error connecting to the database.");
      res.send(500);

    } else {

      db.query('SELECT * FROM tasks;', function(queryError, result){
        done(); //maps back to done parameter;
        //done() is what gives the connection back to the pool
        if (queryError) {
          console.log('Error making query.');
          res.send(500);
        } else {

          console.log(result);
          res.send(result.rows);
          //rows is the array of objects. result would give us more info than we need.
        }//ends else
      }); //ends db query
    } //ends else
  }); //ends pool.connect
}); //ends router

module.exports = router;
