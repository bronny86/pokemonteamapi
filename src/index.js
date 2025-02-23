// Import the configured server
// Start the server

const { app } = require("./server");

app.listen(3000, () => {
    console.log("Server is running on port 3000");
});