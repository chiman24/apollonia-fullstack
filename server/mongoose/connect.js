const mongoose = require('mongoose');

let connection = null;

async function connect () {
  
  if (connection == null) {
    
    console.log(`Connecting to database`);

    const uri = `mongodb://mongo:27017`;

    //Connect to mongo
    connection = await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      // dbName: database
    });

    await connection;
  }
  
  return connection;
}

// export default connect;
module.exports = connect;