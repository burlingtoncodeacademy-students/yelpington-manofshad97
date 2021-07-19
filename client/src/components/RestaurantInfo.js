import React from "react";
import "../styles/restaurantInfo.css";

//This function takes props as a parameter because it will use the restaurant prop defined at the end of Home.js. That prop refers to the currently selected restaurant.
function RestaurantInfo(props) {
    return (
        <div className="detailsWrapper">
            {/* If the restaurant prop is defined, create an h2 displaying the restaurant's name as a title, and multiple p tags afterwards containing various details. All these details come from props. */}
            {props.restaurant && (
                <div>
                    <h2 className="restTitle"><span>{props.restaurant.name}</span> Info</h2>
                    <p className="details"><span>Name: </span>{props.restaurant.name}</p>
                    <p className="details"><span>Address: </span>{props.restaurant.address}</p>
                    <p className="details"><span>Phone Number: </span>{props.restaurant.phoneNumber}</p>
                    <p className="details"><span>Hours: </span>{props.restaurant.hours}</p>
                    <p className="details"><span>Description: </span>{props.restaurant.description}</p>
                </div>
            )}

        </div>
    )
}

export default RestaurantInfo