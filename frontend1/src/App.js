import React from 'react';

import UserPlaces from './places/pages/UserPlaces';
import MainNavigation from './shared/components/Navigation/MainNavigation';
import './App.css';
import {BrowserRouter as Router,Route,Redirect,Switch} from 'react-router-dom'
import User from './user/pages/User';
import NewPlace from "./places/pages/NewPlace"
import UpdatePlace from './places/pages/UpdatePlace';

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
<Route path="/places/new" exact>
  <NewPlace/>
</Route>
<Route path="/places/:placeId">
  <UpdatePlace/>
</Route>
 <Redirect to="/"/>
 </Switch>
 </main>

</Router>
 
  );
}

export default App;
