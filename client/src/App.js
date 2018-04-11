import React from "react";
import { Switch, Route, Redirect } from 'react-router-dom';

import UserWrapper from "./components/UserWrapper";
import HeaderMenu from "./components/HeaderMenu";
import Welcome from "./components/Welcome";
import Create from "./components/create/Create";
import Movies from "./components/movies/Movies";
import Login from "./components/Login";
import Logout from "./components/Logout";
import Footer from "./components/Footer";

// TODO Use context to clean up the repeated use of UserWrapper. See https://stackoverflow.com/a/49726454/3120546
const App = () => (
  <div>
    <UserWrapper>
      <HeaderMenu />
    </UserWrapper>
    <Switch>
      <Route exact path="/" render={() => <Redirect to="/welcome" />} />
      <Route exact path="/welcome" render={() =>
        <UserWrapper>
          <Welcome />
        </UserWrapper>}
      />
      <Route exact path="/create" render={() =>
        <UserWrapper>
          <Create />
        </UserWrapper>}
      />
      <Route exact path="/movies" render={() =>
        <UserWrapper>
          <Movies />
        </UserWrapper>}
      />
      {/* TODO The loginPath prop here is a little hacky, consider a better solution... */}
      <Route exact path="/login" render={() =>
        <UserWrapper>
          <Login loginPath={"/login"} />
        </UserWrapper>}
      />
      <Route exact path="/signup" render={() =>
        <UserWrapper>
          <Login loginPath={"/login"} />
        </UserWrapper>}
      />
      <Route exact path="/logout" render={() =>
        <UserWrapper>
          <Logout />
        </UserWrapper>}
      />
      <Route path="*" render={() => <Redirect to="/" />} />
    </Switch>
    <Footer />
  </div>
);

export default App;
