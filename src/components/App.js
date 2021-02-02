import React from 'react'
import { Router, Switch, Route } from "react-router-dom";
import Login from "../components/login/login";
import Logout from "../components/Logout/Logout";
import history from '../routes/history';
import User from '../components/users/users'
import { UserProvider } from '../components/Context/UserContext'
import { useAuth0 } from "@auth0/auth0-react";

function App() {

  const { user, isAuthenticated, isLoading } = useAuth0();
  return (
    <UserProvider>
      {/* {!isAuthenticated ? <Login /> : <Logout />} */}
      <Router history={history}>
        <Switch>
          <Route path="/" exact component={Login} />
          {/* <Route path="/" exact component={Login} /> */}
          <Route path="/user" exact component={Logout} />
          <Route path="/users" component={User} />
        </Switch>
      </Router>
    </UserProvider>
  );
}

export default App;
