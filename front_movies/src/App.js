import React from 'react';
import './App.css';


import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

import Listado  from './components/movies/Listado';
function App() {
  return (
    <div className="App">
       <Router>
      <Switch>
      <Route path="/" exact>
        <Listado />
      </Route>
      </Switch>
      </Router>
    </div>
  );
}

export default App;
