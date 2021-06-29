import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useEffect, useState } from 'react';
import { Switch, Route, BrowserRouter as Router, useHistory } from 'react-router-dom';
import NavBar from './components/Navbar';
import DashBoard from './components/DashBoard';
import Generator from './components/Generator';

function App() {

  //const routerHistory = useHistory();

  return (
   <Router>
     <NavBar/>
      <Switch>
        <Route exact path="/">
          <DashBoard/>
        </Route>
        <Route exact path="/create">
          <Generator/>
        </Route>
      </Switch>
    </Router> 
  );
}

export default App;
