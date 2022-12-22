import React from 'react';

import UserPlaces from './places/pages/UserPlaces';
import MainNavigation from './shared/components/Navigation/MainNavigation';
import './App.css';
import {BrowserRouter as Router,Route,Redirect,Switch} from 'react-router-dom'
import User from './user/pages/User';

function App() {
  return (
 <Router>
  <MainNavigation/>
  <main>
<Switch>
<Route path="/" exact>
  <User/>
</Route>
<Route path="/:userId/places" exact>
  <UserPlaces/>
</Route>
 <Redirect to="/"/>
 </Switch>
 </main>

</Router>
 
  );
}

export default App;
