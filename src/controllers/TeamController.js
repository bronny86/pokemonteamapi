const express = require("express");
const { TeamModel } = require("../models/TeamModel.js");
const { getPokemonData} = require("../middleware/getPokemonData.js");
const { makeTeam } = require("../middleware/makeTeam.js");
const router = express.Router();

//                      team id is a mongoDB document object ID
// http://localhost:5678/team/3449549285029fkjdsjg

router.get(
    "/one/:teamid", // route path
  
    async (request, response) => { // route final callback
    
    response.json({
        
    });
});


// http://localhost:5678/team/all

router.get(
    "/all", // route path
    // DO NOT WANT validatePokemonNames if we had some local copy of pokemon names
    // getPokemonData // fetch data from pokeAPI and throw errors on invalid pokemon
    // trimPokemonData to match schema or makeTeam - turn provided data and fetched data into a Team document

    async (request, response) => { // route final callback

        let teamData = await TeamModel.find();
    response.json({
        data: teamData
        
    });
});

// http://localhost:5678/team/

/*
{
    userId: "fdjsgnrs",
    pokemon: [
    "pikachu",
    "squirtle",
    "mewtwo"
    ]

}
*/


router.post(
    "/", // route path

    getPokemonData,
    makeTeam,
  
    async (request, response) => { // route final callback
        console.log(request.customData.retrievedPokemon.length);

    
       // let newTeam = await TeamModel.create(request.body.teamData)

    response.json({
        // requestBody: request.body,
        team: request.customData.newTeam
        
    });
});


// http://localhost:5678/team/gfery53y3

router.patch(
    "/:teamid", // route path
  
    async (request, response) => { // route final callback
    
    response.json({
        
    });
});

// http://localhost:5678/team/rhhteu5435

router.delete(
    "/:teamid", // route path
  
    async (request, response) => { // route final callback
    
    response.json({
        
    });
});

module.exports = {
    TeamRouter: router
}