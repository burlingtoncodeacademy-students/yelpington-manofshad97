//Server file

const express = require('express')
//Create a data variable that holds the information in the restaurants.json file as an array
const data = require("./api/restaurants.json")
const app = express();
const port = process.env.PORT || 5000;
app.use(express.static("public"));

//Use a get request to send the data of all restaurants when /api is visited on the localhost5000
app.get("/api", (req, res) => {
    res.send(data)
})

//Use a get request when /api/(input restaurant ID here) is visited on the localhost5000, to show that specific restaurants information in proper JSON format
app.get("/api/:restaurantID", (req, res) => {
    //Loop through the data array using find and look for the restaurant where the ID matches.(So make sure the ID from the JSON is equal to the ID in the url)
    let restaurant = data.find((r) => r.id === req.params.restaurantID)
    res.send(restaurant)
})

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});