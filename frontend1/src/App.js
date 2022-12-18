import React from 'react';
import './App.css';
import {BrowserRouter as Router,Route,Redirect,Switch} from 'react-router-dom'
import User from './user/pages/User';

function App() {
  return (
 <Router>
<Switch>
<Route path="/" exact>
  <User/>
</Route>
 <Redirect to="/"/>
 </Switch>

</Router>
 
  );
}

export default App;
