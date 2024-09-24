const express = require('express');
const app = express();
const port = 5001;
const connect = require('./mongoose/connect');
const {Department, Employee} = require('./mongoose/employee-department-model');
const path = require('path');

//setup cors
const cors = require('cors');
app.use(cors());

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// Connect to the database
connect();

app.get('/', (req, res) => {
    res.json({"message": "Apollonia Dental Pracitce API is up and running!"});
    // res.status(200).send(items);
});

require("./routes/apollonia-dental-routes")(app);

// Serve static assets if in production
if (process.env.NODE_ENV === 'production') {
  // Set static folder
  app.use(express.static(path.join(__dirname, '../client/build')));

  // Handle React routing, return all requests to React app
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../client/build', 'index.html'));
  });
}

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});