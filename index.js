var express = require('express');
var app = express();

var mysql = require('mysql2');
var connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'MyNewPass',
  port: 3308,
  database: 'contacts'
});

// used to serve static files from public directory
app.use(express.static('public'));

app.get('/', function(req, res) {
	res.send('Hello-world');
});

// test with curl 'http://localhost:3000/add?firstName=peter'

app.get('/add', function(req, res){
  
  console.log('FirstName: ', req.query.FirstName);
  console.log('LastName: ', req.query.LastName);

  res.send(`echoing: ${req.query.FirstName}`);
});

app.get('/random', function(req, res) {
  console.log('All in order:', req.query.FirstName, req.query.LastName, req.query.Email, req.query.PhoneNumber, req.query.University, req.query.Major)

  connection.query(
   `INSERT INTO \`contacts\` VALUES
      ('Charles', 'Koch', 'koch@mit.edu', '1234567890', 'MIT', 'Business'),
      ('IM', 'Pei', 'pei@mit.edu', '0987654321', 'MIT', 'Architecture'),
      ('Salman', 'Khan', 'khan@mit.edu', '2345678901', 'MIT', 'Math'),
      ('Alfred', 'Sloan', 'sloan@mit.edu', '0001112222', 'MIT', 'Business'),
      ('${req.query.FirstName}', '${req.query.LastName}', '${req.query.Email}', '${req.query.PhoneNumber}', '${req.query.University}', '${req.query.Major}')`,
    function(err, results, fields) {
     console.log(results);
     res.send(results);
    }
  );
});

app.get('/read', function(req, res){

   connection.query(
     'SELECT * FROM `contacts`',
     function(err, results, fields) {
       console.log(results);
       res.send(results);
     }
   );

});


app.listen(3000, function() {
	console.log("Running on port 3000");
});