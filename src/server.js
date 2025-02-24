// Create and configure the server
// and all of its end points

const express = require("express");


// create instance of express system
const app = express();

const mongoose = require("mongoose");

let databaseUrl = "";
switch (process.env.NODE_ENV?.toLocaleLowerCase()){
    case "test":
        databaseUrl = "mongodb://localhost:27017/PokemonTeamBuilder-test";
        break;

    case "dev":
    case "development":
        databaseUrl = "mongodb://localhost:27017/PokemonTeamBuilder-dev";
        break;

    case "production":
    case "prod":
        // this should match a variable in the .env or in the deployment platform
        // so it knows where to find MongoDB Cloud Atlas
        databaseUrl = process.env.DATABASE_URL;
        break;

    default:
        console.error("Incorrect environment detected!");
        process.exit();
        // break;
}

// after figuring out the database url connect to the DB
const { connect } = require("./database.js");
connect(databaseUrl);

app.get("/", (request, response) => {
    response.json({
        message: "Hello, World!"  
    });
});

app.get("/databaseHealth", (request, response) => {
    response.json({
        name: mongoose.connection.name,
        models: mongoose.connection.modelNames(),
        address: mongoose.connection.host,
        readState: mongoose.connection.readyState
    })
})



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