import React from "react";

import Login from "./components/login/login";
import Logout from "./components/Logout/Logout";

import { useAuth0 } from "@auth0/auth0-react";

const AuthenticationButton = () => {
  const { isAuthenticated } = useAuth0();

  return isAuthenticated ? <Logout /> : <Login />;
};

export default AuthenticationButton;