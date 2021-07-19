import React from "react";
import { Switch, Route, BrowserRouter } from "react-router-dom";
import Home from './components/Home';

// Create a route for the home page as well as when a restaurant is clicked and the path changes to hold that restaurant's ID. 

function App() {

  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/restaurant/:restaurantID" component={Home} />
      </Switch>
    </BrowserRouter>
  )
}

export default App;
