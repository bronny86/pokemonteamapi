const mongoose = require("mongoose");

// Make a schema with data properties
const UserSchema = new mongoose.Schema({
    email: String,
    password: String,
    username: String,
    level: Number
})

// make a model that uses the schema
//                                name in DB, schema to use for its validation rules
const UserModel = mongoose.model('User', UserSchema);


// export the model
module.exports = {
    UserModel
}