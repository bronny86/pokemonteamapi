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



const {PokeApiRouter} = require("./controllers/PokeApiController.js");
app.use("/pokeapi", PokeApiRouter);



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

// Error handling catcher
// applies to every route in the entire server
app.use((error, request, response, next) => {
    console.log("Error occured in the server.");
    console.log(JSON.stringify(error));
    response.json({
        errors: request.body?.errors,
        message: error.message
    });
});

module.exports = {
    app
}