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
        done();

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

//connects with AJAX POST that adds a new task, inputs into database
router.post('/add', function(req, res) {
  console.log(req.body);
  var description = req.body.task;
  var status = req.body.status;
  console.log(description);

  pool.connect(function(error, db, done){

    if(error) {
      console.log("error connecting to the database.");
      res.send(500);

    } else {

      db.query('INSERT INTO "tasks" ("description", "status") VALUES ($1,$2);', [description, status], function(queryError, result){
        done();
        if (queryError) {
          console.log('Error making query.');
          res.sendStatus(500);
        } else {
          console.log(result);
          res.sendStatus(201);

        }//ends else
      }); //ends db query
    } //ends else
  }); //ends pool.connect
}); //ends router

//route for AJAX 'PUT' that updates a task as comleted.
router.put('/update/:taskId', function(req, res){
  var taskId= req.params.taskId;
  console.log(req.params.taskId);

  pool.connect(function(errorConnectingToDatabase, db, done){
    if(errorConnectingToDatabase) {
      console.log('Error connecting to the database.');
      res.send(500);
    } else {

      db.query("UPDATE tasks SET status = 'FALSE' WHERE id = $1;", [taskId], function(queryError, result){
        done();
        if(queryError) {
          console.log('Error making query.');
          res.sendStatus(500);
        } else {
          console.log(result); // Good for debugging
          res.sendStatus(201);
        }
      });
    }
  });
});

//for DELETE AJAX - deletes a task from the to-do list/DB
router.delete('/delete/:taskId', function(req, res){
  var taskId= req.params.taskId;
  console.log(req.params.taskId);

  pool.connect(function(errorConnectingToDatabase, db, done){
    if(errorConnectingToDatabase) {
      console.log('Error connecting to the database.');
      res.send(500);
    } else {
      // we want to delete the selected book by targeting with ID
      db.query('DELETE FROM tasks WHERE id =' + taskId, function(queryError, result){
        done();
        if(queryError) {
          console.log('Error making query.');
          res.sendStatus(500);
        } else {
          console.log(result);
          res.sendStatus(201);
        }
      });
    }
  });
});

module.exports = router;
