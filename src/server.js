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


// Wildcard * means match any route
// put this at the end of route declarations
// to catch any routes that are not matched
app.get("*", (request, response) => {
    console.log("User tried to visit " + request.path);
    response.json({
        message: "Page not found",
        attemptedPath: request.path
    });
});

module.exports = {
    app
}