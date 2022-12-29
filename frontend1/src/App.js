import React,{useCallback,useState} from 'react';

import UserPlaces from './places/pages/UserPlaces';
import MainNavigation from './shared/components/Navigation/MainNavigation';
import './App.css';
import {BrowserRouter as Router,Route,Redirect,Switch} from 'react-router-dom'
import User from './user/pages/User';
import NewPlace from "./places/pages/NewPlace"
import UpdatePlace from './places/pages/UpdatePlace';
import Auth from './user/pages/Auth';
import { AuthContext } from './shared/context/auth-context';

function App() {
 const [isLoggedIn, setIsLoggedIn]=useState(false);

 const login= useCallback(()=>{
  setIsLoggedIn(true);
 }, []);

 const logout= useCallback(()=>{
  setIsLoggedIn(false);
 }, []);

 let routes;

 if(isLoggedIn){
  routes=(
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
  );
 } else {
  routes = (
    <Switch>
    <Route path="/" exact>
  <User/>
</Route>

<Route path="/:userId/places" exact>
  <UserPlaces/>
</Route>

<Route path="/Auth">
  <Auth/>
</Route>
<Redirect to="/Auth"/>
    </Switch>
  );
 }


  return (
    <AuthContext.Provider 
    value={{
      isLoggedIn: isLoggedIn, 
      login: login, 
      logout: logout
      }}>
 <Router>
  <MainNavigation/>
  <main>
{routes}
 </main>

</Router>
</AuthContext.Provider>
 
  );
}

export default App;
