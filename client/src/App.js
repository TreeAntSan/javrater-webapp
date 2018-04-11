import React from "react";
import { Switch, Route, Redirect } from 'react-router-dom';

import UserWrapper from "./components/UserWrapper";
import HeaderMenu from "./components/HeaderMenu";
import Welcome from "./components/Welcome";
import Create from "./components/Create";
import Movies from "./components/Movies";
import Login from "./components/Login";
import Footer from "./components/Footer";

// TODO Use context to clean up the repeated use of UserWrapper. See https://stackoverflow.com/a/49726454/3120546
const App = () => (
  <UserWrapper>
    <HeaderMenu />
    <Switch>
      <Route exact path="/" render={() => <Redirect to="/welcome" />} />
      <Route exact path="/welcome" render={props =>
        <UserWrapper>
          <Welcome {...props} />
        </UserWrapper>}
      />
      <Route exact path="/create" render={props =>
        <UserWrapper>
          <Create {...props} />
        </UserWrapper>}
      />
      <Route exact path="/movies" render={props =>
        <UserWrapper>
          <Movies {...props} />
        </UserWrapper>}
      />
      {/* TODO The loginPath prop here is a little hacky, consider a better solution... */}
      <Route exact path="/login" render={props =>
        <UserWrapper>
          <Login loginPath={"/login"} {...props} />
        </UserWrapper>}
      />
      <Route exact path="/signup" render={props =>
        <UserWrapper>
          <Login loginPath={"/login"} {...props} />
        </UserWrapper>}
      />
    </Switch>
    <Footer />
  </UserWrapper>
);

export default App;
