// Create and configure the server
// and all of its end points

const express = require("express");

// create instance of express system
const app = express();

app.get("/", (request, response) => {
    response.json({
        message: "Hello, World!"  
    });
});

module.exports = {
    app
}