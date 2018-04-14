import React from "react";
import { Switch, Route, Redirect } from 'react-router-dom';

import UserWrapper from "./components/UserWrapper";
import HeaderMenu from "./components/HeaderMenu";
import Welcome from "./components/Welcome";
import Movie from "./components/movie/Movie";
import Movies from "./components/movies/Movies";
import Login from "./components/Login";
import Logout from "./components/Logout";
import User from "./components/user/User";
import Footer from "./components/Footer";
import LoadingError from "./components/LoadingError";

// TODO Use context to clean up the repeated use of UserWrapper. See https://stackoverflow.com/a/49726454/3120546
const App = () => (
  <div>
    <UserWrapper>
      <HeaderMenu />
    </UserWrapper>
    <br />
    <Switch>
      <Route exact path="/" render={() => <Redirect to="/welcome" />} />
      <Route exact path="/welcome" render={() =>
        <UserWrapper>
          <Welcome />
        </UserWrapper>}
      />
      <Route exact path="/movie/create" render={() =>
        <UserWrapper>
          <Movie />
        </UserWrapper>}
      />
      <Route exact path="/movie/edit/:id" render={() =>
        <UserWrapper>
          <Movie editMode />
        </UserWrapper>}
      />
      <Route exact path="/movies" render={() =>
        <UserWrapper>
          <Movies
            showCreatedBy
            showDelete
            showEdit
          />
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
      <Route exact path="/user/:id" render={() =>
        <UserWrapper private>
          <User />
        </UserWrapper>}
      />
      <Route path="*" render={() =>
        <LoadingError
          error={true}
          errorHeader="404"
          errorMessage="Page Not Found"
        />}
      />
    </Switch>
    <Footer />
    <br />
  </div>
);

export default App;
