import React, { useState, useEffect } from "react";
import RestaurantInfo from "./RestaurantInfo";
import "../styles/home.css";

function Home() {
    //Use state hook for setting a restaurant
    const [restaurants, setRestaurants] = useState([])
    //Use state hook for setting a leaflet or "L" object
    const [leaflet, setLeaflet] = useState()
    //Use state hook for setting a currently selected restaurant
    const [selectedRestaurant, setSelectedRestaurant] = useState()
  
    useEffect(() => {
      //Assign the L object to the leaflet variable using this updater function
      setLeaflet(window.L)
  
    }, [])
  
    useEffect(() => {
      // If the leaflet object is undefined, return
      if (!leaflet) {
        return;
      }
  
      // Use a fetch request on the api folder in order to access information from the JSON file
      fetch("/api")
        .then((res) => res.json())
        .then((data) => {
          //set the array of restaurant objects into a variable called restaurant using the updater function
          setRestaurants(data)
          //Create a new leaflet map using the leaflet object and set view. I set the view to the general coordinates of the area thats contains all restaurants near me
          let myMap = leaflet.map('map').setView([40.703026699999995, -73.8108232], 13);
          // Create a tile layer and add a maxZoom
          let tileLayer = leaflet.tileLayer('https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png', {
            maxZoom: 20,
            attribution: '&copy; <a href="https://stadiamaps.com/">Stadia Maps</a>, &copy; <a href="https://openmaptiles.org/">OpenMapTiles</a> &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors'
          });
          //Add the tile layer to the map
          tileLayer.addTo(myMap)
          
          //Split the current url based on slashes. Currently id is an array of words that have been split by a slash
          let id = document.location.href.split("/")
          // Reassign id to be the last element of that array. This last element is the restaurant id. 
          id = id[id.length - 1]
          // In order to set the selected restaurant into the selectedRestaurant variable, must first grab the restaurant object by looping through the data array and finding the restaurant where the id from the JSON file matches the id that was taken from the URL.
          let restaurantObject = data.find((restaurant) => restaurant.id === id)
          setSelectedRestaurant(restaurantObject)
  
          //If that restaurant object is defined, this means a restaurant has been selected. Create a marker using the coordinates in the location property of that object. Add the marker to myMap and bind a popup that when clicked, displays the name of that restaurant object. Zoom in with setView.
          if (restaurantObject) {
            leaflet.marker(restaurantObject.location).addTo(myMap).bindPopup(restaurantObject.name)
            myMap.setView(restaurantObject.location, 18)
          }
  
          // Otherwise, it means that we are on the home page so we need to display markers for all restaurants. Loop through the data array and for each restaurant, place a marker based on that restaurants location and add it to the map. Bind an anchor tag for each marker that displays the restaurant name with a link and takes you to the path of that restaurant once that link is clicked.
          else {
            data.forEach((restaurant) => {
              leaflet.marker(restaurant.location).addTo(myMap).bindPopup(`<a href="/restaurant/${restaurant.id}">${restaurant.name}</a>`)
            })
          }
        })
  
    }, [leaflet])  
  
    return (
      <div>
        <h1 className="title">Yelpington!</h1>
  
        <div className="wrapper">
  
          <div className="restList">
            {/*If selected restaurant is defined it means we're not on the home page so just add an empty string class. Otherwise, add a class of highlight  */}
            <a className={`restName ${selectedRestaurant ? "" : "highlight"}`} href="/">Home</a>
            {/* Loop through the restaurants array and create an anchor element for each restaurant that has a link to the path with the correct ID, as well as the correct name of the restaurant*/}
            {restaurants.map((restaurant) => (
                // If selected restaurant is defined and if the id of the selected restaurant is equal to the restaurant that we are mapping from the JSON file, add the highlight class
              <a className={`restName ${(selectedRestaurant && selectedRestaurant.id === restaurant.id) ? "highlight" : ""}`} href={`/restaurant/${restaurant.id}`}>{restaurant.name}</a>
            ))}
          </div>
          <div id="map"></div>
        {/* Render the ResInfo component that takes the selectedRestaurant as a prop */}
           <RestaurantInfo restaurant={selectedRestaurant}/>
  
        </div>
  
      </div>
    );
  }
  
  export default Home;
  