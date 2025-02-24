const mongoose = require("mongoose");

// connect to the database
async function connect(databaseURL){
    console.log("Database connecting to " + databaseURL);
    await mongoose.connect(databaseURL);
    console.log("Database connected!");
}



// disconnect to the database
async function disconnect(){
    await mongoose.connection.close();
}


// export the connect and disconnect functions
module.exports = {
    connect,
    disconnect
}