

async function getPokemonData (request, response, next) {
    console.log("getPokemonData running");
    // loop through each pokemon name in request.body.pokemon
    // fetch ("https://pokeapi.co/api/v2/pokemon/" + request.body.pokemon[indexValue]);
    let fetchCount = request.body.pokemon.length; // arrays have length

    let urlsToFetch = [];
    for (let index = 0; index < fetchCount; index++) {
        const pokemonToRetrieve = request.body.pokemon[index];
        urlsToFetch.push("https://pokeapi.co/api/v2/pokemon/" + pokemonToRetrieve);
    
    }

    const requestsToMake = urlsToFetch.map(url => 
        fetch(url)
        
    );

    let responses = await Promise.all(requestsToMake);

    let responseTexts = await Promise.all(responses.map(response => response.text()));

    // console.log(responseTexts);

    responseTexts.forEach(jsonString => {
        if (jsonString == "Not Found"){
            return next (new Error("Invalid name provided"));
        }
        let recievedData = JSON.parse(jsonString);
        if (!request.customData){
            request.customData = {};
        }
        if (!request.customData?.retrievedPokemon){
            request.customData.retrievedPokemon = [];
        }
        request.customData.retrievedPokemon.push(recievedData);

    })

    next();

   // await Promise.all(requestsToMake).then(returnedData => {
        // console.log(returnedData);
        // console.log("All requests done!");
        // next();
    // })

    // else add ALL retrieved pokemon data to request.custData.retrievedPokemon

    // move on to next middleware

    // next();
}

module.exports= {
    getPokemonData
}