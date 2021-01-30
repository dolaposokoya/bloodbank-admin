import React from 'react'
import { Router, Switch, Route } from "react-router-dom";
import Login from "../components/login/login";
import history from '../routes/history';
import User from '../components/users/users'
import { UserProvider } from '../components/Context/UserContext'


function App() {

  return (
    <UserProvider>
      <Router history={history}>
        <Switch>
          <Route path="/" exact component={Login} />
          <Route path="/users" component={User} />
        </Switch>
      </Router>
    </UserProvider>
  );
}

export default App;
