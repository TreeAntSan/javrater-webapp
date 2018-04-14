import React from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router";
import { Container, Segment, Header } from "semantic-ui-react";

import FloatingCenterGrid from "../FloatingCenterGrid";
import Movies from "../movies/Movies";
import LoadingError from "../LoadingError";

const UserDetail = (props) => {
  if (props.query.loading || props.query.error) {
    return (<LoadingError error={props.query.error}/>);
  }

  const userData = props.query.data.me || props.query.data.user;
  const self = !!props.query.data.me;

  if (userData === null) {
    return (
      <LoadingError
        error={true}
        errorHeader="User not found"
        errorMessage={(<p>No user was found with the ID "{props.match.params.id}".</p>)}
      />
    );
  }

  return (
    <Container>
      <FloatingCenterGrid>
        <Header as="h1" textAlign="center">
          <Header.Content>
            {self ? "Your" : "User"} Details
          </Header.Content>
        </Header>
        <Segment>
          <p>Name: {userData.name}</p>
          {userData.email && <p>Email: {userData.email}</p>}
          <p>ID: {userData.id}</p>
        </Segment>
      </FloatingCenterGrid>
      <Container>
        {userData.movies.length ?
          <div>
            <Header as="h2" textAlign="center">
              <Header.Content>
                {self ? "Your" : `${userData.name}'s`} Movies
              </Header.Content>
            </Header>
            <Movies
              showCreatedBy={false}
              showDelete={self}
              showEdit={self}
              movies={userData.movies}
              updateFunction={props.updateFunction}
            />
          </div>
          :
          <div>
            <Header as="h3" textAlign="center">
              <Header.Content>
                {self ? "You" : `${userData.name} has`} no movies yet!
              </Header.Content>
            </Header>
          </div>
        }
      </Container>
    </Container>
  );
};

UserDetail.propTypes = {
  query: PropTypes.object.isRequired,
  updateFunction: PropTypes.func,
};

export default withRouter(UserDetail);
