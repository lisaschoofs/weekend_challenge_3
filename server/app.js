var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var port = 5000;
var tasks = require('./routes/task.js');

app.use(express.static('server/public'));
app.use(bodyParser.urlencoded({extended: true}));

app.use('/tasks', tasks);

app.listen(port, function(){
  console.log("listening on port", port);
});
